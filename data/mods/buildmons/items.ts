export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	bottledlightning: {
		name: "Bottled Lightning",
		shortDesc: "Adds Thunder to the user's moveset.",
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
		isNonstandard: "Custom",
	},
	ukulele: {
		name: "Ukulele",
		shortDesc: "This Pokemon's sound-based moves become Electric type.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound'] && !pokemon.volatiles['dynamax']) { // hardcode
				move.type = 'Electric';
			}
		},
		isNonstandard: "Custom",
	},
};