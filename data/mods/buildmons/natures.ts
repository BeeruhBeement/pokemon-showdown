import { ModdedNatureData } from '../../../sim/dex-data';

export const Natures: {[k: string]: ModdedNatureData} = {
	// implement hp natures
	fighter: {
		name: "Fighter",
		plus: "atk",
		minus: "spa",
	},
	generalist: {
		name: "Generalist",
	},
	healer: {
		name: "Healer",
		minus: "atk",
	},
	hexer: {
		name: "Hexer",
		plus: "spa",
		minus: "def",
	},
	hunter: {
		name: "Hunter",
		plus: "atk",
	},
	invoker: {
		name: "Invoker",
		plus: "spa",
		minus: "def",
	},
	ranger: {
		name: "Ranger",
		plus: "spe",
		minus: "spa",
	},
	sorcerer: {
		name: "Sorcerer",
		plus: "spa",
		minus: "atk",
	},
	supporter: {
		name: "Supporter",
		plus: "spd",
		minus: "atk",
	},
	survivalist: {
		name: "Survivalist",
		minus: "spd",
	},
	tank: {
		name: "Tank",
		minus: "spe",
	},
	warlock: {
		name: "Warlock",
		plus: "atk",
		minus: "spd",
	},
};
