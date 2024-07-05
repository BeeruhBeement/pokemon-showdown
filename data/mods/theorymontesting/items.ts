export const Items: {[k: string]: ModdedItemData} = {
	bastiodonite: {
		inherit: true,
		megaStone: "Bastiodon-Mega",
		megaEvolves: "Bastiodon",
		itemUser: ["Bastiodon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		isNonstandard: null,
	},
};
