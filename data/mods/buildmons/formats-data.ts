import { Pokedex as Base } from '../../pokedex';

export const FormatsData: import('../../../sim/dex-species').ModdedSpeciesFormatsDataTable = {
	hitmonlee: {
		tier: "OU",
	},
	corviknight: {
		tier: "OU",
	},
	probopass: {
		tier: "OU",
	},
	cofagrigus: {
		tier: "OU",
	},
	ludicolo: {
		tier: "OU",
	},
	ribombee: {
		tier: "OU",
	},
	houndoom: {
		tier: "OU",
	},
	floatzel: {
		tier: "OU",
	},
	lanturn: {
		tier: "OU",
	},
	toxicroak: {
		tier: "OU",
	},
	musharna: {
		tier: "OU",
	},
	cetitan: {
		tier: "OU",
	},
	turtonator: {
		tier: "OU",
	},
	sandslash: {
		tier: "OU",
	},
}

for (const pokemon in Base) {
	const key = pokemon as keyof typeof FormatsData;
	if (!FormatsData[key]) FormatsData[key] = {inherit: true, isNonstandard: "Custom", tier: "Illegal", natDexTier: "Illegal", doublesTier: "Illegal"};
}
