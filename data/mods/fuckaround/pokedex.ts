import { ModdedSpeciesData } from "../../../sim/dex-species";

export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	tsareena: {
		inherit: true,
		types: ["Grass", "Steel"],
		abilities: { 0: "Rough Skin", 1: "Queenly Majesty", H: "Hubris" },
		num: -15000,
	},
	magearna: {
		inherit: true,
		num: -15000,
	},
	sawsbuck: {
		inherit: true,
		types: ["Dark", "Fairy"],
		abilities: { 0: "Sheer Force", 1: "Moxie", H: "Hubris" },
		num: -15000,
	},
	sneasel: {
		inherit: true,
		num: -15000,
	},
	sneaselhisui: {
		inherit: true,
		num: -15000,
	},
};
