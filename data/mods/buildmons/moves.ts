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
	rockcrunch: {
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
	drillpeck: {
		inherit: true,
		desc: "Has a 30% chance to bleed the target and a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio. 30% chance to bleed.",
		secondary: {
			chance: 30,
			status: 'bld',
		},
		critRatio: 2,
	},
	octazooka: {
		inherit: true,
		desc: "Has a 30% chance to wet the target.",
		shortDesc: "30% chance to wet.",
		basePower: 90,
		accuracy: 95,
		secondary: {
			chance: 30,
			status: 'wet',
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
	stealthrock: {
		inherit: true,
		isNonstandard: "Future",
	},
	return: {
		inherit: true,
		isNonstandard: "Future",
	},
	frustration: {
		inherit: true,
		isNonstandard: "Future",
	},
	bestow: {
		inherit: true,
		isNonstandard: "Future",
	},
	corrosivegas: {
		inherit: true,
		isNonstandard: "Future",
	},
	covet: {
		inherit: true,
		isNonstandard: "Future",
	},
	fling: {
		inherit: true,
		isNonstandard: "Future",
	},
	switcheroo: {
		inherit: true,
		isNonstandard: "Future",
	},
	thief: {
		inherit: true,
		isNonstandard: "Future",
	},
	trick: {
		inherit: true,
		isNonstandard: "Future",
	},
	
	chistrike: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Chi Strike",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "allAdjacent",
		type: "Fighting",
		desc: "Has a 30% chance to paralyze the target.",
		shortDesc: "30% chance to paralyze adjacent Pokemon.",
	},
	soulchomp: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		overrideDefensiveStat: 'spd',
		name: "Soul Chomp",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, contact: 1, bite: 1 },
		secondary: null,
		target: "normal",
		type: "Ghost",
		desc: "Deals damage to the target based on its Special Defense instead of Defense.",
		shortDesc: "Damages target based on Sp. Def, not Defense.",
	},
	wetslap: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Wet Slap",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 30,
			status: 'wet',
		},
		target: "normal",
		type: "Water",
		desc: "Has a 30% chance to wet the target.",
		shortDesc: "30% chance to wet the target.",
	},
};