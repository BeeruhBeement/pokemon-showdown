import { ModdedMoveData } from "../../../sim/dex-moves";

export const Moves: {[k: string]: ModdedMoveData} = {
	knockoff: {
		inherit: true,
		desc: "If the target is holding an item, this move's power is multiplied by 1.5.",
		shortDesc: "1.5x damage if foe holds an item.",
		basePower: 60,
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) { return },
	},
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
	spikes: {
		inherit: true,
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Can be used up to three times before failing. Opponents lose 5% of their maximum HP with one layer, 10% of their maximum HP with two layers, and 15% of their maximum HP with three layers, all rounded down. Can be removed from the opposing side if any Pokemon uses Tidy Up, or if any opposing Pokemon uses Mortal Spin, Rapid Spin, or Defog successfully, or is hit by Defog.",
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots')) return;
				const damageAmounts = [0, 1, 2, 3]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 20);
			},
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