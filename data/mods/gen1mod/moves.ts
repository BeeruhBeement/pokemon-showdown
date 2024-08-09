import { hasUncaughtExceptionCaptureCallback } from "process";
import { ModdedMoveData } from "../../../sim/dex-moves";

export const Moves: {[k: string]: ModdedMoveData} = {
	dazzlinggleam: {
		inherit: true,
		gen: 1,
		desc: "Has a 10% chance to poison the target.",
		shortDesc: "10% chance to poison the target.",
		secondary: {
			chance: 10,
			status: 'psn',
		},
	},
	lick: {
		inherit: true,
		basePower: 60,
		desc: "Has a 30% chance to confuse the target.",
		shortDesc: "30% chance to confuse the target.",
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
	},
	megadrain: {
		inherit: true,
		basePower: 60,
		desc: "Has a 10% chance to lower the target's Attack by 1.",
		shortDesc: "10% chance to lower the target's Attack by 1.",
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
			},
		},
	},
	mirrorshot: {
		inherit: true,
		gen: 1,
		type: "Light",
		basePower: 60,
		desc: "Has a 20% chance to lower the target's Special by 1.",
		shortDesc: "20% chance to lower the target's Special by 1.",
		secondary: {
			chance: 20,
			boosts: {
				spa: -1,
				spd: -1,
			},
		},
	},
	eggbomb: {
		inherit: true,
		type: "Food",
		desc: "Has a 10% chance to lower the target's Speed by 1.",
		shortDesc: "10% chance to lower the target's Speed by 1.",
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
	},
	bite: {
		inherit: true,
		type: "Dark",
		basePower: 60,
		desc: "Has a 10% chance to lower the target's Defense by 1.",
		shortDesc: "10% chance to lower the target's Defense by 1.",
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
	},
	bounce: {
		inherit: true,
		gen: 1,
		type: "Rubber",
	},
	hyperdrill: {
		inherit: true,
		gen: 1,
		type: "Earth",
		basePower: 90,
	},
	cosmicpower: {
		inherit: true,
		gen: 1,
		type: "Cosmic",
		desc: "Raises the user's Defense by 1 stage.",
		shortDesc: "Raises the user's Defense by 1.",
		boosts: {
			def: 1,
		},
	},
	milkdrink: {
		inherit: true,
		gen: 1,
		type: "Food",
	},
	softboiled: {
		inherit: true,
		gen: 1,
		type: "Food",
	},
	earthpower: {
		inherit: true,
		gen: 1,
		type: "Earth",
		basePower: 80,
		secondary: null,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
	},
	chatter: {
		inherit: true,
		gen: 1,
		type: "Sound",
	},
	boomburst: {
		inherit: true,
		gen: 1,
		type: "Sound",
		basePower: 100,
	},

	fissileblast: {
		num: -1,
		accuracy: 95,
		basePower: 70,
		category: "Physical",
		name: "Fissile Blast",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 20,
			status: 'psn',
		},
		target: "normal",
		type: "Nuclear",
		contestType: "Tough",
		desc: "Has a 20% chance to poison the target.",
		shortDesc: "20% chance to poison the target.",
	},
	beam: {
		num: -2,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Beam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Light",
		contestType: "Beautiful",
		shortDesc: "No additional effect.",
	},
	glassshards: {
		num: -3,
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		name: "Glass Shards",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Glass",
		contestType: "Beautiful",
		shortDesc: "No additional effect.",
	},
	meteor: {
		num: -4,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		name: "Meteor",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		self: {
			boosts: {
				spa: -1,
				spd: -1,
			},
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Beautiful",
		desc: "Lowers the user's Special by 1 stage.",
		shortDesc: "Lowers the user's Special by 1.",
	},
	megabyte: {
		num: -5,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Mega Byte",
		pp: 25,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		secondary: null,
		target: "normal",
		type: "Cyber",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},
	lagblast: {
		num: -6,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Lag Blast",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, metronome: 1, nosleeptalk: 1, failinstruct: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile('twoturnmove')) {
				attacker.removeVolatile('invulnerability');
				return;
			}
			this.add('-prepare', attacker, move.name);
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Cyber",
		contestType: "Cool",
		desc: "This attack charges on the first turn and executes on the second.",
		shortDesc: "Charges turn 1. Hits turn 2.",
	},
	donuttrap: {
		num: -7,
		accuracy: 70,
		basePower: 15,
		category: "Physical",
		name: "Donut Trap",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		volatileStatus: 'partiallytrapped',
		self: {
			volatileStatus: 'partialtrappinglock',
		},
		// FIXME: onBeforeMove(pokemon, target) {target.removeVolatile('mustrecharge')}
		onHit(target, source) {
			/**
			 * The duration of the partially trapped must be always renewed to 2
			 * so target doesn't move on trapper switch out as happens in gen 1.
			 * However, this won't happen if there's no switch and the trapper is
			 * about to end its partial trapping.
			 **/
			if (target.volatiles['partiallytrapped']) {
				if (source.volatiles['partialtrappinglock'] && source.volatiles['partialtrappinglock'].duration > 1) {
					target.volatiles['partiallytrapped'].duration = 2;
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Food",
		contestType: "Cute",
		desc: "The user spends two to five turns using this move. Has a 3/8 chance to last two or three turns, and a 1/8 chance to last four or five turns. The damage calculated for the first turn is used for every other turn. The user cannot select a move and the target cannot execute a move during the effect, but both may switch out. If the user switches out, the target remains unable to execute a move during that turn. If the target switches out, the user uses this move again automatically, and if it had 0 PP at the time, it becomes 63. If the user or the target switch out, or the user is prevented from moving, the effect ends. This move can prevent the target from moving even if it has type immunity, but will not deal damage.",
		shortDesc: "Prevents the target from moving for 2-5 turns.",
	},
	sugarblast: {
		num: -2,
		accuracy: 90,
		basePower: 75,
		category: "Physical",
		name: "Sugar Blast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 40,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Food",
		contestType: "Cute",
		desc: "Has a 40% chance to lower the target's Speed by 1 stage.",
		shortDesc: "40% chance to lower the target's Speed by 1.",
	},
	gammaray: {
		num: -2,
		accuracy: 100,
		basePower: 55,
		category: "Physical",
		name: "Gamma Ray",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Nuclear",
		contestType: "Cool",
		shortDesc: "No additional effect.",
	},
};
