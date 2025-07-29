import { Pokedex as Base } from '../../pokedex';
import { ModdedSpeciesData } from "../../../sim/dex-species";

export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	tsareena: {
		inherit: true,
		types: ["Grass", "Steel"],
		abilities: { 0: "Rough Skin", 1: "Queenly Majesty", H: "Hubris" },
	},
	magearna: {
		inherit: true,
	},
	sawsbuck: {
		inherit: true,
		types: ["Dark", "Fairy"],
		abilities: { 0: "Sheer Force", 1: "Moxie", H: "Hubris" },
	},
	sneasel: {
		inherit: true,
	},
	sneaselhisui: {
		inherit: true,
	},
	copperajah: {
		inherit: true,
		abilities: { 0: "Sheer Force", 1: "Refrigerate", H: "Heavy Metal" },
	},
};

const cutDex: {[k: string]: number} = {
	"tsareena": 1,
	"magearna": 2,
	"sawsbuck": 3,
	"sneasel": 4,
	"sneaselhisui": 5,
	"copperajah": 6,
};

for (const key in {...Base, ...Pokedex}) {
	const id = key as keyof typeof Base;
	if (!Pokedex[id]) Pokedex[id] = {inherit: true};

	if (cutDex[id]) Pokedex[id] = {...Pokedex[id], isNonstandard: null, gen: 9};
	else Pokedex[id] = {...Pokedex[id], isNonstandard: "Custom", tier: "Illegal"};
}

