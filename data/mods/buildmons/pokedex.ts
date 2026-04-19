import { ModdedSpeciesData } from "../../../sim/dex-species";

export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	commando: {
		num: 1,
		name: "Commando",
		types: ["Bug", "Dragon"],
		baseStats: { hp: 70, atk: 95, def: 102, spa: 90, spd: 70, spe: 91 },
		abilities: { 0: "Double Down" },
		heightm: 1.5,
		weightkg: 55,
		color: "Brown",
		eggGroups: ["Bug", "Dragon"],
	},
};
