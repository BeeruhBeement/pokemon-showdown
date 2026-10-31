import { Pokedex as Base } from '../../pokedex';

export const FormatsData: import('../../../sim/dex-species').ModdedSpeciesFormatsDataTable = {
	furret: {
		isNonstandard: null,
		tier: "UU",
		doublesTier: "DOU",
	},
	noctowl: {
		isNonstandard: null,
		tier: "UU",
		doublesTier: "DOU",
	},
	granbull: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	floatzel: {
		isNonstandard: null,
		tier: "UU",
		doublesTier: "DOU",
	},
	vanilluxe: {
		isNonstandard: null,
		tier: "UU",
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
	delphox: {
		isNonstandard: null,
		tier: "UU",
		doublesTier: "DOU",
	},
	noivern: {
		isNonstandard: null,
		tier: "UU",
		doublesTier: "DOU",
	},
	thievul: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	perrserker: {
		isNonstandard: null,
		tier: "UU",
		doublesTier: "DOU",
	},
};

for (const pokemon in Base) {
	const key = pokemon as keyof typeof FormatsData;
	if (!FormatsData[key]) FormatsData[key] = { inherit: true, isNonstandard: "Custom", tier: "Illegal", natDexTier: "Illegal", doublesTier: "Illegal" };
}
