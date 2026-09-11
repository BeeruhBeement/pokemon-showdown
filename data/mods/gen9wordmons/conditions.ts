export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	rot: {
		name: 'rot',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (!target.isActive) return;
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'rot', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else {
				this.add('-status', target, 'rot');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.hp / 5);
		},
	},
	bld: {
		name: 'bld',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'bld', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else {
				this.add('-status', target, 'bld');
			}
		},
		// halved healing
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const noheals = ['drain', 'leechseed'];
			if (!noheals.includes(effect.id)) {
				return this.chainModify([1, 2]);
			}
		},
	},
	wet: {
		name: 'wet',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'wet', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'wet');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			let stats: BoostID[] = [];
			const boost: SparseBoostsTable = {};

			let randomStat: BoostID | undefined = stats.length ? this.sample(stats) : undefined;

			stats = [];
			let statMinus: BoostID;
			for (statMinus in pokemon.boosts) {
				if (pokemon.boosts[statMinus] > -6 && statMinus !== randomStat) {
					stats.push(statMinus);
				}
			}
			randomStat = stats.length ? this.sample(stats) : undefined;
			if (randomStat) boost[randomStat] = -1;

			this.boost(boost, pokemon, pokemon);
			
			const chance = 4 - this.effectState.duration!;
			if (this.randomChance(chance, 5)) {
				pokemon.cureStatus();
			}
		},
	},
	ptr: {
		name: 'ptr',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'ptr', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'ptr');
			}
		},
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			return -0.1;
		},
	},
	rad: {
		name: 'rad',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'rad', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'rad');
			}
		},
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			if (source.hp >= source.maxhp / 5 * 4) return false;
			if (source.hp + damage > source.maxhp / 5 * 4) return source.maxhp / 2 - source.hp;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (pokemon.hp > pokemon.maxhp * 0.8) {
				const damageNeeded = pokemon.hp - (pokemon.maxhp * 0.8);
				this.damage(damageNeeded);
			}
		},
	},
	plx: {
		name: 'plx',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'plx', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'plx');
			}
		},
		onBeforeMovePriority: 3,
		onBeforeMove(pokemon) {
			this.add('-activate', pokemon, 'plx');
			this.activeTarget = pokemon;
			const damage = this.actions.getConfusionDamage(pokemon, 40);
			if (typeof damage !== 'number') throw new Error("Confusion damage not dealt");
			const activeMove = { id: this.toID('plx'), effectType: 'Move', type: '???' };
			this.damage(damage, pokemon, pokemon, activeMove as ActiveMove);
		},
	},
};
