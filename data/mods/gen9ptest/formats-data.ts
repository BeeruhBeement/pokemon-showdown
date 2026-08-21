import { Pokedex as Base } from '../../pokedex';

export const FormatsData: import('../../../sim/dex-species').ModdedSpeciesFormatsDataTable = {
	c3ll: {
		tier: "OU",
		doublesTier: "DOU",
	},
	livii: {
		tier: "OU",
		doublesTier: "DOU",
	},
	frambuesa: {
		tier: "OU",
		doublesTier: "DOU",
	},
	r: {
		tier: "OU",
		doublesTier: "DOU",
	},
	mad0130: {
		tier: "OU",
		doublesTier: "DOU",
	},
	milk: {
		tier: "OU",
		doublesTier: "DOU",
	},
	fiend: {
		tier: "OU",
		doublesTier: "DOU",
	},
	greed2: {
		tier: "OU",
		doublesTier: "DOU",
	},
	gaboswampert: {
		tier: "OU",
		doublesTier: "DOU",
	},
	anaconja: {
		tier: "OU",
		doublesTier: "DOU",
	},
	enderwither02: {
		tier: "OU",
		doublesTier: "DOU",
	},
	jas: {
		tier: "OU",
		doublesTier: "DOU",
	},
	larex: {
		tier: "OU",
		doublesTier: "DOU",
	},
	cyaneedle: {
		tier: "OU",
		doublesTier: "DOU",
	},
	nuclearstomp: {
		tier: "OU",
		doublesTier: "DOU",
	},
	charley: {
		tier: "OU",
		doublesTier: "DOU",
	},
	killerfish: {
		tier: "OU",
		doublesTier: "DOU",
	},
	nkazuya: {
		tier: "OU",
		doublesTier: "DOU",
	},
	slowbro: {
		tier: "OU",
		doublesTier: "DOU",
	},
	ruo: {
		tier: "OU",
		doublesTier: "DOU",
	},
	flampoke: {
		tier: "OU",
		doublesTier: "DOU",
	},
	ttk: {
		tier: "OU",
		doublesTier: "DOU",
	},
	thurisaz: {
		tier: "OU",
		doublesTier: "DOU",
	},
	ghostsword: {
		tier: "OU",
		doublesTier: "DOU",
	},
	luigiguy: {
		tier: "OU",
		doublesTier: "DOU",
	},
	definitelyelite: {
		tier: "OU",
		doublesTier: "DOU",
	},
	mendoza: {
		tier: "OU",
		doublesTier: "DOU",
	},
	serpexnessie: {
		tier: "OU",
		doublesTier: "DOU",
	},
	taurossweep: {
		tier: "OU",
		doublesTier: "DOU",
	},
	airy: {
		tier: "OU",
		doublesTier: "DOU",
	},
	nosh: {
		tier: "OU",
		doublesTier: "DOU",
	},
	supercraig: {
		tier: "OU",
		doublesTier: "DOU",
	},
	beeruh: {
		tier: "OU",
		doublesTier: "DOU",
	},
	rowlet: {
		tier: "OU",
		doublesTier: "DOU",
	},
	gaysexor: {
		tier: "OU",
		doublesTier: "DOU",
	},
	dunscy: {
		tier: "OU",
		doublesTier: "DOU",
	},
	boshifanfic: {
		tier: "OU",
		doublesTier: "DOU",
	},
	jozar: {
		tier: "OU",
		doublesTier: "DOU",
	},
	zxgzxg: {
		tier: "OU",
		doublesTier: "DOU",
	},
	arcato: {
		tier: "OU",
		doublesTier: "DOU",
	},
	nidotheking: {
		tier: "OU",
		doublesTier: "DOU",
	},
	dottwodot: {
		tier: "OU",
		doublesTier: "DOU",
	},
	bandite: {
		tier: "OU",
		doublesTier: "DOU",
	},
	xthegamemaster: {
		tier: "OU",
		doublesTier: "DOU",
	},
	cyberpunkninja: {
		tier: "OU",
		doublesTier: "DOU",
	},
	epictoxie: {
		tier: "OU",
		doublesTier: "DOU",
	},
	aevilok: {
		tier: "OU",
		doublesTier: "DOU",
	},
	oshawott: {
		tier: "OU",
		doublesTier: "DOU",
	},
};

for (const pokemon in Base) {
	const key = pokemon as keyof typeof FormatsData;
	if (!FormatsData[key]) FormatsData[key] = {inherit: true, isNonstandard: "Custom", tier: "Illegal", natDexTier: "Illegal", doublesTier: "Illegal"};
}

