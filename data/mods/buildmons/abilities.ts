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
			const stealthRock = this.dex.getActiveMove('stealthrock');
			for (const target of pokemon.adjacentFoes()) {
				if (!target || target.fainted || target.status !== 'ptr') continue;
				const typeMod = this.clampIntRange(target.runEffectiveness(stealthRock), -6, 6);
				this.damage(target.maxhp * (2 ** typeMod) / 20, target, pokemon, stealthRock);
				target.cureStatus();
			}
			if (!pokemon.canTerastallize) pokemon.canTerastallize = pokemon.teraType;
		},
		flags: {},
		name: "Entombing Jaws",
		shortDesc: "Biting moves petrify targets. On activation petrified Pokemon take 1/20th Rock damage.",
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
};
