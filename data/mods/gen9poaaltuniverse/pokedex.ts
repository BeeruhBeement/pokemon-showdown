import { Pokedex as Base } from '../../pokedex';

export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = {
	spotalat: {
		num: -60000,
		name: "Spotalat",
		types: ["Electric", "Psychic"],
		baseStats: { hp: 110, atk: 90, def: 75, spa: 125, spd: 90, spe: 80 },
		abilities: { 0: "Cryptic Luminance" },
		heightm: 1.5,
		weightkg: 50,
		eggGroups: ["Undiscovered"],
	},
};

const customDex = new Set(["spotalat"]);

for (const key in {...Base, ...Pokedex}) {
	const id = key as keyof typeof Base;
	if (!Pokedex[id]) Pokedex[id] = {inherit: true};

	if (customDex.has(id)) Pokedex[id] = {...Pokedex[id], isNonstandard: null, gen: 9};
	else Pokedex[id] = {...Pokedex[id], isNonstandard: "Custom", tier: "Illegal"};
}

