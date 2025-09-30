import { Pokedex as Base } from '../../pokedex';

export const FormatsData: import('../../../sim/dex-species').ModdedSpeciesFormatsDataTable = {
	luxray: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	centiskorch: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	salazzle: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	klawf: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	accelgor: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	mantine: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	skeledirge: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	hydreigon: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	gyarados: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	tsareena: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	bewear: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	espathra: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	kyogre: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	reuniclus: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	scyther: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	scizor: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	kleavor: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	cryogonal: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	cofagrigus: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	rhyperior: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	grafaiai: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	hatterene: {
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
	flygon: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	heliolisk: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	ambipom: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	cosmoem: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	lunala: {
		inherit: true,
		tier: "Uber",
		isNonstandard: null,
	},
	solgaleo: {
		inherit: true,
		tier: "Uber",
		isNonstandard: null,
	},
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
	galvantula: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	swampert: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	altaria: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	altariamega: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	spinda: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	coalossal: {
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
	dhelmise: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	bronzong: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	palafin: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
};

for (const pokemon in Base) {
	const key = pokemon as keyof typeof FormatsData;
	if (!FormatsData[key]) FormatsData[key] = {inherit: true, isNonstandard: "Custom", tier: "Illegal", natDexTier: "Illegal", doublesTier: "Illegal"};
}
