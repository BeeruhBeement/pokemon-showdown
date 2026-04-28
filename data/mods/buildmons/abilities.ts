export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	brutal: {
		onAfterTerastallization(pokemon) {
			pokemon.addVolatile('doubletap');
			pokemon.addVolatile('brutal');
		},
		condition: {
			duration: 3,
			onStart(target) {
				this.add('-start', target, 'Brutal Mode');
			},
			onEnd(target) {
				this.add('-end', target, 'Brutal Mode');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (move.category !== 'Status') {
					const drain = Math.floor(pokemon.lastDamage * 0.25);
					this.heal(drain, pokemon, pokemon);
					this.add('-heal', pokemon, pokemon.hp, `[drain] ${drain}`);
				}
			},
			onResidualOrder: 26,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.maxhp * 0.25), pokemon, pokemon);
			},
		},
		flags: {},
		name: "Brutal",
		shortDesc: "On activation gain Double Tap, moves gain 25% drain and lose 25% HP at the end of turn for 3 turns.",
	},
	desperado: {
		onStart(pokemon) {
			this.effectState.stacks = 0;
			pokemon.canTerastallize = false;
		},
		onEnd(pokemon) {
			this.effectState.stacks = 0;
		},
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.effectState.stacks = Math.min(6, (this.effectState.stacks || 0) + 1);
				this.add('-start', source, `Desperado: ${this.effectState.stacks}x`, '[silent]');
			}
			const stacks = this.effectState.stacks || 0;
			if (stacks) {
				return this.chainModify(1 + 0.1 * stacks);
			}
		},
		flags: {},
		name: "Desperado",
		shortDesc: "Critical hits grant a stack that boosts damage by 10% for each, up to 60%.",
	},
	divine: {
		onHit(target, source, move) {
			if (target.getMoveHitData(move).crit) {
				this.add('-ability', target, 'Divine');
				for (const ally of source.side.active) {
					if (ally && !ally.fainted && !ally.volatiles['regen']) {
						ally.addVolatile('regen');
					}
				}
			}
		},
		onAfterTerastallization(pokemon) {
			pokemon.addVolatile('divine');
		},
		condition: {
			onStart(target) {
				this.add('-start', target, 'Divine');
			},
			onBeforeMove(pokemon, target, move) {
				move.accuracy = true;
			},
			onModifyMove(move, pokemon) {
				move.willCrit = true;
			},
			onEffectiveness(typeMod, target, type, move) {
				if (typeMod <= 0) {
					return 1;
				}
			},
			onAfterMove(source) {
				source.removeVolatile('divine');
			},
		},
		flags: {},
		name: "Divine",
		shortDesc: "Critical hits grant Regen to user's side. Activation: next attack always hits, crits, and super-effective.",
	},
	doubletap: {
		onAfterTerastallization(pokemon) {
			if (!pokemon.volatiles['doubletap']) pokemon.addVolatile('doubletap');
		},
		condition: {
			onAfterMove(source, target, move) {
				if (move.category === 'Status' || move.flags['charge'] || move.flags['recharge'] || move.flags['futuremove']) return;
				if (target && !target.fainted && source.lastMoveUsed?.id) this.actions.useMove(source.lastMoveUsed.id, source, { target });
				source.removeVolatile('doubletap');
			},
		},
		flags: {},
		name: "Double Tap",
		shortDesc: "On activation uses its next attacking move twice.",
	},
	pyromaniac: {
		onStart(pokemon) {
			this.effectState.fireTotal = 0;
			pokemon.canTerastallize = false;
		},
		onUpdate(pokemon) {
			pokemon.trySetStatus('brn', pokemon);
		},
		onDamage(damage, target, source, effect) {
			if (effect.id === 'brn') {
				return false;
			}
		},
		onPrepareHit(source, target, move) {
			if (move.type === 'Fire' && source.canTerastallize !== null) {
				this.effectState.fireTotal = (this.effectState.fireTotal || 0) + (move.basePower || 0);
				if (this.effectState.fireTotal >= 250) {
					source.canTerastallize = source.teraType;
				}
			}
		},
		onAfterTerastallization(pokemon) {
			pokemon.addVolatile('spedown');
			pokemon.addVolatile('suppression');
			this.boost({ spa: 100 }, pokemon, pokemon);
		},
		flags: {},
		name: "Pyromaniac",
		shortDesc: "Burns but immune. Using Fire for 250 BP enables Activation: Spe Down, Suppression, 100% SpA.",
	},
	feral: {
		onStart(pokemon) {
			pokemon.canTerastallize = false;
		},
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (pokemon.activeTurns && (!pokemon.lastMoveUsed || pokemon.lastMove?.category === 'Status')) {
				pokemon.addVolatile('taunt');
				this.boost({ atk: 50 }, pokemon, pokemon);
			}
		},
		onAfterMove(pokemon, target, move) {
			if (move.category !== 'Status') {
				// Remove all stat boosts
				const boosts: SparseBoostsTable = {};
				for (const stat in pokemon.boosts) {
					const statKey = stat as BoostID;
					if (pokemon.boosts[statKey] !== 0) {
						boosts[statKey] = -pokemon.boosts[statKey];
					}
				}
				if (Object.keys(boosts).length) {
					this.boost(boosts, pokemon, pokemon);
				}
			}
		},
		flags: {},
		name: "Feral",
		shortDesc: "If doesn't attack for a turn: Taunt and 50% Attack boost. Boosts are lost after attacking.",
	},
	/*
	allseeing: {
		onAfterTerastallization(pokemon) {
			const foes = pokemon.foes().filter(foe => foe && !foe.fainted);
			if (!foes.length) return;
			const target = this.sample(foes);
			if (!target) return;

			const options: {type: 'item' | 'move'; value: string}[] = [];
			if (target.item) options.push({type: 'item', value: target.getItem().name});
			for (const moveSlot of target.moveSlots) {
				if (moveSlot?.move) options.push({type: 'move', value: this.dex.moves.get(moveSlot.move).name});
			}
			if (!options.length) return;

			const choice = this.sample(options);
			this.add('-activate', pokemon, 'ability: All-Seeing', `${choice.type === 'item' ? 'revealed item' : 'revealed move'} ${choice.value}`);
			if (target.status) {
				// still reveal even if already statused
				return;
			}
			target.trySetStatus('brn', pokemon);
		},
		flags: {},
		name: "All-Seeing",
		shortDesc: "On activation reveals a random foe move/item and burns that foe.",
	},
	covertoperative: {
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.position !== defender.position) {
				return this.chainModify(1.25);
			}
		},
		onAfterTerastallization(pokemon) {
			let success = true;
			// Fail in formats where you don't control allies
			if (this.format.gameType !== 'doubles' && this.format.gameType !== 'triples') success = false;

			// Fail in triples if the Pokemon is in the middle
			if (pokemon.side.active.length === 3 && pokemon.position === 1) success = false;

			const newPosition = (pokemon.position === 0 ? pokemon.side.active.length - 1 : 0);
			if (!pokemon.side.active[newPosition]) success = false;
			if (pokemon.side.active[newPosition].fainted) success = false;
			if (!success) {
				this.attrLastMove('[still]');
				return this.NOT_FAIL;
			}
			this.swapPosition(pokemon, newPosition);
		},
		name: "Covert Operative",
		shortDesc: "Deal 1.25x damage when not attacking in front. On activation switch with ally.",
	},
	engineer: {
		onEnd(pokemon) {
			this.effectState.used = false;
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2 || pokemon.volatiles['turret'] || this.effectState.used) {
				pokemon.canTerastallize = false;
			} else {
				pokemon.canTerastallize = pokemon.teraType;
			}
		},
		onAfterTerastallization(pokemon) {
			this.directDamage(pokemon.maxhp / 2);
			pokemon.addVolatile('turret');
			this.effectState.used = true;
		},
		flags: {},
		name: "Engineer",
		shortDesc: "On activation summons a Turret in exchange for 1/2 of the user's max HP.",
	},
	entombingjaws: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (move.flags['bite']) {
				target.trySetStatus('ptr', source);
			}
		},
		onAfterTerastallization(pokemon) {
			pokemon.adjacentFoes().forEach(foe => { if (foe.status === 'ptr') foe.addVolatile('flinch'); });
		},
		flags: {},
		name: "Entombing Jaws",
		shortDesc: "Biting moves petrify targets. On activation flinch petrified foes.",
	},
	greedy: {
		onAfterTerastallization(pokemon) {
			const target = pokemon.foes()[0];
			if (target && !target.fainted) this.actions.useMove('punishment', pokemon, { target });
		},
		flags: {},
		name: "Greedy",
		shortDesc: "On activation uses Punishment.",
	},
	heatengine: {
		onStart(pokemon) {
			this.effectState.heat = 0;
		},
		onEnd(pokemon) {
      		this.add('-end', pokemon, `Heat: ${this.effectState.heat}x`, '[silent]');
			this.effectState.heat = 0;
		},
		onUpdate(pokemon) {
			if (this.effectState.heat === 0) pokemon.canTerastallize = false;
			else pokemon.canTerastallize = pokemon.teraType;
		},
		onAfterMove(source, target, move) {
			if (move.category === 'Status') return;
      		this.add('-end', source, `Heat: ${this.effectState.heat}x`, '[silent]');
			this.effectState.heat = Math.min(5, (this.effectState.heat || 0) + 1);
      		this.add('-start', source, `Heat: ${this.effectState.heat}x`, '[silent]');
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, source, target, move) {
			const heat = this.effectState.heat || 0;
			if (!heat) return;
			return this.chainModify(1 + 0.05 * heat);
		},
		onAfterTerastallization(pokemon) {
			const heat = this.effectState.heat || 0;
			if (!heat) return;
			const damageRatio = 0.05 * heat;
			pokemon.adjacentFoes().forEach(foe => {
				this.damage(Math.floor(foe.maxhp * damageRatio), foe, pokemon);
				if (this.randomChance(heat, 5)) {
					foe.trySetStatus('brn', pokemon);
				}
			});
      		this.add('-end', pokemon, `Heat: ${this.effectState.heat}x`, '[silent]');
			this.effectState.heat = 0;
			pokemon.canTerastallize = pokemon.teraType;
		},
		flags: {},
		name: "Heat Engine",
		shortDesc: "Each attack adds 5% power (max 25%). Activation damages and 20% burn per stack.",
	},
	highnoon: {
		onAnyModifyDamage(relayVar, source, target, move) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.15);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onAfterTerastallization(pokemon) {
			this.field.setWeather('sandstorm');
			pokemon.addVolatile('highnoon');
		},
		condition: {
			onModifyPriority(priority, pokemon, target, move) {
				return priority + 1;
			},
			onAfterMove(source, target, move) {
				source.removeVolatile('highnoon');
			},
		},
		flags: {},
		name: "High Noon",
		shortDesc: "All damage is 1.15 in Sandstorm. Activation: Sandstorm and +1 prio on next move.",
	},
	leecher: {
		onAfterMoveSecondarySelf(pokemon, target, move) {
			this.heal(pokemon.lastDamage / 6, pokemon, pokemon);
		},
		onAfterTerastallization(pokemon) {
			if (!pokemon.volatiles['leecher']) pokemon.addVolatile('leecher');
		},
		condition: {
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (move.category === 'Status' || move.flags['charge'] || move.flags['recharge'] || move.flags['futuremove']) return;
				this.heal(pokemon.lastDamage, pokemon, pokemon);
				pokemon.removeVolatile('leecher');
			},
		},
		flags: {},
		name: "Leecher",
		shortDesc: "Moves drain 1/6th of damage dealt. On activation next attack gains +100% drain.",
	},
	perplexing: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (this.field.pseudoWeather['magicroom'] || this.field.pseudoWeather['trickroom'] || this.field.pseudoWeather['wonderroom']) {
					this.damage(target.baseMaxhp / 15, target, pokemon);
				}
			}
		},
		onAfterTerastallization(pokemon) {
			this.field.addPseudoWeather('wonderroom');
		},
		flags: {},
		name: "Perplexing",
		shortDesc: "Foes take 1/15th damage during room effects. On activation sets up Wonder Room.",
	},
	plaguebearer: {
		onSourceModifyDamage(relayVar, source, target, move) {
			if (target.status === 'psn' || target.status === 'tox') {
				this.debug('Plaguebearer weaken');
				return this.chainModify(0.85);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === '') {
				pokemon.canTerastallize = pokemon.teraType;
			}
		},
		onAfterTerastallization(pokemon) {
			const move = this.dex.getActiveMove('poisongas');
			move.accuracy = 100;
			move.target = 'normal';
			for (const target of this.getAllActive()) {
				if (target && !target.fainted) {
					this.actions.useMove(move, pokemon, { target });
				}
			}
		},
		flags: {},
		name: "Plaguebearer",
		shortDesc: "Poisoned: 15% less damage. Activation: Poison Gas on every Pokemon, including user.",
	},
	prismatic: {
		onStart(pokemon) {
			this.effectState.prism = 0;
		},
		onEnd(pokemon) {
      		this.add('-end', pokemon, `Prism: ${this.effectState.prism}x`, '[silent]');
			this.effectState.prism = 0;
		},
		onPrepareHit(source, target, move) {
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
      			this.add('-end', source, `Prism: ${this.effectState.prism}x`, '[silent]');
				this.effectState.prism++;
				this.add('-start', source, 'typechange', type, '[from] ability: Prismatic');
      			this.add('-start', source, `Prism: ${this.effectState.prism}x`, '[silent]');
			}
		},
		onAfterTerastallization(pokemon) {
			const prism = this.effectState.prism || 0;
			if (!prism) return;
			const heal = 0.05 * prism;
			this.heal(Math.floor(pokemon.maxhp * heal), pokemon, pokemon);
      		this.add('-end', pokemon, `Prism: ${this.effectState.prism}x`, '[silent]');
			this.effectState.prism = 0;
			pokemon.canTerastallize = pokemon.teraType;
		},
		flags: {},
		name: "Prismatic",
		shortDesc: "Changes type to move type. On activation heals 5% per type change.",
	},
	punisher: {
		onDamagingHit(damage, target, source, move) {
			source.addVolatile('punisher', target);
		},
		onAfterTerastallization(pokemon) {
			for (const target of pokemon.adjacentFoes()) {
				pokemon.adjacentFoes().forEach(foe => { if (foe.volatiles['punisher']) foe.addVolatile('flinch'); });
			}
		},
		condition: {
			onStart(target, source, sourceEffect) {
				this.add('-start', target, 'guilty');
			},
			onDamage(damage, target, source, effect) {
				if (effect && effect.effectType === 'Move') {
					this.debug('Guilty increase');
					return this.chainModify(1.1);
				}
			},
			onUpdate(pokemon) {
				const source = this.effectState.source;			
				if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns || !source.hasAbility('punisher'))) {
					delete pokemon.volatiles['guilty'];
					return;
				}
			},
		},
		flags: {},
		name: "Punisher",
		shortDesc: "Applies Guilty on being hit. On activation flinch all guilty Pokemon.",
	},
	pyromaniac: {
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (!this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Rapid boost');
				return this.chainModify([11, 10]);
			}
		},
		onAfterTerastallization(pokemon) {
			for (const target of pokemon.adjacentFoes()) {
				if (target.status === 'brn') target.addVolatile('suppression');
			}
		},
		flags: {},
		name: "Pyromaniac",
		shortDesc: "Burn foes boosting their stat stage. Activation suppresses burned foes.",
	},
	rampart: {
		name: "Rampart",
		onAllyHit(target, source, move) {
			if (!source || !move) return;

			const rampartUser = this.effectState.target;
			if (!rampartUser.hp || rampartUser.fainted) return;
			if (rampartUser.volatiles['followme']) return;

			this.add('-activate', rampartUser, 'ability: Rampart');

			rampartUser.addVolatile('followme');
		},
		onAfterTerastallization(pokemon) {
			pokemon.addVolatile('rampart');
		},
		condition: {
			duration: 1,
			onStart(target, source, effect) {
				if (effect?.id === 'zpower') {
					this.add('-singleturn', target, 'move: Follow Me', '[zeffect]');
				} else {
					this.add('-singleturn', target, 'move: Follow Me');
				}
			},
			onFoeRedirectTargetPriority: 1,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("Follow Me redirected target of move");
					return this.effectState.target;
				}
			},
			onSourceModifyDamage(relayVar, source, target, move) {
				this.debug('Rampart weaken');
				return this.chainModify([2, 3]);
			},
		},
		shortDesc: "If ally hit gain Follow Me. Activation redirects moves, takes 2/3rd damage.",
	},
	rapid: {
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (!this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Rapid boost');
				return this.chainModify([11, 10]);
			}
		},
		onAfterTerastallization(pokemon) {
			for (const pokemon of this.getAllActive()) {
				pokemon.addVolatile('haste');
			}
		},
		flags: {},
		name: "Rapid",
		shortDesc: "10% boost if first to move. On activation grant Haste to user's side for 2 turns.",
	},
	scrappy: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true && target) {
				for (const type of this.dex.types.all()) {
					if (target.runImmunity(type.name)) {
						move.ignoreImmunity[type.name] = true;
					}
				}
			}
		},
		onTryBoost(boost, target, source, effect) {},
		onAfterTerastallization(pokemon) {
			this.actions.useMove('bulkup', pokemon);
		},
		desc: "Moves ignore immunities. On activation use Bulk Up.",
		shortDesc: "Moves ignore immunities. On activation use Bulk Up.",
	},
	searinginsight: {
		onModifyDamage(damage, source, target, move) {
			if (move && move.category === 'Special' && target.status === 'brn') {
				return this.chainModify(1.15);
			}
		},
		onAfterTerastallization(pokemon) {
			pokemon.adjacentFoes().forEach(foe => {
				foe.trySetStatus('brn', pokemon);
			});
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				source.canTerastallize = source.teraType;
			}
		},
		flags: {},
		name: "Searing Insight",
		shortDesc: "15% more special damage to burned targets. Activation burns adjacent foes.",
	},
	shockquills: {
		onSourceAfterMove(pokemon, target, move) {
			if (move.type === 'Electric' && target && !target.fainted) {
				const shieldAmount = pokemon.maxhp / 10;

				if (!pokemon.volatiles['shield']) {
					pokemon.addVolatile('shield');
				}

				const volatile = pokemon.volatiles['shield'];
				if (volatile) {
					if (!volatile.effectState) {
						volatile.effectState = {};
					}
					const oldShield = volatile.effectState.shield || 0;
					const newShield = Math.min(oldShield + shieldAmount, pokemon.maxhp);
					volatile.effectState.shield = newShield;
					
					this.add('-end', pokemon, `Shield: ${Math.floor(oldShield)}`);
					this.add('-start', pokemon, `Shield: ${Math.floor(newShield)}`);
				}
			}
		},
		onStart(pokemon) {
			this.effectState.activated = false;
		},
		onUpdate(pokemon) {
			const shieldVolatile = pokemon.volatiles['shield'];
			if (shieldVolatile?.effectState?.shield >= pokemon.maxhp * 0.2 && !this.effectState.activated) {
				pokemon.canTerastallize = pokemon.teraType;
			} else {
				pokemon.canTerastallize = false;
			}
		},
		onAfterTerastallization(pokemon) {
			pokemon.adjacentAllies().forEach(ally => {
				ally.trySetStatus('par', pokemon);
			});
			pokemon.adjacentFoes().forEach(foe => {
				foe.trySetStatus('par', pokemon);
			});
			this.effectState.activated = true;
		},
		flags: {},
		name: "Shock Quills",
		shortDesc: "Using Electric move grants 10% shield. If shield >= 20% can activate to paralyze field.",
	},
	sniper: {
		inherit: true,
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.debug('Sniper boost');
				return this.chainModify(1.15);
			}
		},
		onAfterTerastallization(pokemon) {
			if (!pokemon.volatiles['laserfocus']) pokemon.addVolatile('laserfocus');
		},
		shortDesc: "Critical hit damage is multiplied by 1.15. On activation gain Laser Focus.",
	},
	soulbrand: {
		onStart(pokemon) {
			this.effectState.essence = 0;
		},
		onEnd(pokemon) {
	  		this.add('-end', pokemon, `Essence: ${this.effectState.essence}x`, '[silent]');
			this.effectState.essence = 0;
		},
		onAnySwitchIn(pokemon) {
			for (const target of this.getAllActive()) {
				if (target.ability !== 'soulbrand') {
					target.addVolatile('deathbrand', pokemon);
				}
			}
		},
		onAnyFaint(target, source, effect) {
      		this.add('-end', source, `Essence: ${this.effectState.essence}x`, '[silent]');
			this.effectState.essence = (this.effectState.essence || 0) + 1;
      		this.add('-start', source, `Essence: ${this.effectState.essence}x`, '[silent]');
		},
		onAfterTerastallization(pokemon) {
			const essence = this.effectState.essence || 0;
			if (!essence) return;
			const damageRatio = 0.1 * essence;
			if (essence > 1) this.damage(Math.floor(pokemon.maxhp * damageRatio), pokemon, pokemon);
      		this.add('-end', pokemon, `Essence: ${this.effectState.essence}x`, '[silent]');
			this.effectState.essence = 0;
			pokemon.canTerastallize = pokemon.teraType;
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			this.debug(`Soul Brand boost: ${1 + 0.1 * this.effectState.essence}`);
			return this.chainModify(1 + 0.1 * this.effectState.essence, 1);
		},
		flags: {},
		name: "Soul Brand",
		shortDesc: "Switch-ins: Death Brand. Gain essence for kill on branded. Activation consumes essence.",
	},
	stressed: {
		onModifySpe(spe, pokemon) {
			return spe + (pokemon.maxhp - pokemon.hp);
		},
		onUpdate(pokemon) {
			if (pokemon.hp >= pokemon.maxhp) {
				pokemon.canTerastallize = false;
			} else {
				pokemon.canTerastallize = pokemon.teraType;
			}
		},
		onAfterTerastallization(pokemon) {
			pokemon.addVolatile('stressed', pokemon);
		},
		condition: {
			onStart(target, source, sourceEffect) {
				const missing = source.maxhp - source.hp;
				this.effectState.boost = Math.floor(missing / 10);
				this.add('-start', target, `Missing HP: ${missing}`);
			},
			onEnd(target) {
				this.add('-end', target, `Missing HP`);
			},
			onModifyDamage(relayVar, source, target, move) {
				if (this.effectState.boost) {
					this.debug('Stressed boost');
					return this.chainModify(1 + 0.01 * this.effectState.boost);
				}
			},
		},
		flags: {},
		name: "Stressed",
		shortDesc: "Missing HP is added to Speed. On activation gain a damage boost for missing HP / 10.",
	},
	trapper: {
		onHit(target, source, move) {
			if (move.basePower > 60) {
				if (target && !target.fainted) this.actions.useMove('bite', target, { target: source });
			}
		},
		onAfterTerastallization(pokemon) {
			pokemon.heal(pokemon.maxhp / 2);
		},
		flags: {},
		name: "Trapper",
		shortDesc: "When hit by a move above 60 BP retaliates with Bite. On activation heal 50% HP.",
	},
	vampiric: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (move.flags['bite'] || move.flags['slicing'] || move.drain) {
				target.trySetStatus('bld', source);
			}
		},
		onAfterTerastallization(pokemon) {
			pokemon.adjacentFoes().forEach(foe => { if (foe.status === 'bld') {
				this.damage(foe.maxhp / 4, foe, pokemon); }
				this.heal(foe.maxhp / 4, pokemon, foe, "drain");
				foe.cureStatus();
			});
		},
		flags: {},
		name: "Vampiric",
		shortDesc: "Biting, Slicing, Draining bleed. Activation drains 1/4th of bleeding foes HP and heal bleed.",
	},*/
};
