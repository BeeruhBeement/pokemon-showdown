import { learnsetUpdate } from "./learnsetupdate";

export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	init() {
		for (const i in this.data.Pokedex) {
			this.modData('Pokedex', i).isNonstandard = null;
		}
		for (const i in this.data.FormatsData) {
			if (this.data.Pokedex[i].num <= -15000) {
				this.modData('FormatsData', i).tier = 'Illegal';
			} else {
				this.modData('FormatsData', i).tier = 'OU';
			}
		}
		for (const i in this.data.Abilities) {
			this.modData('Abilities', i).isNonstandard = null;
		}
		for (const i in this.data.Moves) {
			this.modData('Moves', i).isNonstandard = null;
		}

		learnsetUpdate(this);
	},
};
