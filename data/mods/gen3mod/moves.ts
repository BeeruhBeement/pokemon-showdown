export const Moves: {[k: string]: ModdedMoveData} = {
	charm: {
		inherit: true,
		type: "Fairy",
	},
	moonlight: {
		inherit: true,
		type: "Fairy",
	},
	sweetkiss: {
		inherit: true,
		type: "Fairy",
	},
	futuresight: {
		inherit: true,
		basePower: 120,
		accuracy: 100,
	},
	metalclaw: {
		inherit: true,
		basePower: 70,
	},
	suckerpunch: {
		inherit: true,
		gen: 3,
		basePower: 55,
	},
	babydolleyes: {
		inherit: true,
		gen: 3,
	},
	dazzlinggleam: {
		inherit: true,
		gen: 3,
	},
	disarmingvoice: {
		inherit: true,
		basePower: 60,
		flags: {protect: 1, mirror: 1, sound: 1, metronome: 1},
		gen: 3,
	},
	dualwingbeat: {
		inherit: true,
		gen: 3,
	},
	rapidspin: {
		inherit: true,
		desc: "If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field. Has a 100% chance to raise the user's Speed by 1 stage.",
		shortDesc: "Free user from hazards/bind/Leech Seed; +1 Spe.",
		basePower: 50,
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
	},
	outrage: {
		inherit: true,
		basePower: 100,
	},
	thrash: {
		inherit: true,
		basePower: 100,
	},
	petaldance: {
		inherit: true,
		basePower: 100,
	},
	drainingkiss: {
		inherit: true,
		desc: "The user recovers 1/2 the HP lost by the target, rounded down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		drain: [1, 2],
		gen: 3,
	},
	matblock: {
		inherit: true,
		gen: 3,
	},
	furycutter: {
		inherit: true,
		basePower: 30,
	},
};
