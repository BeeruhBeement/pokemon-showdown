export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	lowkick: {
		inherit: true,
		basePowerCallback(pokemon, target) { return 45 },
		onTryHit() { return },
		basePower: 45,
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		desc: "Has a 20% chance to make the target flinch.",
		shortDesc: "20% chance to make the target flinch.",
	},
	leechlife: {
		inherit: true,
		basePower: 80,
	},
};
