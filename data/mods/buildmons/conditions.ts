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
	slp: {
		inherit: true,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'slp', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'slp', `[from] move: ${sourceEffect.name}`);
			} else {
				this.add('-status', target, 'slp');
			}
			// 1-3 turns
			this.effectState.startTime = this.random(2, 5);
			if (target.hasItem('comfypillow')) {
				this.effectState.startTime += 2;
			}
			this.effectState.time = this.effectState.startTime;

			if (target.removeVolatile('nightmare')) {
				this.add('-end', target, 'Nightmare', '[silent]');
			}
		},
		onBeforeMove(pokemon, target, move) {
			if (pokemon.hasAbility('earlybird')) {
				pokemon.statusState.time--;
			}
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0) {
				pokemon.cureStatus();
				return;
			}
			if (this.randomChance(1, 2)) {
				this.add('cant', pokemon, 'slp');
				return false;
			}
			if (move.sleepUsable) {
				return;
			}
			return false;
		},
	},
	rad: {
		name: 'rad',
		effectType: 'Status',
		duration: 5,
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
			if (move.type === 'Dark' || move.id === 'moonblast') {
				this.debug('night dark boost');
				return this.chainModify(1.1);
			}
			if (move.type === 'Fairy' && move.id !== 'moonblast') {
				this.debug('night fairy suppress');
				return this.chainModify(0.75);
			}
		},
	},

	mustrecharge: {
		inherit: true,
		onStart(target) {
			this.add('-start', target, 'move: Recharge');
		},
		onResidualOrder: 15,
		onEnd(target) {
			this.add('-end', target, 'move: Recharge');
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.dex.moves.get(moveSlot.id);
				if (move.category !== 'Status' || move.id === 'mefirst') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onBeforeMovePriority: 5,
		onBeforeMove(attacker, defender, move) {
			if (!(move.isZ && move.isZOrMaxPowered) && move.category === 'Status' && move.id !== 'mefirst') {
				this.add('cant', attacker, 'Recharge', move);
				return false;
			}
		},
	},
	futuremove: {
		inherit: true,
		onStart(target) {
			this.effectState.targetSlot = target.getSlot();
			const oneturn = ['electroball'];
			this.effectState.endingTurn = (this.turn - 1) + (oneturn.includes(this.effectState.move) ? 2 : 1);
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

	//general

	// stat down
	atkdown: {
		name: 'atkdown',
		duration: 3,
		onStart(target, source, sourceEffect) {
			if (target.boosts.atk > 0) {
				this.boost({ atk: -target.boosts.atk }, target, target, this.effectState.sourceEffect);
			}
			this.add('-start', target, 'Atk Down');
		},
		onEnd(target) {
			this.add('-end', target, 'Atk Down');
		},
		onTryBoost(boost, target, source, effect) {
			if (boost.atk && boost.atk > 0) {
				delete boost.atk;
			}
		},
		onModifyAtk(atk, pokemon) {
			this.debug('Atk Down debuff');
			return this.chainModify(0.75);
		},
	},
	defdown: {
		name: 'defdown',
		duration: 3,
		onStart(target, source, sourceEffect) {
			if (target.boosts.def > 0) {
				this.boost({ def: -target.boosts.def }, target, target, this.effectState.sourceEffect);
			}
			this.add('-start', target, 'Def Down');
		},
		onEnd(target) {
			this.add('-end', target, 'Def Down');
		},
		onTryBoost(boost, target, source, effect) {
			if (boost.def && boost.def > 0) {
				delete boost.def;
			}
		},
		onModifyDef(def, pokemon) {
			this.debug('Def Down debuff');
			return this.chainModify(0.75);
		},
	},
	spadown: {
		name: 'spadown',
		duration: 3,
		onStart(target, source, sourceEffect) {
			if (target.boosts.spa > 0) {
				this.boost({ spa: -target.boosts.spa }, target, target, this.effectState.sourceEffect);
			}
			this.add('-start', target, 'SpA Down');
		},
		onEnd(target) {
			this.add('-end', target, 'SpA Down');
		},
		onTryBoost(boost, target, source, effect) {
			if (boost.spa && boost.spa > 0) {
				delete boost.spa;
			}
		},
		onModifySpA(spa, pokemon) {
			this.debug('SpA Down debuff');
			return this.chainModify(0.75);
		},
	},
	spddown: {
		name: 'spddown',
		duration: 3,
		onStart(target, source, sourceEffect) {
			if (target.boosts.spd > 0) {
				this.boost({ spd: -target.boosts.spd }, target, target, this.effectState.sourceEffect);
			}
			this.add('-start', target, 'SpD Down');
		},
		onEnd(target) {
			this.add('-end', target, 'SpD Down');
		},
		onTryBoost(boost, target, source, effect) {
			if (boost.spd && boost.spd > 0) {
				delete boost.spd;
			}
		},
		onModifySpD(spd, pokemon) {
			this.debug('SpD Down debuff');
			return this.chainModify(0.75);
		},
	},
	spedown: {
		name: 'spedown',
		duration: 3,
		onStart(target, source, sourceEffect) {
			if (target.boosts.spe > 0) {
				this.boost({ spe: -target.boosts.spe }, target, target, this.effectState.sourceEffect);
			}
			this.add('-start', target, 'Spe Down');
		},
		onEnd(target) {
			this.add('-end', target, 'Spe Down');
		},
		onTryBoost(boost, target, source, effect) {
			if (boost.spe && boost.spe > 0) {
				delete boost.spe;
			}
		},
		onModifySpe(spe, pokemon) {
			this.debug('Spe Down debuff');
			return this.chainModify(0.75);
		},
	},

	supression: {
		name: 'suppression',
		duration: 3,
		onStart(target, source, sourceEffect) {
			if (target.getAbility().flags['cantsuppress'] || target.hasItem('abilityshield')) {
				this.add('-immune', target);
				target.removeVolatile('suppression');
			}
			this.add('-start', target, 'Suppression');
			if (target.canTerastallize !== null && target.canTerastallize) {
				this.effectState.abilitywasusable = true;
				target.canTerastallize = null;
			}
		},
		onUpdate(pokemon) {
			if (pokemon.canTerastallize !== null && pokemon.canTerastallize) pokemon.removeVolatile('suppression');
		},
		onEnd(target) {
			if (this.effectState.abilitywasusable) target.canTerastallize = target.teraType;
			this.add('-end', target, 'Suppression');
		},
	},
	haste: {
		name: 'haste',
		duration: 2,
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'Haste');
		},
		onEnd(target) {
			this.add('-end', target, 'Haste');
		},
		onModifySpe(spe, pokemon) {
			this.debug('Haste boost');
			return this.chainModify(1.35);
		},
	},
	regen: {
		name: 'regen',
		duration: 3,
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'Regen');
		},
		onEnd(target) {
			this.add('-end', target, 'Regen');
		},
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 10);
		},
	},

	// for moves and abilities and items etc
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
	shield: {
		name: 'shield',
		onStart(target, source, sourceEffect) {
			if (this.effectState.shield === undefined) {
				this.effectState.shield = 0;
			}
		},
		onUpdate(target) {
			if (this.effectState.shield > target.maxhp) {
				this.effectState.shield = target.maxhp;
			}
		},
		onDamage(damage, target, source, effect) {
			const shield = this.effectState.shield || 0;
			if (shield <= 0) {
				return damage;
			}
			
			const shieldAbsorbed = Math.min(damage, shield);
			this.effectState.shield -= shieldAbsorbed;
			const remainingDamage = damage - shieldAbsorbed;
			
			// Update shield display
			if (this.effectState.shield > 0) {
				this.add('-end', target, 'Shield', '[silent]');
				this.add('-start', target, `Shield: ${Math.floor(this.effectState.shield)}`, '[silent]');
			} else {
				this.add('-end', target, 'Shield', '[silent]');
				target.removeVolatile('shield');
			}
			
			return remainingDamage;
		},
		onEnd(target) {
			this.add('-end', target, 'Shield');
		},
	},
};
