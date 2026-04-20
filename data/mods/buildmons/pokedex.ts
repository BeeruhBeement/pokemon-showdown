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
		color: "Yellow",
		eggGroups: ["Bug", "Dragon"],
	},
	bandit: {
		num: 2,
		name: "Bandit",
		types: ["Ground", "Dark"],
		baseStats: { hp: 55, atk: 115, def: 75, spa: 60, spd: 80, spe: 115 },
		abilities: { 0: "Desperado" },
		heightm: 1.5,
		weightkg: 55,
		color: "Brown",
		eggGroups: ["Human-Like"],
	},
	tesla: {
		num: 3,
		name: "Tesla",
		types: ["Electric"],
		baseStats: { hp: 70, atk: 70, def: 70, spa: 115, spd: 80, spe: 95 },
		abilities: { 0: "Tesla Coils" },
		heightm: 1.5,
		weightkg: 55,
		color: "White",
		eggGroups: ["Field"],
	},
};
