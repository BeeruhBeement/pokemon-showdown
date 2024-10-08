import { ModdedSpeciesData } from "../../../sim/dex-species";

export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	caterpiemega: {
		num: 10,
		name: "Caterpie-Mega",
		baseSpecies: "Caterpie",
		forme: "Mega",
		types: ["Bug", "Dragon"],
		baseStats: {hp: 45, atk: 50, def: 55, spa: 30, spd: 60, spe: 55},
		abilities: {0: "Sheer Force"},
		heightm: 0.4,
		weightkg: 12.9,
		color: "Green",
		evos: ["Metapod"],
		eggGroups: ["Bug"],
		requiredItem: "Caterpieite",
	},
	weedlemega: {
		num: 13,
		name: "Weedle-Mega",
		baseSpecies: "Weedle",
		forme: "Mega",
		types: ["Bug", "Poison"],
		baseStats: {hp: 40, atk: 45, def: 40, spa: 30, spd: 40, spe: 100},
		abilities: {0: "Merciless"},
		heightm: 0.4,
		weightkg: 3.5,
		color: "Brown",
		evos: ["Kakuna"],
		eggGroups: ["Bug"],
		requiredItem: "Weedleite",
	},
	wurmplemega: {
		num: 265,
		name: "Wurmple-Mega",
		baseSpecies: "Wurmple",
		forme: "Mega",
		types: ["Bug"],
		baseStats: {hp: 45, atk: 65, def: 55, spa: 40, spd: 50, spe: 40},
		abilities: {0: "Unaware"},
		heightm: 0.6,
		weightkg: 3.6,
		color: "Red",
		evos: ["Silcoon", "Cascoon"],
		eggGroups: ["Bug"],
		requiredItem: "Wurmpleite",
	},
};
