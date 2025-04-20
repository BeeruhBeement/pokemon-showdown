import { ModdedItemData } from "../../../sim/dex-items";

export const Items: {[k: string]: ModdedItemData} = {
	electrodite: {
		name: "Electrodite",
		spritenum: 596,
		megaStone: "Electrode-Mega",
		megaEvolves: "Electrode",
		itemUser: ["Electrode"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		gen: 0,
		shortDesc: "If held by an Electrode, this item allows it to Mega Evolve in battle.",
	},
};
