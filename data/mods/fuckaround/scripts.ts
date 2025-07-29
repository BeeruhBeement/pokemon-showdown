import { learnsetUpdate } from "./learnsetupdate";

export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	init() {
		for (const i in this.data.Abilities) {
			this.modData('Abilities', i).isNonstandard = null;
		}
		for (const i in this.data.Moves) {
			this.modData('Moves', i).isNonstandard = null;
		}

		learnsetUpdate(this);
	},
};