import { ModdedMoveData } from "../../../sim/dex-moves";

export const Moves: {[k: string]: ModdedMoveData} = {
	frythrow: {
		num: 0,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Fry Throw",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
		desc: "Hits two to five times with each hit having a 10% chance to burn the target. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times. If the user is holding Loaded Dice, this move will hit 4-5 times.",
		shortDesc: "Hits 2-5 times. Each hit has 10% chance to burn.",
	},
	powerlaser: {
		num: 0,
		accuracy: true,
		basePower: 50,
		onTryHit(target, source, move) {
			if (move.hit === 2) {
				move.type = 'Fire';
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
		desc: "Hits three times. Power increases to 40 for the second hit and 60 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit three times.",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
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
	epeiusgimmick: {
		num: 0,
		accuracy: 75,
		basePower: 120,
		category: "Physical",
		name: "Epeius Gimmick",
		onHit(target, source) {
			source.addVolatile('confusion', source);
		},
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "allAdjacent",
		type: "Fighting",
		contestType: "Cool",
		shortDesc: "Confuses the user.",
	},
};