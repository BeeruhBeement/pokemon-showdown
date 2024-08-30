import { ModdedItemData } from "../../../sim/dex-items";

export const Items: {[k: string]: ModdedItemData} = {
	caterpieite: {
		name: "Caterpieite",
		spritenum: 628,
		megaStone: "Caterpie-Mega",
		megaEvolves: "Caterpie",
		itemUser: ["Caterpie"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	weedleite: {
		name: "Weedleite",
		spritenum: 628,
		megaStone: "Weedle-Mega",
		megaEvolves: "Weedle",
		itemUser: ["Weedle"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2,
		gen: 9,
	},
	wurmpleite: {
		name: "Wurmpleite",
		spritenum: 628,
		megaStone: "Wurmple-Mega",
		megaEvolves: "Wurmple",
		itemUser: ["Wurmple"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -3,
		gen: 9,
	},
};
