export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
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
			const damageRatio = 0.1 * heat;
			pokemon.adjacentFoes().forEach(foe => {
				if (!foe || foe.fainted) return;
				this.damage(Math.floor(foe.maxhp * damageRatio), foe, pokemon);
			});
      		this.add('-end', pokemon, `Heat: ${this.effectState.heat}x`, '[silent]');
			this.effectState.heat = 0;
			pokemon.canTerastallize = pokemon.teraType;
		},
		flags: {},
		name: "Heat Engine",
		shortDesc: "Each attack adds 5% power (max 25%). Activation deals 10% per stack to foes and reset.",
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
				this.heal(foe.maxhp / 4, pokemon, foe);
				foe.cureStatus();
			});
		},
		flags: {},
		name: "Vampiric",
		shortDesc: "Biting, Slicing, Draining bleed. Activation drains 1/4th of bleeding foes HP and heal bleed.",
	},
};
