export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	init() {
		for (const i in this.data.Pokedex) {
			this.modData('Pokedex', i).isNonstandard = null;
		}
		for (const i in this.data.Abilities) {
			this.modData('Abilities', i).isNonstandard = null;
		}
		for (const i in this.data.Moves) {
			this.modData('Moves', i).isNonstandard = null;
		}
		for (const i in this.data.FormatsData) {
			if (this.modData('Pokedex', i).gen != -12 && this.modData('Pokedex', i).name != "Electrode") 
			{
				this.modData('FormatsData', i).tier = "Illegal";
				this.modData('FormatsData', i).isNonstandard = "Custom";
			}
		}
	},
};
