import { ModdedMoveData } from "../../../sim/dex-moves";

export const Moves: {[k: string]: ModdedMoveData} = {
	deepfreeze: {
		inherit: true,
		isNonstandard: null,
	},
	slash: {
		inherit: true,
		desc: "Has a 30% chance to bleed the target and a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio. 30% chance to bleed.",
		secondary: {
			chance: 30,
			status: 'bld',
		},
	},
	watergun: {
		inherit: true,
		shortDesc: "30% chance to wet.",
		secondary: {
			chance: 30,
			status: 'wet',
		},
	},
	
	familiar: {
		inherit: true,
		condition: {
			duration: 4,
			onStart(target) {
				this.add('-start', target, 'move: Familiar');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles['familiar'].sourceSlot);
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to attack');
					return;
				}
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('familiar')), -6, 6);
				this.damage(pokemon.baseMaxhp * (2 ** typeMod) / 10, pokemon, target);
			},
			onEnd(target) {
				this.add('-end', target, 'move: Familiar');
			},
		},
		isNonstandard: null,
	},
};