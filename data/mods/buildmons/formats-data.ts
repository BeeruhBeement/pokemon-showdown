import { Pokedex as Base } from '../../pokedex';

export const FormatsData: import('../../../sim/dex-species').ModdedSpeciesFormatsDataTable = {
	poliwrath: {
		isNonstandard: null,
		tier: "OU",
	},
	rapidashgalar: {
		isNonstandard: null,
		tier: "OU",
	},
	seaking: {
		isNonstandard: null,
		tier: "OU",
	},
	crobat: {
		isNonstandard: null,
		tier: "OU",
	},
	granbull: {
		isNonstandard: null,
		tier: "OU",
	},
	donphan: {
		isNonstandard: null,
		tier: "OU",
	},
	shiftry: {
		isNonstandard: null,
		tier: "OU",
	},
	masquerain: {
		isNonstandard: null,
		tier: "OU",
	},
	exploud: {
		isNonstandard: null,
		tier: "OU",
	},
	hariyama: {
		isNonstandard: null,
		tier: "OU",
	},
	sableye: {
		isNonstandard: null,
		tier: "OU",
	},
	manectric: {
		isNonstandard: null,
		tier: "OU",
	},
	camerupt: {
		isNonstandard: null,
		tier: "OU",
	},
	claydol: {
		isNonstandard: null,
		tier: "OU",
	},
	rampardos: {
		isNonstandard: null,
		tier: "OU",
	},
	bastiodon: {
		isNonstandard: null,
		tier: "OU",
	},
	drifblim: {
		isNonstandard: null,
		tier: "OU",
	},
	drapion: {
		isNonstandard: null,
		tier: "OU",
	},
	abomasnow: {
		isNonstandard: null,
		tier: "OU",
	},
	simisage: {
		isNonstandard: null,
		tier: "OU",
	},
	simisear: {
		isNonstandard: null,
		tier: "OU",
	},
	simipour: {
		isNonstandard: null,
		tier: "OU",
	},
	seismitoad: {
		isNonstandard: null,
		tier: "OU",
	},
	vanilluxe: {
		isNonstandard: null,
		tier: "OU",
	},
	slurpuff: {
		isNonstandard: null,
		tier: "OU",
	},
	toucannon: {
		isNonstandard: null,
		tier: "OU",
	},
	shiinotic: {
		isNonstandard: null,
		tier: "OU",
	},
	bewear: {
		isNonstandard: null,
		tier: "OU",
	},
	turtonator: {
		isNonstandard: null,
		tier: "OU",
	},
	togedemaru: {
		isNonstandard: null,
		tier: "OU",
	},
	dubwool: {
		isNonstandard: null,
		tier: "OU",
	},
	flapple: {
		isNonstandard: null,
		tier: "OU",
	},
	perrserker: {
		isNonstandard: null,
		tier: "OU",
	},
	scovillain: {
		isNonstandard: null,
		tier: "OU",
	},
	wugtrio: {
		isNonstandard: null,
		tier: "OU",
	},
	bombirdier: {
		isNonstandard: null,
		tier: "OU",
	},
	houndstone: {
		isNonstandard: null,
		tier: "OU",
	},
}

for (const pokemon in Base) {
	const key = pokemon as keyof typeof FormatsData;
	if (!FormatsData[key]) FormatsData[key] = {inherit: true, isNonstandard: "Custom", tier: "Illegal", natDexTier: "Illegal", doublesTier: "Illegal"};
}
