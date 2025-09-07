export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	actions: {
		inherit: true,
		hitStepAccuracy(targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) {
			const hitResults = [];
			for (const [i, target] of targets.entries()) {
				this.battle.activeTarget = target;
				// calculate true accuracy
				let accuracy = move.accuracy;
				if (move.ohko) { // bypasses accuracy modifiers
					if (!target.isSemiInvulnerable()) {
						accuracy = 30;
						if (move.ohko === 'Ice' && this.battle.gen >= 7 && !pokemon.hasType('Ice')) {
							accuracy = 20;
						}
						if (!target.volatiles['dynamax'] && pokemon.level >= target.level &&
							(move.ohko === true || !target.hasType(move.ohko))) {
							accuracy += (pokemon.level - target.level);
						} else {
							this.battle.add('-immune', target, '[ohko]');
							hitResults[i] = false;
							continue;
						}
					}
				} else {
					accuracy = this.battle.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
					if (accuracy !== true) {
						let boost = 0;
						if (!move.ignoreAccuracy) {
							const boosts = this.battle.runEvent('ModifyBoost', pokemon, null, null, { ...pokemon.boosts });
							boost = this.battle.clampIntRange(boosts['accuracy'], -6, 6);
						}
						if (!move.ignoreEvasion) {
							const boosts = this.battle.runEvent('ModifyBoost', target, null, null, { ...target.boosts });
							boost = this.battle.clampIntRange(boost - boosts['evasion'], -6, 6);
						}
						if (boost > 0) {
							accuracy = this.battle.trunc(accuracy * (3 + boost) / 3);
						} else if (boost < 0) {
							accuracy = this.battle.trunc(accuracy * 3 / (3 - boost));
						}
					}
				}
				if (
					move.alwaysHit || (move.id === 'toxic' && this.battle.gen >= 8 && pokemon.hasType('Poison')) ||
					(move.target === 'self' && move.category === 'Status' && !target.isSemiInvulnerable())
				) {
					accuracy = true; // bypasses ohko accuracy modifiers
				} else {
					accuracy = this.battle.runEvent('Accuracy', target, pokemon, move, accuracy);
				}
				if (accuracy !== true && !this.battle.randomChance(accuracy, 100)) {
					if (move.smartTarget) {
						move.smartTarget = false;
					} else {
						if (!move.spreadHit) this.battle.attrLastMove('[miss]');
						this.battle.add('-miss', pokemon, target);
					}
					if (!move.ohko && pokemon.hasItem('blunderpolicy') && pokemon.useItem()) {
						this.battle.boost({ spe: 2 }, pokemon);
					}
					if (!move.ohko && pokemon.hasItem('doubledip') && pokemon.useItem()) {
						this.battle.actions.useMove(move, pokemon);
					}
					hitResults[i] = false;
					continue;
				}
				hitResults[i] = true;
			}
			return hitResults;
		},
	},
	pokemon: {
		inherit: true,
		runEffectiveness(move: ActiveMove) {
			let totalTypeMod = 0;
			if (this.terastallized && move.type === 'Stellar') {
				totalTypeMod = 1;
			} else {
				for (const type of this.getTypes()) {
					let typeMod = this.battle.dex.getEffectiveness(move, type);
					typeMod = this.battle.singleEvent('Effectiveness', move, null, this, type, move, typeMod);
					totalTypeMod += this.battle.runEvent('Effectiveness', this, type, move, typeMod);
				}
			}
			if (this.species.name === 'Terapagos-Terastal' && this.hasAbility('Tera Shell') &&
				!this.battle.suppressingAbility(this)) {
				if (this.abilityState.resisted) return -1; // all hits of multi-hit move should be not very effective
				if (move.category === 'Status' || move.id === 'struggle' || !this.runImmunity(move) ||
					totalTypeMod < 0 || this.hp < this.maxhp) {
					return totalTypeMod;
				}

				this.battle.add('-activate', this, 'ability: Tera Shell');
				this.abilityState.resisted = true;
				return -1;
			}
			if (move.type === "Dark" && this.hasAbility('Cryptic Luminance') &&
				!this.battle.suppressingAbility(this)) {
				return -1;
			}
			return totalTypeMod;
		}
	}
};
