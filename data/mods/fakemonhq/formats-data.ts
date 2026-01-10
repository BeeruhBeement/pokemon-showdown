import { Pokedex as Base } from '../../pokedex';

export const FormatsData: import('../../../sim/dex-species').ModdedSpeciesFormatsDataTable = {
	// Real mons
	krabby: {
		inherit: true,
		tier: "LC",
	},
	kingler: {
		inherit: true,
		tier: "OU",
	},
	koffing: {
		inherit: true,
		tier: "LC",
	},
	weezing: {
		inherit: true,
		tier: "OU",
	},
	weezinggalar: {
		inherit: true,
		tier: "OU",
	},
	goldeen: {
		inherit: true,
		tier: "LC",
	},
	seaking: {
		inherit: true,
		tier: "OU",
	},
	pinsir: {
		inherit: true,
		tier: "OU",
	},
	pinsirmega: {
		inherit: true,
		tier: "OU",
	},
	snubbull: {
		inherit: true,
		tier: "LC",
	},
	granbull: {
		inherit: true,
		tier: "OU",
	},
	natu: {
		inherit: true,
		tier: "LC",
	},
	xatu: {
		inherit: true,
		tier: "OU",
	},
	nincada: {
		inherit: true,
		tier: "LC",
	},
	ninjask: {
		inherit: true,
		tier: "OU",
	},
	shedinja: {
		inherit: true,
		tier: "OU",
	},
	nosepass: {
		inherit: true,
		tier: "LC",
	},
	electrike: {
		inherit: true,
		tier: "LC",
	},
	manectric: {
		inherit: true,
		tier: "OU",
	},
	manectricmega: {
		inherit: true,
		tier: "OU",
	},
	shellos: {
		inherit: true,
		tier: "LC",
	},
	gastrodon: {
		inherit: true,
		tier: "OU",
	},
	probopass: {
		inherit: true,
		tier: "OU",
	},
	drilbur: {
		inherit: true,
		tier: "LC",
	},
	excadrill: {
		inherit: true,
		tier: "OU",
	},
	cryogonal: {
		inherit: true,
		tier: "OU",
	},
	druddigon: {
		inherit: true,
		tier: "OU",
	},
	furfrou: {
		inherit: true,
		tier: "OU",
	},
	pancham: {
		inherit: true,
		tier: "LC",
	},
	pangoro: {
		inherit: true,
		tier: "OU",
	},
	bruxish: {
		inherit: true,
		tier: "OU",
	},
	dhelmise: {
		inherit: true,
		tier: "OU",
	},
	fidough: {
		inherit: true,
		tier: "LC",
	},
	dachsbun: {
		inherit: true,
		tier: "OU",
	},
	capsakid: {
		inherit: true,
		tier: "LC",
	},
	scovillain: {
		inherit: true,
		tier: "OU",
	},

	citricity: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
	hairpunch: {
		inherit: true,
		tier: "OU",
		isNonstandard: null,
	},
};

for (const pokemon in Base) {
	const key = pokemon as keyof typeof FormatsData;
	if (!FormatsData[key]) FormatsData[key] = {inherit: true, isNonstandard: "Custom", tier: "Illegal", natDexTier: "Illegal", doublesTier: "Illegal"};
}
