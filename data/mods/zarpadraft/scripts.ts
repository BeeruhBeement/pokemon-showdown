import { learnsetUpdate } from "./learnsetupdate";

export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	init() {
		learnsetUpdate(this);
	},
};
