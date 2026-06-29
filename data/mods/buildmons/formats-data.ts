import { Pokedex as Base } from '../../pokedex';

export const FormatsData: import('../../../sim/dex-species').ModdedSpeciesFormatsDataTable = {
	lapras: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	escavalier: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	coalossal: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	grimmsnarl: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
};

for (const pokemon in Base) {
	const key = pokemon as keyof typeof FormatsData;
	if (!FormatsData[key]) FormatsData[key] = { inherit: true, isNonstandard: "Custom", tier: "Illegal", natDexTier: "Illegal", doublesTier: "Illegal" };
}
