export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	init() {
		for (const i in this.data.Moves) {
			this.modData('Moves', i).isNonstandard = null;
		}
	},	
};
