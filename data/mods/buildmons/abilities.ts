export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
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
	doubledown: {
		onAfterTerastallization(pokemon) {
			if (!pokemon.volatiles['doubledown']) pokemon.addVolatile('doubledown');
		},
		condition: {
			onAfterMove(source, target, move) {
				if (move.category === 'Status' || move.flags['charge'] || move.flags['recharge'] || move.flags['futuremove']) return;
				if (target && !target.fainted && source.lastMoveUsed?.id) this.actions.useMove(source.lastMoveUsed.id, source, { target });
				source.removeVolatile('doubledown');
			},
		},
		flags: {},
		name: "Double Down",
		shortDesc: "On activation uses its next attacking move twice.",
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
				this.effectState.prism++;
				this.add('-start', source, 'typechange', type, '[from] ability: Prismatic');
      			this.add('start', source, `Prism: ${this.effectState.prism}x`, '[silent]');
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
				this.add('-activate', target, 'ability: Stressed', `Missing HP: ${missing}`);
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Stressed');
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
	},
};
