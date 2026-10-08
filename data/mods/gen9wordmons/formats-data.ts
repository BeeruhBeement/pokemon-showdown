import { Pokedex as Base } from '../../pokedex';

export const FormatsData: import('../../../sim/dex-species').ModdedSpeciesFormatsDataTable = {
	lazord: {
		tier: "LC",
	},
	lazurbim: {
		tier: "OU",
	},
	mummit: {
		tier: "LC",
	},
	mummiriff: {
		tier: "OU",
	},
	snapmap: {
		tier: "LC",
	},
	snapcrap: {
		tier: "OU",
	},
	banita: {
		tier: "LC",
	},
	splitnana: {
		tier: "OU",
	},
	voipup: {
		tier: "LC",
	},
	voidog: {
		tier: "OU",
	},
	animon: {
		tier: "LC",
	},
	beast: {
		tier: "OU",
	},
	blessball: {
		tier: "OU",
	},
	capricleave: {
		tier: "OU",
	},
	snakehamme: {
		tier: "OU",
	},
	vipemblem: {
		tier: "LC",
	},
	inspobra: {
		tier: "OU",
	},
	baastral: {
		tier: "OU",
	},
	beaver: {
		tier: "LC",
	},
	bigbeaver: {
		tier: "NFE",
	},
	lumber: {
		tier: "OU",
	},
	tinyheart: {
		tier: "LC",
	},
	hearty: {
		tier: "NFE",
	},
	ricardio: {
		tier: "OU",
	},
	novolver: {
		tier: "LC",
	},
	gunnygator: {
		tier: "OU",
	},
	slimout: {
		tier: "OU",
	},
	slimoutbiography: {
		tier: "OU",
	},
	slimoutbless: {
		tier: "OU",
	},
	slimoutbuilding: {
		tier: "OU",
	},
	slimoutcamera: {
		tier: "OU",
	},
	slimoutcomfort: {
		tier: "OU",
	},
	slimoutcorn: {
		tier: "OU",
	},
	slimoutdrink: {
		tier: "OU",
	},
	slimoutfuel: {
		tier: "OU",
	},
	slimoutherd: {
		tier: "OU",
	},
	slimouthonor: {
		tier: "OU",
	},
	slimoutinspire: {
		tier: "OU",
	},
	slimoutlaser: {
		tier: "OU",
	},
	slimoutlegend: {
		tier: "OU",
	},
	slimoutmatter: {
		tier: "OU",
	},
	slimoutproof: {
		tier: "OU",
	},
	slimoutpyramid: {
		tier: "OU",
	},
	slimoutrage: {
		tier: "OU",
	},
	cornelius: {
		tier: "OU",
	},
	witchhazel: {
		tier: "OU",
	},
	candlit: {
		tier: "LC",
	},
	necromancer: {
		tier: "OU",
	},
	candrake: {
		tier: "OU",
	},
}

for (const pokemon in Base) {
	const key = pokemon as keyof typeof FormatsData;
	if (!FormatsData[key]) FormatsData[key] = {inherit: true, isNonstandard: "Custom", tier: "Illegal", natDexTier: "Illegal", doublesTier: "Illegal"};
}