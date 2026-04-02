export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	brn: {
		inherit: true,
		duration: 5,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 20);
			const chance = 4 - this.effectState.duration!;
			if (this.randomChance(chance, 5)) {
				pokemon.cureStatus();
			}
		},
	},
	par: {
		inherit: true,
		duration: 5,
		onResidual(pokemon) {
			if (this.effectState.duration && this.effectState.duration % 2 === 1) {
				this.damage(pokemon.baseMaxhp / 10);
			}
			const chance = 4 - this.effectState.duration!;
			if (this.randomChance(chance, 5)) {
				pokemon.cureStatus();
			}
		},
		onBeforeMove() { return },
	},
	frz: {
		inherit: true,
		duration: 5,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 20);
			const chance = 4 - this.effectState.duration!;
			if (this.randomChance(chance, 5)) {
				pokemon.cureStatus();
			}
		},
		onBeforeMove(pokemon, target, move) { },
		onModifyMove(move, pokemon) { },
		onAfterMoveSecondary(target, source, move) { },
		onDamagingHit(damage, target, source, move) { },
	},
	psn: {
		inherit: true,
		duration: 5,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 10);
			const chance = 4 - this.effectState.duration!;
			if (this.randomChance(chance, 5)) {
				pokemon.cureStatus();
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
			if (this.effectState.stage && this.effectState.stage > 0) {
				const chance = 4 - this.effectState.stage;
				if (this.randomChance(chance, 5)) {
					pokemon.cureStatus();
				}
			}
		},
	},
	bld: {
		name: 'bld',
		effectType: 'Status',
		duration: 5,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'bld', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else {
				this.add('-status', target, 'bld');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 20);
			const chance = 4 - this.effectState.duration!;
			if (this.randomChance(chance, 5)) {
				pokemon.cureStatus();
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
		duration: 5,
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
				if (statMinus === 'accuracy' || statMinus === 'evasion') continue;
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
		duration: 5,
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
		onResidualOrder: 9,
		onResidual(pokemon) {
			const chance = 4 - this.effectState.duration!;
			if (this.randomChance(chance, 5)) {
				pokemon.cureStatus();
			}
		},
	},
	partiallytrapped: {
		inherit: true,
		onStart(pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectState.sourceEffect, `[of] ${source}`);
			this.effectState.boundDivisor = source.hasItem('bindingband') ? 20 : 10;
		},
		onTrapPokemon(pokemon) {},
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
	sandstorm: {
		inherit: true,
		// This should be applied directly to the stat before any of the other modifiers are chained
		// So we give it increased priority.
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType('Rock') && this.field.isWeather('sandstorm')) {
				return this.modify(spd, 1.2);
			}
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 20);
		},
	},
	hail: {
		inherit: true,
		onWeather(target) {
			this.damage(target.baseMaxhp / 20);
		},
	},
	snowscape: {
		inherit: true,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Ice') && this.field.isWeather('snowscape')) {
				return this.modify(def, 1.2);
			}
		},
	},
	night: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Dark') {
				this.debug('night dark boost');
				return this.chainModify(1.1);
			}
			if (move.type === 'Fairy') {
				this.debug('night fairy suppress');
				return this.chainModify(0.75);
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

	// for moves and abilities and items etc
	soulbrand: {
		name: 'soulbrand',
		effectType: 'Status', // a volatile status
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'Soul Brand', '[from] ability: ' + sourceEffect?.name);
		},
		onEnd(target) {
			this.add('-end', target, 'Soul Brand');
		},
		onSourceModifyDamage(damage, source, target, move) {
			return this.chainModify(1.1);
		},
	},
	brittle: {
		// 15% more damage from physical moves
		onDamage(damage, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				let move = effect as Move;
				if (move.category === 'Physical') {
					this.debug('Brittle increase');
					return this.chainModify(1.15);
				}
			}
		},
		duration: 3,
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'brittle');
		},
	},
};
