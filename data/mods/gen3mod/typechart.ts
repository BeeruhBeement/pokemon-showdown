import { ModdedTypeData } from "../../../sim/dex-data";

export const TypeChart: {[k: string]: ModdedTypeData} = {
	bug: {
		inherit: true,
		damageTaken: {
			confusion: 3,
			Bug: 0,
			Dark: 0,
			Dragon: 0,
			Electric: 0,
			Fairy: 0,
			Fighting: 2,
			Fire: 1,
			Flying: 1,
			Ghost: 0,
			Grass: 2,
			Ground: 2,
			Ice: 0,
			Normal: 0,
			Poison: 0,
			Psychic: 0,
			Rock: 1,
			Steel: 0,
			Water: 0,

			Sound: 2,
		},
	},
	ghost: {
		inherit: true,
		damageTaken: {
			trapped: 3,
			Bug: 0,
			Dark: 1,
			Dragon: 0,
			Electric: 0,
			Fairy: 0,
			Fighting: 3,
			Fire: 0,
			Flying: 0,
			Ghost: 1,
			Grass: 0,
			Ground: 0,
			Ice: 0,
			Normal: 3,
			Poison: 2,
			Psychic: 0,
			Rock: 0,
			Steel: 0,
			Stellar: 0,
			Water: 0,
		},
	},
	electric: {
		inherit: true,
		damageTaken: {
			par: 3,
			Bug: 0,
			Dark: 0,
			Dragon: 0,
			Electric: 2,
			Fairy: 0,
			Fighting: 0,
			Fire: 0,
			Flying: 2,
			Ghost: 0,
			Grass: 0,
			Ground: 1,
			Ice: 0,
			Normal: 0,
			Poison: 0,
			Psychic: 0,
			Rock: 0,
			Steel: 2,
			Water: 0,
		},
	},
	fairy: {
		inherit: true,
		damageTaken: {
			Bug: 2,
			Dark: 2,
			Dragon: 3,
			Electric: 0,
			Fairy: 0,
			Fighting: 2,
			Fire: 0,
			Flying: 0,
			Ghost: 0,
			Grass: 0,
			Ground: 0,
			Ice: 0,
			Normal: 0,
			Poison: 1,
			Psychic: 0,
			Rock: 0,
			Steel: 1,
			Stellar: 0,
			Water: 0,
		},
		isNonstandard: null,
		HPivs: {},
	},
	grass: {
		inherit: true,
		damageTaken: {
			Bug: 1,
			Dark: 0,
			Dragon: 0,
			Electric: 2,
			Fairy: 0,
			Fighting: 0,
			Fire: 1,
			Flying: 1,
			Ghost: 0,
			Grass: 2,
			Ground: 2,
			Ice: 1,
			Normal: 0,
			Poison: 1,
			Psychic: 0,
			Rock: 0,
			Steel: 0,
			Water: 2,

			Sound: 2,
		},
	},
	ice: {
		inherit: true,
		damageTaken: {
			hail: 3,
			frz: 3,
			Bug: 0,
			Dark: 0,
			Dragon: 0,
			Electric: 2,
			Fairy: 0,
			Fighting: 1,
			Fire: 1,
			Flying: 0,
			Ghost: 0,
			Grass: 0,
			Ground: 2,
			Ice: 2,
			Normal: 0,
			Poison: 0,
			Psychic: 0,
			Rock: 1,
			Steel: 1,
			Water: 2,
		},
	},
	poison: {
		inherit: true,
		damageTaken: {
			psn: 3,
			tox: 3,
			Bug: 2,
			Dark: 0,
			Dragon: 0,
			Electric: 0,
			Fairy: 2,
			Fighting: 2,
			Fire: 0,
			Flying: 0,
			Ghost: 0,
			Grass: 2,
			Ground: 1,
			Ice: 0,
			Normal: 0,
			Poison: 2,
			Psychic: 1,
			Rock: 0,
			Steel: 0,
			Water: 0,
		},
	},
	psychic: {
		inherit: true,
		damageTaken: {
			Bug: 1,
			Dark: 1,
			Dragon: 0,
			Electric: 0,
			Fairy: 2,
			Fighting: 2,
			Fire: 0,
			Flying: 0,
			Ghost: 1,
			Grass: 0,
			Ground: 0,
			Ice: 0,
			Normal: 0,
			Poison: 0,
			Psychic: 2,
			Rock: 0,
			Steel: 0,
			Water: 0,
		},
	},
	rock: {
		inherit: true,
		damageTaken: {
			sandstorm: 3,
			Bug: 0,
			Dark: 0,
			Dragon: 0,
			Electric: 0,
			Fairy: 0,
			Fighting: 1,
			Fire: 2,
			Flying: 2,
			Ghost: 2,
			Grass: 1,
			Ground: 1,
			Ice: 0,
			Normal: 2,
			Poison: 2,
			Psychic: 0,
			Rock: 0,
			Steel: 1,
			Water: 1,
		},
	},
	sound: {
		inherit: true,
		isNonstandard: null,
	},
	steel: {
		inherit: true,
		damageTaken: {
			psn: 3,
			tox: 3,
			sandstorm: 3,
			Bug: 2,
			Dark: 0,
			Dragon: 2,
			Electric: 0,
			Fighting: 1,
			Fire: 1,
			Flying: 2,
			Ghost: 0,
			Grass: 2,
			Ground: 1,
			Ice: 2,
			Normal: 2,
			Poison: 3,
			Psychic: 2,
			Rock: 2,
			Steel: 2,
			Water: 0,
			Fairy: 2,
		},
	},
	water: {
		damageTaken: {
			Bug: 0,
			Dark: 0,
			Dragon: 0,
			Electric: 1,
			Fairy: 0,
			Fighting: 0,
			Fire: 2,
			Flying: 0,
			Ghost: 0,
			Grass: 1,
			Ground: 0,
			Ice: 2,
			Normal: 0,
			Poison: 0,
			Psychic: 0,
			Rock: 0,
			Steel: 2,
			Stellar: 0,
			Water: 2,

			Sound: 1,
		},
	},
};
