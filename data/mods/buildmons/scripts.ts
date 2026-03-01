import { RESTORATIVE_BERRIES } from "../../../sim/pokemon";

export const Scripts: ModdedBattleScriptsData = {
	actions: {
		modifyDamage(baseDamage, pokemon, target, move, suppressMessages) {
			const tr = this.battle.trunc;
			if (!move.type) move.type = '???';
			const type = move.type;

			baseDamage += 2;

			if (move.spreadHit) {
				// multi-target modifier (doubles only)
				const spreadModifier = this.battle.gameType === 'freeforall' ? 0.5 : 0.75;
				this.battle.debug(`Spread modifier: ${spreadModifier}`);
				baseDamage = this.battle.modify(baseDamage, spreadModifier);
			} else if (move.multihitType === 'parentalbond' && move.hit > 1) {
				// Parental Bond modifier
				const bondModifier = this.battle.gen > 6 ? 0.25 : 0.5;
				this.battle.debug(`Parental Bond modifier: ${bondModifier}`);
				baseDamage = this.battle.modify(baseDamage, bondModifier);
			}

			// weather modifier
			baseDamage = this.battle.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

			// crit - not a modifier
			const isCrit = target.getMoveHitData(move).crit;
			if (isCrit) {
				baseDamage = tr(baseDamage * (move.critModifier || (this.battle.gen >= 6 ? 1.15 : 2)));
			}

			// random factor - also not a modifier
			baseDamage = this.battle.randomizer(baseDamage);

			// STAB
			// The "???" type never gets STAB
			// Not even if you Roost in Gen 4 and somehow manage to use
			// Struggle in the same turn.
			// (On second thought, it might be easier to get a MissingNo.)
			if (type !== '???') {
				let stab: number | [number, number] = 1;

				const isSTAB = move.forceSTAB || pokemon.hasType(type) || pokemon.getTypes(false, true).includes(type);
				if (isSTAB) {
					stab = 1.15;
				}

				// The Stellar tera type makes this incredibly confusing
				// If the move's type does not match one of the user's base types,
				// the Stellar tera type applies a one-time 1.2x damage boost for that type.
				//
				// If the move's type does match one of the user's base types,
				// then the Stellar tera type applies a one-time 2x STAB boost for that type,
				// and then goes back to using the regular 1.5x STAB boost for those types.
				if ((pokemon.terastallized || pokemon.m.thirdType) === 'Stellar') {
					if (!pokemon.stellarBoostedTypes.includes(type)) {
						stab = isSTAB ? 2 : [4915, 4096];
						if (pokemon.species.name !== 'Terapagos-Stellar') {
							pokemon.stellarBoostedTypes.push(type);
						}
					}
				} else {
					if (pokemon.terastallized === type && pokemon.getTypes(false, true).includes(type)) {
						stab = 2;
					}
					stab = this.battle.runEvent('ModifySTAB', pokemon, target, move, stab);
				}

				baseDamage = this.battle.modify(baseDamage, stab);
			}

			// types
			let typeMod = target.runEffectiveness(move);
			typeMod = this.battle.clampIntRange(typeMod, -6, 6);
			target.getMoveHitData(move).typeMod = typeMod;
			const isImmune = !this.battle.dex.getImmunity(type, target);
			if (isImmune) {
				// damage-halving is applied; messaging is handled in runImmunity
				baseDamage = this.battle.modify(baseDamage, 0.5);
			} else {
				if (typeMod > 0) {
					if (!suppressMessages) this.battle.add('-supereffective', target);

					for (let i = 0; i < typeMod; i++) {
						baseDamage *= 1.25;
					}
				}
				if (typeMod < 0) {
					if (!suppressMessages) this.battle.add('-resisted', target);

					for (let i = 0; i > typeMod; i--) {
						baseDamage = tr(baseDamage / 1.25);
					}
				}
			}

			if (isCrit && !suppressMessages) this.battle.add('-crit', target);

			if (target.status === 'brn') {
				baseDamage = this.battle.modify(baseDamage, 1.2);
			}

			if (pokemon.status === 'frz') {
				baseDamage = this.battle.modify(baseDamage, 0.8);
			}

			// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
			if (this.battle.gen === 5 && !baseDamage) baseDamage = 1;

			// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
			baseDamage = this.battle.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

			if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
				baseDamage = this.battle.modify(baseDamage, 0.25);
				this.battle.add('-zbroken', target);
			}

			// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
			if (this.battle.gen !== 5 && !baseDamage) return 1;

			// ...but 16-bit truncation happens even later, and can truncate to 0
			return tr(baseDamage, 16);
		},
	},
	pokemon: {
		getItem() {
			const item = this.battle.dex.items.getByID(this.item);
			if (item.exists) return item;
			let bmmItem = this.battle.dex.abilities.getByID(this.item) as Ability | Move;
			if (!bmmItem.exists) bmmItem = this.battle.dex.moves.getByID(this.item);
			return {
				id: this.item,
				name: bmmItem.name || this.name,
				effectType: "Item",
				toString() {
					return bmmItem.name || this.id;
				},
			} as Item;
		},
		/**
		 * Override runImmunity so type immunities no longer block moves. This mirrors
		 * the original logic from pokemon.ts but always returns true and only shows
		 * the normal '-immune' message when requested. The damage-halving is
		 * handled separately in modifyDamage.
		 */
		runImmunity(source: ActiveMove | string, message?: string | boolean) {
			if (!source) return true;
			const type: string = typeof source !== 'string' ? source.type : source;
			if (typeof source !== 'string') {
				if (source.ignoreImmunity && (source.ignoreImmunity === true || source.ignoreImmunity[type])) {
					return true;
				}
			}
			if (!type || type === '???') return true;
			if (!this.battle.dex.types.isName(type)) {
				throw new Error("Use runStatusImmunity for " + type);
			}

			const negateImmunity = !this.battle.runEvent('NegateImmunity', this, type);
			const notImmune = type === 'Ground' ?
				this.isGrounded(negateImmunity) :
				negateImmunity || this.battle.dex.getImmunity(type, this);
			if (notImmune) return true;
			if (message) {
				if (notImmune === null) {
					this.battle.add('-immune', this, '[from] ability: Levitate');
				} else {
					this.battle.add('-immune', this);
				}
			}
			return true;
		},
		hasItem(item) {
			if (this.ignoringItem()) return false;
			if (Array.isArray(item)) return item.some(i => this.hasItem(i));
			const itemId = this.battle.toID(item);
			return this.item === itemId || !!this.volatiles['item:' + itemId];
		},
		takeItem(source) {
			if (!this.item) return false;
			if (!source) source = this;
			if (this.battle.gen <= 4) {
				if (source.itemKnockedOff) return false;
				if (this.battle.toID(this.ability) === 'multitype' || (this.m.scrambled.abilities as { thing: string }[])
					.findIndex(e => this.battle.toID(e.thing) === 'multitype') >= 0) {
					return false;
				}
				if (this.battle.toID(source.ability) === 'multitype' || (source.m.scrambled.abilities as { thing: string }[])
					.findIndex(e => this.battle.toID(e.thing) === 'multitype') >= 0) {
					return false;
				}
			}
			const item = this.getItem();
			if (this.battle.runEvent('TakeItem', this, source, null, item)) {
				this.item = '';
				let wrongSlot = (this.m.scrambled.abilities as { inSlot: string }[]).findIndex(e => e.inSlot === 'Item');
				if (wrongSlot >= 0) {
					const dexAbil = this.battle.dex.abilities.get(this.m.scrambled.abilities[wrongSlot].thing);
					if (dexAbil.flags['failskillswap']) return false;
					this.removeVolatile('ability:' + this.battle.toID(this.m.scrambled.abilities[wrongSlot].thing));
					this.m.scrambled.abilities.splice(wrongSlot, 1);
				} else if ((this.m.scrambled.moves as { inSlot: string }[]).findIndex(e => e.inSlot === 'Item') >= 0) {
					wrongSlot = (this.m.scrambled.moves as { inSlot: string }[]).findIndex(e => e.inSlot === 'Item');
					let indexOfMove = this.baseMoveSlots.findIndex(m => this.battle.toID(this.m.scrambled.moves[wrongSlot].thing) === m.id);
					if (indexOfMove >= 0) this.baseMoveSlots.splice(indexOfMove, 1);
					if (item.id !== 'mimic') {
						indexOfMove = this.moveSlots.findIndex(m => this.battle.toID(this.m.scrambled.moves[wrongSlot].thing) === m.id);
					}
					if (indexOfMove >= 0) this.moveSlots.splice(indexOfMove, 1);
					this.m.scrambled.moves.splice(wrongSlot, 1);
				}
				const oldItemState = this.itemState;
				this.battle.clearEffectState(this.itemState);
				this.pendingStaleness = undefined;
				this.battle.singleEvent('End', item, oldItemState, this);
				this.battle.runEvent('AfterTakeItem', this, null, null, item);
				return item;
			}
			return false;
		},
		setItem(item, source, effect) {
			const allThings = new Set([
				...(this.m.scrambled.abilities as { thing: string }[]).map(e => e.thing),
				...(this.m.scrambled.items as { thing: string }[]).map(e => e.thing),
				...(this.m.scrambled.moves as { thing: string }[]).map(e => e.thing),
				this.ability, ...this.moveSlots.map(e => e.move), this.item,
			].map(this.battle.toID));

			let isBMMItem = false;
			let isOldBMMItem = false;
			if (!this.hp || !this.isActive) return false;
			if (typeof item === 'string') {
				if (!item.length || this.battle.dex.items.get(item).exists) {
					item = this.battle.dex.items.get(item);
				} else {
					const itemString = item;
					let newData = this.battle.dex.abilities.get(itemString) as Ability | Move;
					if (!newData.exists) {
						newData = this.battle.dex.moves.get(itemString);
					} else {
						if ((newData as Ability).flags['failskillswap']) return false;
					}
					item = {
						id: newData.id || itemString,
						name: newData.name || itemString,
						effectType: "Item",
						toString() {
							return newData.name || itemString;
						},
					} as Item;
				}
			}
			if (item.name.length && !this.battle.dex.items.get(item).exists) isBMMItem = true;
			if (allThings.has(item.id)) return false;
			const effectid = this.battle.effect ? this.battle.effect.id : '';
			if (RESTORATIVE_BERRIES.has('leppaberry' as ID)) {
				const inflicted = ['trick', 'switcheroo'].includes(effectid);
				const external = inflicted && source && !source.isAlly(this);
				this.pendingStaleness = external ? 'external' : 'internal';
			} else {
				this.pendingStaleness = undefined;
			}
			const oldItem = this.getItem();
			if (!this.battle.dex.items.get(oldItem).exists) isOldBMMItem = true;
			const oldItemState = this.itemState;
			this.item = item.id;
			this.itemState = this.battle.initEffectState({ id: item.id, target: this });
			if (oldItem.exists) this.battle.singleEvent('End', oldItem, oldItemState, this);
			if (isOldBMMItem) {
				const isAbil = (this.m.scrambled.abilities as { inSlot: string }[]).findIndex(e => e.inSlot === 'Item');
				if (isAbil >= 0) {
					this.removeVolatile('ability:' + this.battle.toID(this.m.scrambled.items[isAbil].thing));
					this.m.scrambled.abilities.splice(isAbil, 1);
				} else if ((this.m.scrambled.moves as { inSlot: string }[]).findIndex(e => e.inSlot === 'Item') >= 0) {
					const isMove = (this.m.scrambled.moves as { inSlot: string }[]).findIndex(e => e.inSlot === 'Item');
					let indexOfMove = this.baseMoveSlots.findIndex(m => this.battle.toID(this.m.scrambled.moves[isMove].thing) === m.id);
					if (indexOfMove >= 0) this.baseMoveSlots.splice(indexOfMove, 1);
					if (oldItem.id !== 'mimic') {
						indexOfMove = this.moveSlots.findIndex(m => this.battle.toID(this.m.scrambled.moves[isMove].thing) === m.id);
					}
					if (indexOfMove >= 0) this.moveSlots.splice(indexOfMove, 1);
					this.m.scrambled.moves.splice(isMove, 1);
				}
			}
			if (item.id) {
				this.battle.singleEvent('Start', item, this.itemState, this, source, effect);
			}
			if (isBMMItem) {
				if (this.battle.dex.abilities.get(item.id).exists) {
					this.m.scrambled.abilities.push({ thing: item.id, inSlot: 'Item' });
					const abileffect = 'ability:' + this.battle.toID(item.id);
					this.addVolatile(abileffect);
					this.volatiles[abileffect].inSlot = 'Item';
				} else {
					this.m.scrambled.moves.push({ thing: item.id, inSlot: 'Item' });
					const move = Dex.moves.get(item.id);
					const newMove = {
						move: move.name,
						id: move.id,
						pp: move.noPPBoosts ? move.pp : move.pp * 8 / 5,
						maxpp: move.noPPBoosts ? move.pp : move.pp * 8 / 5,
						target: move.target,
						disabled: false,
						used: false,
					};
					this.baseMoveSlots.push(newMove);
					this.moveSlots.push(newMove);
				}
			}
			return true;
		},

		eatItem(force, source, sourceEffect) {
			const item = sourceEffect?.effectType === 'Item' ? sourceEffect :
				this.battle.effect.effectType === 'Item' ? this.battle.effect : this.getItem();
			if (!item) return false;
			if ((!this.hp && this.battle.toID(item.name) !== 'jabocaberry' && this.battle.toID(item.name) !== 'rowapberry') ||
				!this.isActive) return false;

			if (!sourceEffect && this.battle.effect) sourceEffect = this.battle.effect;
			if (!source && this.battle.event?.target) source = this.battle.event.target;
			// if (sourceEffect?.effectType === 'Item' && this.item !== sourceEffect.id && source === this) {
			// 	// if an item is telling us to eat it but we aren't holding it, we probably shouldn't eat what we are holding
			// 	return false;
			// }
			if (
				this.battle.runEvent('UseItem', this, null, null, Dex.items.get(item.name)) &&
				(force || this.battle.runEvent('TryEatItem', this, null, null, Dex.items.get(item.name)))
			) {
				this.battle.add('-enditem', this, Dex.items.get(item.name), '[eat]');

				this.battle.singleEvent('Eat', Dex.items.get(item.name), this.itemState, this, source, sourceEffect);
				this.battle.runEvent('EatItem', this, source, sourceEffect, Dex.items.get(item.name));

				if (RESTORATIVE_BERRIES.has(item.id)) {
					switch (this.pendingStaleness) {
					case 'internal':
						if (this.staleness !== 'external') this.staleness = 'internal';
						break;
					case 'external':
						this.staleness = 'external';
						break;
					}
					this.pendingStaleness = undefined;
				}

				const isBMM = this.volatiles[item.id]?.inSlot;
				if (isBMM) {
					const dexItem = this.battle.dex.items.get(item.name);
					this.removeVolatile(item.id);
					const itemIndex = (this.m.scrambled.items as { thing: string, inSlot: string }[]).findIndex(e =>
						this.battle.toID(e.thing) === dexItem.id && e.inSlot === isBMM);
					if (itemIndex >= 0) this.m.scrambled.items.splice(itemIndex, 1);
					if (isBMM === 'Ability') this.setAbility('No Ability');
				} else {
					this.lastItem = this.item;
					this.item = '';
				}
				this.battle.clearEffectState(this.itemState);
				this.usedItemThisTurn = true;
				this.ateBerry = true;
				this.battle.runEvent('AfterUseItem', this, null, null, Dex.items.get(item.name));
				return true;
			}
			return false;
		},

		useItem(source, sourceEffect) {
			const item = sourceEffect?.effectType === 'Item' ? sourceEffect :
				this.battle.effect.effectType === 'Item' ? this.battle.effect : this.getItem();
			if ((!this.hp && !item.isGem) || !this.isActive) return false;
			if (!item) return false;

			if (!sourceEffect && this.battle.effect) sourceEffect = this.battle.effect;
			if (!source && this.battle.event?.target) source = this.battle.event.target;
			// const item = this.getItem();
			// if (sourceEffect?.effectType === 'Item' && this.item !== sourceEffect.id && source === this) {
			// 	// if an item is telling us to eat it but we aren't holding it, we probably shouldn't eat what we are holding
			// 	return false;
			// }
			if (this.battle.runEvent('UseItem', this, null, null, Dex.items.get(item.name))) {
				switch (item.id) {
				case 'redcard':
					this.battle.add('-enditem', this, Dex.items.get(item.name), `[of] ${source}`);
					break;
				default:
					if (item.isGem) {
						this.battle.add('-enditem', this, Dex.items.get(item.name), '[from] gem');
					} else {
						this.battle.add('-enditem', this, Dex.items.get(item.name));
					}
					break;
				}
				if (item.boosts) {
					this.battle.boost(item.boosts, this, source, Dex.items.get(item.name));
				}

				this.battle.singleEvent('Use', Dex.items.get(item.name), this.itemState, this, source, sourceEffect);

				const isBMM = this.volatiles[item.id]?.inSlot;
				if (isBMM) {
					const dexItem = this.battle.dex.items.get(item.name);
					this.removeVolatile(item.id);
					const itemIndex = (this.m.scrambled.items as { thing: string, inSlot: string }[]).findIndex(e =>
						this.battle.toID(e.thing) === dexItem.id && e.inSlot === isBMM);
					if (itemIndex >= 0) this.m.scrambled.items.splice(itemIndex, 1);
					if (isBMM === 'Ability') this.setAbility('No Ability');
				} else {
					this.lastItem = this.item;
					this.item = '';
				}
				this.battle.clearEffectState(this.itemState);
				this.usedItemThisTurn = true;
				this.battle.runEvent('AfterUseItem', this, null, null, item);
				return true;
			}
			return false;
		},
		transformInto(pokemon, effect) {
			const species = pokemon.species;
			if (
				pokemon.fainted || this.illusion || pokemon.illusion || (pokemon.volatiles['substitute'] && this.battle.gen >= 5) ||
				(pokemon.transformed && this.battle.gen >= 2) || (this.transformed && this.battle.gen >= 5) ||
				species.name === 'Eternatus-Eternamax' ||
				(['Ogerpon', 'Terapagos'].includes(species.baseSpecies) && (this.terastallized || pokemon.terastallized)) ||
				this.terastallized === 'Stellar'
			) {
				return false;
			}

			if (this.battle.dex.currentMod === 'gen1stadium' && (
				species.name === 'Ditto' ||
				(this.species.name === 'Ditto' && pokemon.moves.includes('transform'))
			)) {
				return false;
			}

			if (!this.setSpecies(species, effect, true)) return false;

			this.transformed = true;
			this.weighthg = pokemon.weighthg;

			const types = pokemon.getTypes(true, true);
			this.setType(pokemon.volatiles['roost'] ? pokemon.volatiles['roost'].typeWas : types, true);
			this.addedType = pokemon.addedType;
			this.knownType = this.isAlly(pokemon) && pokemon.knownType;
			this.apparentType = pokemon.apparentType;

			let statName: StatIDExceptHP;
			for (statName in this.storedStats) {
				this.storedStats[statName] = pokemon.storedStats[statName];
				if (this.modifiedStats) this.modifiedStats[statName] = pokemon.modifiedStats![statName]; // Gen 1: Copy modified stats.
			}
			this.moveSlots = [];
			this.hpType = (this.battle.gen >= 5 ? this.hpType : pokemon.hpType);
			this.hpPower = (this.battle.gen >= 5 ? this.hpPower : pokemon.hpPower);
			this.timesAttacked = pokemon.timesAttacked;
			for (const moveSlot of pokemon.moveSlots) {
				let moveName = moveSlot.move;
				if (moveSlot.id === 'hiddenpower') {
					moveName = 'Hidden Power ' + this.hpType;
				}
				this.moveSlots.push({
					move: moveName,
					id: moveSlot.id,
					pp: moveSlot.maxpp === 1 ? 1 : 5,
					maxpp: this.battle.gen >= 5 ? (moveSlot.maxpp === 1 ? 1 : 5) : moveSlot.maxpp,
					target: moveSlot.target,
					disabled: false,
					used: false,
					virtual: true,
				});
			}
			let boostName: BoostID;
			for (boostName in pokemon.boosts) {
				this.boosts[boostName] = pokemon.boosts[boostName];
			}
			if (this.battle.gen >= 6) {
				// we need to remove all of the overlapping crit volatiles before adding any of them
				const volatilesToCopy = ['dragoncheer', 'focusenergy', 'gmaxchistrike', 'laserfocus'];
				for (const volatile of volatilesToCopy) this.removeVolatile(volatile);
				for (const volatile of volatilesToCopy) {
					if (pokemon.volatiles[volatile]) {
						this.addVolatile(volatile);
						if (volatile === 'gmaxchistrike') this.volatiles[volatile].layers = pokemon.volatiles[volatile].layers;
						if (volatile === 'dragoncheer') this.volatiles[volatile].hasDragonType = pokemon.volatiles[volatile].hasDragonType;
					}
				}
			}
			if (effect) {
				this.battle.add('-transform', this, pokemon, '[from] ' + effect.fullname);
			} else {
				this.battle.add('-transform', this, pokemon);
			}
			if (this.terastallized) {
				this.knownType = true;
				this.apparentType = this.terastallized;
			}
			if (this.battle.gen > 2) this.setAbility(pokemon.ability, this, null, true, true);

			// Change formes based on held items (for Transform)
			// Only ever relevant in Generation 4 since Generation 3 didn't have item-based forme changes
			if (this.battle.gen === 4) {
				if (this.species.num === 487) {
					// Giratina formes
					if (this.species.name === 'Giratina' && this.item === 'griseousorb') {
						this.formeChange('Giratina-Origin');
					} else if (this.species.name === 'Giratina-Origin' && this.item !== 'griseousorb') {
						this.formeChange('Giratina');
					}
				}
				if (this.species.num === 493) {
					// Arceus formes
					const item = this.getItem();
					const targetForme = (item?.onPlate ? 'Arceus-' + item.onPlate : 'Arceus');
					if (this.species.name !== targetForme) {
						this.formeChange(targetForme);
					}
				}
			}

			// Pokemon transformed into Ogerpon cannot Terastallize
			// restoring their ability to tera after they untransform is handled ELSEWHERE
			if (['Ogerpon', 'Terapagos'].includes(this.species.baseSpecies) && this.canTerastallize) this.canTerastallize = false;

			for (const volatile in this.volatiles) {
				if (this.volatiles[volatile].inSlot && this.volatiles[volatile].inSlot === 'Move') {
					this.removeVolatile(volatile);
				}
			}

			for (const volatile in pokemon.volatiles) {
				if (pokemon.volatiles[volatile].inSlot && pokemon.volatiles[volatile].inSlot === 'Move') {
					this.addVolatile(volatile);
					this.volatiles[volatile].inSlot = 'Move';
				}
			}

			return true;
		},
	},
	field: {
		suppressingWeather() {
			for (const pokemon of this.battle.getAllActive()) {
				const innates = Object.keys(pokemon.volatiles).filter(x => x.startsWith('ability:'));
				if (pokemon && !pokemon.ignoringAbility() &&
					(pokemon.getAbility().suppressWeather || innates.some(x => (
						this.battle.dex.abilities.get(x.replace('ability:', '')).suppressWeather
					)))) {
					return true;
				}
			}
			return false;
		},
	},
};
