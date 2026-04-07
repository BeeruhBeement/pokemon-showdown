import { Pokedex as Base } from '../../pokedex';

export const FormatsData: import('../../../sim/dex-species').ModdedSpeciesFormatsDataTable = {
	poliwrath: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	rapidashgalar: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	seaking: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	crobat: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	sudowoodo: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	steelix: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	granbull: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	donphan: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	shiftry: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	masquerain: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	exploud: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	hariyama: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	sableye: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	manectric: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	camerupt: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	cacturne: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	claydol: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	kecleon: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	rampardos: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	bastiodon: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	drifblim: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	drapion: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	abomasnow: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	simisage: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	simisear: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	simipour: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	seismitoad: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	vanilluxe: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	slurpuff: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	toucannon: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	shiinotic: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	bewear: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	turtonator: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	togedemaru: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	dubwool: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	flapple: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	perrserker: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	scovillain: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	wugtrio: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	bombirdier: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
	houndstone: {
		isNonstandard: null,
		tier: "OU",
		doublesTier: "DOU",
	},
};

for (const pokemon in Base) {
	const key = pokemon as keyof typeof FormatsData;
	if (!FormatsData[key]) FormatsData[key] = { inherit: true, isNonstandard: "Custom", tier: "Illegal", natDexTier: "Illegal", doublesTier: "Illegal" };
}
