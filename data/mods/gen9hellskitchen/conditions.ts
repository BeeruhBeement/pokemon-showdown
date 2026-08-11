export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	par: {
		inherit: true,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 8)) {
				this.add('cant', pokemon, 'par');
				return false;
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

			// 1/3 chance for a Pokemon to wake up on turn 2
			this.effectState.startTime = this.sample([2, 3, 3]);
			this.effectState.time = this.effectState.startTime;

			if (target.removeVolatile('nightmare')) {
				this.add('-end', target, 'Nightmare', '[silent]');
			}
		},
	},
	frz: {
		inherit: true,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else {
				this.add('-status', target, 'frz');
			}
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}

			this.effectState.startTime = 3;
			this.effectState.time = this.effectState.startTime;
		},
		onBeforeMove(pokemon, target, move) {
			if (move.flags['defrost'] && !(move.id === 'burnup' && !pokemon.hasType('Fire'))) return;
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0 || this.randomChance(1, 4)) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'frz');
			return false;
		},
	},

	aridwasteland: {
		name: 'AridWasteland',
		effectType: 'Weather',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Ice' && move.category !== 'Status') {
				this.debug('Arid Wasteland ice suppress');
				this.add('-fail', attacker, move, '[from] Arid Wasteland');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'AridWasteland', '[from] ability: ' + effect.name, `[of] ${source}`);
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'AridWasteland', '[upkeep]');
			this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	hyperboreanstorm: {
		name: 'HyperboreanStorm',
		effectType: 'Weather',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Rock' && move.category !== 'Status') {
				this.debug('Hyperborean Storm rock suppress');
				this.add('-fail', attacker, move, '[from] Hyperborean Storm');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'HyperboreanStorm', '[from] ability: ' + effect.name, `[of] ${source}`);
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'HyperboreanStorm', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
};
