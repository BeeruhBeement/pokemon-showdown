import { Pokedex as Base } from '../../pokedex';

export const FormatsData: import('../../../sim/dex-species').ModdedSpeciesFormatsDataTable = {
	poliwrath: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	rapidashgalar: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	seaking: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	crobat: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	sudowoodo: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	steelix: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	granbull: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	donphan: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	shiftry: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	masquerain: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	exploud: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	hariyama: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	sableye: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	manectric: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	camerupt: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	cacturne: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	claydol: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	kecleon: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	rampardos: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	bastiodon: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	drifblim: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	drapion: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	abomasnow: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	simisage: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	simisear: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	simipour: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	seismitoad: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	vanilluxe: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	slurpuff: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	toucannon: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	shiinotic: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	bewear: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	turtonator: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	togedemaru: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	dubwool: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	flapple: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	perrserker: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	scovillain: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	wugtrio: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	bombirdier: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
	houndstone: {
		isNonstandard: null,
		doublesTier: "DOU",
	},
}

for (const pokemon in Base) {
	const key = pokemon as keyof typeof FormatsData;
	if (!FormatsData[key]) FormatsData[key] = {inherit: true, isNonstandard: "Custom", tier: "Illegal", natDexTier: "Illegal", doublesTier: "Illegal"};
}
