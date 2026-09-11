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
}

for (const pokemon in Base) {
	const key = pokemon as keyof typeof FormatsData;
	if (!FormatsData[key]) FormatsData[key] = {inherit: true, isNonstandard: "Custom", tier: "Illegal", natDexTier: "Illegal", doublesTier: "Illegal"};
}