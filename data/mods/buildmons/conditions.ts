export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	brn: {
		inherit: true,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 20);
			const turns = pokemon.activeTurns;
			const chance = Math.min(turns, 5);
			if (this.randomChance(chance, 5)) {
				pokemon.cureStatus();
			}
		},
	},
	par: {
		inherit: true,
		onResidual(pokemon) {
			if (this.effectState.duration) {
				if (this.effectState.duration % 2 === 0) this.damage(pokemon.baseMaxhp / 10);
				const chance = Math.min(this.effectState.duration, 5);
				if (this.randomChance(chance, 5)) {
					pokemon.cureStatus();
				}
			}
		},
		onBeforeMove() { return },
	},
	frz: {
		inherit: true,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 20);
			if (this.effectState.duration) {
				const chance = Math.min(this.effectState.duration, 5);
				if (this.randomChance(chance, 5)) {
					pokemon.cureStatus();
				}
			}
		},
	},
	psn: {
		inherit: true,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 10);
			if (this.effectState.duration) {
				const chance = Math.min(this.effectState.duration, 5);
				if (this.randomChance(chance, 5)) {
					pokemon.cureStatus();
				}
			}
		},
	},
	tox: {
		inherit: true,
		onResidual(pokemon) {
			if (this.effectState.stage < 3) {
				this.effectState.stage++;
			}
			const inverseStage = 5 - this.effectState.stage; 
			this.damage(this.clampIntRange(pokemon.baseMaxhp / 20, 1) * inverseStage);
			if (this.effectState.duration) {
				const chance = Math.min(this.effectState.duration, 5);
				if (this.randomChance(chance, 5)) {
					pokemon.cureStatus();
				}
			}
		},
	},
	bld: {
		// still need to implement healing
		name: 'bld',
		effectType: 'Status',
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 20);
			if (this.effectState.duration) {
				const chance = Math.min(this.effectState.duration, 5);
				if (this.randomChance(chance, 5)) {
					pokemon.cureStatus();
				}
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
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			return -0.1;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.effectState.duration) {
				const chance = Math.min(this.effectState.duration, 5);
				if (this.randomChance(chance, 5)) {
					pokemon.cureStatus();
				}
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
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if (this.effectState.duration && this.effectState.duration >= 2) {
				pokemon.cureStatus();
			} else {
				this.add('cant', pokemon, 'ptr');
				return false;
			}
		},
	},

	// weather is implemented here since it's so important to the game

	raindance: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('rain water boost');
				return this.chainModify(1.1);
			}
			if (move.type === 'Fire') {
				this.debug('rain fire suppress');
				return this.chainModify(0.75);
			}
		},
	},
	primordialsea: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('Rain water boost');
				return this.chainModify(1.1);
			}
		},
	},
	sunnyday: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.id === 'hydrosteam' && !attacker.hasItem('utilityumbrella')) {
				this.debug('Sunny Day Hydro Steam boost');
				return this.chainModify(1.1);
			}
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.1);
			}
			if (move.type === 'Water') {
				this.debug('Sunny Day water suppress');
				return this.chainModify(0.75);
			}
		},
	},
	desolateland: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.1);
			}
		},
	},

	choicelock: {
		inherit: true,
		onBeforeMove(pokemon, target, move) {
			const choiceItem = pokemon.getItem().isChoice ||
				Object.keys(pokemon.volatiles).some(v => (
					v.startsWith('item:') && this.dex.items.get(v.split(':')[1]).isChoice
				));
			if (!choiceItem) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (
				!pokemon.ignoringItem() && !pokemon.volatiles['dynamax'] &&
				move.id !== this.effectState.move && move.id !== 'struggle'
			) {
				// Fails unless the Choice item is being ignored, and no PP is lost
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Choice item lock");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onDisableMove(pokemon) {
			const choiceItem = pokemon.getItem().isChoice ||
				Object.keys(pokemon.volatiles).some(v => (
					v.startsWith('item:') && this.dex.items.get(v.split(':')[1]).isChoice
				));
			if (!choiceItem || !pokemon.hasMove(this.effectState.move)) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (pokemon.ignoringItem() || pokemon.volatiles['dynamax']) {
				return;
			}
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== this.effectState.move) {
					pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
				}
			}
		},
	},
};
