import { ModdedMoveData } from "../../../sim/dex-moves";

export const Moves: {[k: string]: ModdedMoveData} = {
	dazzlinggleam: {
		inherit: true,
		gen: 1,
		desc: "Has a 10% chance to poison the target.",
		shortDesc: "10% chance to poison the target.",
		secondary: {
			chance: 10,
			status: 'psn',
		},
	},
	lick: {
		inherit: true,
		basePower: 60,
		desc: "Has a 30% chance to confuse the target.",
		shortDesc: "30% chance to confuse the target.",
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
	},
	megadrain: {
		inherit: true,
		basePower: 60,
		desc: "Has a 10% chance to lower the target's Attack by 1.",
		shortDesc: "10% chance to lower the target's Attack by 1.",
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
			},
		},
	},
	mirrorshot: {
		inherit: true,
		gen: 1,
		basePower: 60,
		desc: "Has a 20% chance to lower the target's Special by 1.",
		shortDesc: "20% chance to lower the target's Special by 1.",
		secondary: {
			chance: 20,
			boosts: {
				spa: -1,
				spd: -1,
			},
		},
	},
	eggbomb: {
		inherit: true,
		type: "Grass",
		desc: "Has a 10% chance to lower the target's Speed by 1.",
		shortDesc: "10% chance to lower the target's Speed by 1.",
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
	},
	bite: {
		inherit: true,
		type: "Dark",
		basePower: 60,
		desc: "Has a 10% chance to lower the target's Defense by 1.",
		shortDesc: "10% chance to lower the target's Defense by 1.",
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
	},
};
