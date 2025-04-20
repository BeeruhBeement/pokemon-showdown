import { ModdedMoveData } from "../../../sim/dex-moves";

export const Moves: {[k: string]: ModdedMoveData} = {
	frythrow: {
		num: 0,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Fry Throw",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Cool",
		desc: "Hits two to five times with each hit having a 10% chance to burn the target. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times. If the user is holding Loaded Dice, this move will hit 4-5 times.",
		shortDesc: "Hits 2-5 times. Each hit has 10% chance to burn.",
	},
	powerlaser: {
		num: 0,
		accuracy: true,
		basePower: 50,
		onModifyType(move, pokemon) {
			switch (move.hit) {
				case 1: move.type = 'Ice'; break;
				case 2: move.type = 'Fire'; break;	
			}
		},
		category: "Special",
		name: "Power Laser",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Cool",
		desc: "Hits twice, the first hit is Ice-type and the second hit is Fire-type. If the first hit breaks the target's substitute, it will take damage for the second hit. This move does not check accuracy.",
		shortDesc: "Hits twice. 1st hit: Ice, 2nd: Fire. Can't miss.",
	},
	guardianbarrage: {
		num: 0,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		name: "Guardian Barrage",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
	plasticblaze: {
		num: 0,
		accuracy: 100,
		basePower: 70,
		onEffectiveness(typeMod, target, type, move) {
			if (type === 'Steel') return 1;
			if (type === 'Water') return 2;
		},
		category: "Special",
		name: "Plastic Blaze",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
		desc: "This move's type effectiveness against Steel is changed to be super effective no matter what this move's type is. This move's type effectiveness against Water is changed to be resisted no matter what this move's type is.",
		shortDesc: "Super effective on Steel. Resisted by Water.",
	},
};