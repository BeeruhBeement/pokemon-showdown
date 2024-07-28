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
};
