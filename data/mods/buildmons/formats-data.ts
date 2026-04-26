import { Pokedex as Base } from '../../pokedex';

export const FormatsData: import('../../../sim/dex-species').ModdedSpeciesFormatsDataTable = {
	commando: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	bandit: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	paladin: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	arson: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	ghoul: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
};

for (const pokemon in Base) {
	const key = pokemon as keyof typeof FormatsData;
	if (!FormatsData[key]) FormatsData[key] = { inherit: true, isNonstandard: "Custom", tier: "Illegal", natDexTier: "Illegal", doublesTier: "Illegal" };
}
