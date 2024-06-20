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
		basePower: 40,
	},
	rocksmash: {
		inherit: true,
		basePower: 60,
	},
	howl: {
		inherit: true,
		target: "allies",
		desc: "Raises the Attack of the user and all allies 1 stage.",
		shortDesc: "Raises the user's and ally's Attack by 1.",
	},
	bugbite: {
		inherit: true,
		gen: 3,
		onHit(target, source) {},
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
	},
	iceshard: {
		inherit: true,
		gen: 3,
	},
	bulletpunch: {
		inherit: true,
		gen: 3,
	},
	poisongas: {
		inherit: true,
		accuracy: 80,
		target: "allAdjacentFoes",
		desc: "Poisons the target.",
		shortDesc: "Poisons the foe(s).",
	},
	feint: {
		inherit: true,
		gen: 3,
		onTry(source, target) {},
		desc: "If this move is successful, it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally.",
		shortDesc: "Nullifies Detect, Protect, and Quick/Wide Guard.",
	},
	armthrust: {
		inherit: true,
		basePower: 20,
	},
	bulletseed: {
		inherit: true,
		basePower: 20,
	},
	iciclespear: {
		inherit: true,
		basePower: 20,
	},
	pinmissile: {
		inherit: true,
		basePower: 20,
	},
	triplekick: {
		inherit: true,
		basePower: 20,
	},
	doublekick: {
		inherit: true,
		basePower: 40,
		accuracy: 90,
	},
	hypervoice: {
		inherit: true,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
	},
	charge: {
		inherit: true,
		desc: "If the user uses an Electric-type attack, its power will be doubled until it's no longer active.",
		shortDesc: "The user's Electric attacks have 2x power.",
		condition: {
			onAfterMove(pokemon, target, move) {},
		},
		boosts: {},
	},
	thief: {
		inherit: true,
		basePower: 60,
	},
	snarl: {
		inherit: true,
		gen: 3,
		flags: {protect: 1, mirror: 1, sound: 1},
	},
	uturn: {
		inherit: true,
		gen: 3,
		type: "Normal",
		basePower: 20,
	},
	leechlife: {
		inherit: true,
		basePower: 60,
	},
	twineedle: {
		inherit: true,
		basePower: 40,
		accuracy: 90,
	},
	shellsmash: {
		inherit: true,
		desc: "Lowers the user's Defense and Special Defense by 1 stage. Raises the user's Attack, Special Attack, and Speed by 1 stages.",
		shortDesc: "Lowers Def, SpD by 1; raises Atk, SpA, Spe by 1.",
		boosts: {
			def: -1,
			spd: -1,
			atk: 1,
			spa: 1,
			spe: 1,
		},
		type: "Water",
		gen: 3,
	},
	growth: {
		inherit: true,
		desc: "Raises the user's Attack and Special Attack by 1 stage.",
		shortDesc: "Raises user's Attack and Sp. Atk by 1.",
		boosts: {
			atk: 1,
			spa: 1,
		},
		secondary: null,
		type: "Grass",
	},
	highjumpkick: {
		inherit: true,
		basePower: 120,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('High Jump Kick'));
		},
	},
	jumpkick: {
		inherit: true,
		basePower: 90,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('Jump Kick'));
		},
	},
};