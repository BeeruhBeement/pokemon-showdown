import { ModdedSpeciesData } from "../../../sim/dex-species";

export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	sudowoodo: {
		inherit: true,
		gen: 1,
		baseStats: {hp: 70, atk: 100, def: 115, spa: 65, spd: 65, spe: 30},
	},
	shelmet: {
		inherit: true,
		gen: 1,
		baseStats: {hp: 50, atk: 40, def: 85, spa: 40, spd: 40, spe: 25},
	},
	accelgor: {
		inherit: true,
		gen: 1,
		baseStats: {hp: 80, atk: 70, def: 40, spa: 60, spd: 60, spe: 145},
	},
	morelull: {
		inherit: true,
		gen: 1,
		types: ['Grass'],
		baseStats: {hp: 40, atk: 35, def: 55, spa: 75, spd: 75, spe: 15},
	},
	shiinotic: {
		inherit: true,
		gen: 1,
		types: ['Grass'],
		baseStats: {hp: 60, atk: 45, def: 80, spa: 100, spd: 100, spe: 30},
	},
	nymble: {
		inherit: true,
		gen: 1,
		baseStats: {hp: 33, atk: 46, def: 40, spa: 21, spd: 21, spe: 45},
	},
	lokix: {
		inherit: true,
		gen: 1,
		types: ['Bug', 'Fighting'],
		baseStats: {hp: 71, atk: 102, def: 78, spa: 52, spd: 52, spe: 92},
	}
};
