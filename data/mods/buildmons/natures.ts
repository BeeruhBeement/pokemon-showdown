import { Natures as Base } from '../../natures';

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
		plus: "hp",
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
		minus: "hp",
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
		plus: "hp",
		minus: "spd",
	},
	tank: {
		name: "Tank",
		plus: "hp",
		minus: "spe",
	},
	warlock: {
		name: "Warlock",
		plus: "atk",
		minus: "spd",
	},
};

for (const nature in Base) {
	const key = nature as keyof typeof Natures;
	if (!Natures[key]) Natures[key] = {inherit: true, name: "Generalist", plus: undefined, minus: undefined};
}
