export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	frz: {
		inherit: true,
		onStart(target, source, sourceEffect) {
			if (sourceEffect?.id === 'frostorb') {
				this.add('-status', target, 'frz', '[from] item: Frost Orb');
			} else if (sourceEffect?.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else {
				this.add('-status', target, 'frz');
			}
		},
		// Damage reduction is handled directly in the sim/battle.js damage function
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
		onBeforeMove(pokemon, target, move) { },
		onModifyMove(move, pokemon) { },
		onAfterMoveSecondary(target, source, move) { },
		onDamagingHit(damage, target, source, move) { },
	},
	sunnyday: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if ((move.id === 'hydrosteam' || move.id === 'steamclaws') && attacker.effectiveWeather() === 'sunnyday') {
				this.debug('Sunny Day Hydro Steam boost');
				return this.chainModify(1.5);
			}
			if (defender.effectiveWeather() !== 'sunnyday') return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Water') {
				this.debug('Sunny Day water suppress');
				return this.chainModify(0.5);
			}
		},
	},
};
