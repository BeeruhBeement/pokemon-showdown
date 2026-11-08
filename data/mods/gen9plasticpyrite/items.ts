export const Items: import("../../../sim/dex-items").ModdedItemDataTable = {
	darkgem: {
		inherit: true,
		isNonstandard: null,
	},
	steelgem: {
		inherit: true,
		isNonstandard: null,
	},
	weaknesspolicy: {
		inherit: true,
		isNonstandard: "Future",
	},
	blunderpolicy: {
		inherit: true,
		isNonstandard: "Future",
	},
	heavydutyboots: {
		inherit: true,
		isNonstandard: "Future",
	},
	loadeddice: {
		inherit: true,
		isNonstandard: "Future",
	},
	covertcloak: {
		inherit: true,
		isNonstandard: "Future",
	},
	abilityshield: {
		inherit: true,
		isNonstandard: "Future",
	},
	
	frostorb: {
		name: "Frost Orb",
		spritenum: -1,
		fling: {
			basePower: 30,
			status: 'frz',
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('frz', pokemon);
		},
		shortDesc: "At the end of every turn, this item attempts to frostbite the holder.",
	},
	brightbulb: {
		name: "Bright Bulb",
		spritenum: -1,
		fling: {
			basePower: 30,
			status: 'par',
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('par', pokemon);
			if (pokemon.types.includes("Electric")) {
				pokemon.addVolatile("charge");
			}
		},
		shortDesc: "At end of turn: Paralysis. If Electric: Charge.",
	},
	lightupshoes: {
		name: "Light-Up Shoes",
		spritenum: -1,
		fling: {
			basePower: 80,
		},
		onDamage(damage, target, source, effect) {
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			if (sideConditions.includes(effect.id)) {
				return false;
			}
		},
		shortDesc: "When switching in, the holder is unaffected by hazards on its side of the field.",
	},
};
