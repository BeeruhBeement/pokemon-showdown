import { Pokedex as Base } from '../../pokedex';

export const FormatsData: import('../../../sim/dex-species').ModdedSpeciesFormatsDataTable = {
	spotalat: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	kaskall: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	metiel: {
		inherit: true,
		tier: "LC",
		isNonstandard: null,
	},
	cockatune: {
		inherit: true,
		tier: "NFE",
		isNonstandard: null,
	},
	rockatoo: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	toxophose: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	eelava: {
		inherit: true,
		tier: "LC",
		isNonstandard: null,
	},
	magmander: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	mawileyuugenian: {
		inherit: true,
		tier: "NFE",
		isNonstandard: null,
	},
	vulguile: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	chugghoul: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
};

for (const pokemon in Base) {
	const key = pokemon as keyof typeof FormatsData;
	if (!FormatsData[key]) FormatsData[key] = {inherit: true, isNonstandard: "Custom", tier: "Illegal", natDexTier: "Illegal", doublesTier: "Illegal"};
}
