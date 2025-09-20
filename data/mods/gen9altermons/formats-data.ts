import { Pokedex as Base } from '../../pokedex';

export const FormatsData: import('../../../sim/dex-species').ModdedSpeciesFormatsDataTable = {
	beheeyem: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	lucario: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	lucariomega: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	crawdaunt: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	druddigon: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	hydrapple: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	swampert: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	spinda: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	latias: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	electrode: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	flapple: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	appletun: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	banette: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	banettemega: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	bronzong: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	rhyperior: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	mantine: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	kyogre: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	centiskorch: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	skeledirge: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
};

for (const pokemon in Base) {
	const key = pokemon as keyof typeof FormatsData;
	if (!FormatsData[key]) FormatsData[key] = {inherit: true, isNonstandard: "Custom", tier: "Illegal", natDexTier: "Illegal", doublesTier: "Illegal"};
}
