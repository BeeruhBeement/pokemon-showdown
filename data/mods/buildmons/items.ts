import { ModdedItemData } from "../../../sim/dex-items";

export const Items: {[k: string]: ModdedItemData} = {
	bottledlightning: {
		name: "Bottled Lightning",
		shortDesc: "Adds Thunder to the user's moveset.",
		onTakeItem() {
			return false;
		},
		onStart(pokemon) {
			pokemon.moveSlots.push({
				move: 'thunder' as ID,
				pp: 5,
				maxpp: 5,
				id: 'thunder' as ID,
				disabled: false,
				used: false
			});
		},
	},
};
