import { Pokedex as Base } from '../../pokedex';

export const FormatsData: import('../../../sim/dex-species').ModdedSpeciesFormatsDataTable = {
	furret: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	beheeyem: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	durant: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	noivern: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
};

for (const pokemon in Base) {
	const key = pokemon as keyof typeof FormatsData;
	if (!FormatsData[key]) FormatsData[key] = { inherit: true, isNonstandard: "Custom", tier: "Illegal", natDexTier: "Illegal", doublesTier: "Illegal" };
}
