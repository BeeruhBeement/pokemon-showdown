import { ModdedMoveData } from "../../../sim/dex-moves";

export const Moves: {[k: string]: ModdedMoveData} = {
	radiantburst: {
		num: 0,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Radiant Burst",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dark') return 1;
		},
		secondary: {},
		target: "normal",
		type: "Electric",
		contestType: "Beautiful",
		desc: "This move's type effectiveness against Dark is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Dark.",
	},
	toxicdrain: {
		num: 0,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Toxic Drain",
		pp: 15,
		priority: 0,
		flags: { bite: 1, contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1 },
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Clever",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
	},
	frighttrain: {
		num: 0,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Fright Train",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		desc: "If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 33% recoil.",
	},
	venomousroar: {
		num: 0,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Venomous Roar",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1, bypasssub: 1},
		secondary: {
			chance: 20,
			status: 'psn',
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		desc: "Has a 30% chance to poison the target.",
		shortDesc: "30% chance to poison the target.",
	},
	powerdown: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Power Down",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, heal: 1, metronome: 1 },
		onHit(pokemon) {
			let factor = 0.5;
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (pokemon.types.includes('Steel')) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Steel" ? "Electric" : "Electric"));
				this.add('-start', pokemon, 'typechange', pokemon.getTypes().join('/'), '[from] move: Power Down');
			}
			return success;
		},
		secondary: null,
		target: "self",
		type: "Ground",
		zMove: { effect: 'clearnegativeboost' },
		contestType: "Beautiful",
	},
	suddenstrike: {
		num: 0,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Sudden Strike",
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
		pp: 30,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	flockshock: {
		num: 0,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Flock Shock",
		pp: 10,
		priority: 0,
		flags: { allyanim: 1, metronome: 1, futuremove: 1 },
		ignoreImmunity: false,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'flockshock',
				source,
				moveData: {
					id: 'flockshock',
					name: "Flock Shock",
					accuracy: 100,
					basePower: 75,
					category: "Special",
					priority: 0,
					flags: { allyanim: 1, metronome: 1, futuremove: 1 },
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Electric',
				},
			});
			this.add('-start', source, 'move: Flock Shock');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
		shortDesc: "Electric version hits again two turns after being used.",
	},

	// MIA
	spiritsiphon: {
		num: 0,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Spirit Siphon",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1, metronome: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	cometstrike: {
		num: 0,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Comet Strike",
		desc: "Lowers the user's Special Attack by 2 stages. This move's power is x1.3 in gravity",
		shortDesc: "Lowers the user's Sp. Atk by 2. x1.3 power in gravity.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onBasePower(basePower) {
			if (this.field.getPseudoWeather('gravity')) {
				return this.chainModify(1.3);
			}
		},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
	},
	shockbombs: {
		num: 0,
		accuracy: 95,
		basePower: 25,
		category: "Physical",
		name: "Shock Bombs",
		desc: "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Electric",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	boulderbash: {
		num: 0,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Boulder Bash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Rock",
		zMove: {basePower: 140},
		maxMove: {basePower: 120},
		contestType: "Cool",
		shortDesc: "Hits twice.",
	},
	vengefulpulse: {
		num: 0,
		accuracy: 100,
		basePower: 70,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.status && pokemon.status !== 'slp') {
				this.debug('BP boost from status condition');
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		onTryHit(target, source, move) {
			if (source.status && source.status !== 'slp') move.status = source.status;
		},
		self: {
			onHit(pokemon) {
				if (pokemon.status !== 'slp') {
					pokemon.cureStatus();
				}
			},
		},
		category: "Special",
		name: "Vengeful Pulse",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMove: {basePower: 160},
		contestType: "Clever",
		shortDesc: "1.5x power if user is burn/poison/paralyzed. Transfers status.",
	},
	heavycleave: {
		num: 0,
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		name: "Heavy Cleave",
		pp: 10,
		priority: 0,
		flags: {protect: 1, contact: 1, mirror: 1, metronome: 1, slicing: 1},
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Steel",
		shortDesc: "20% chance to lower foe(s) Defense by 1 stage.",
	},
	throwingknives: {
		num: 0,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Throwing Knives",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Steel",
		shortDesc: "Hits 2-5 times.",
	},
	pheroblast: {
		num: 0,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Pheroblast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Beautiful",
		shortDesc: "Lowers user's Sp.Atk by 2 stages after use.",
	},
	meltdown: {
		num: 0,
		accuracy: 100,
		basePower: 180,
		category: "Special",
		name: "Meltdown",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, noparentalbond: 1},
		onBasePower(basePower, source) {
			if (this.field.isWeather('fallout')) {
				this.debug('fallout boost');
				return this.chainModify(1.5);
			}
		},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Fire",
		contestType: "Beautiful",
		shortDesc: "User faints. 1.5x power during Fallout.",
	},

	haze: {
		inherit: true,
		onHitField() {
			const allNoManagel = this.getAllActive().every(pokemon => !pokemon.hasItem('managel'));
			if (allNoManagel) {
				this.add('-clearallboost');
				for (const pokemon of this.getAllActive()) {
					pokemon.clearBoosts();
				}
			} else {
				for (const pokemon of this.getAllActive()) {
					if (!pokemon.hasItem('managel')) {
						pokemon.clearBoosts();
						this.add('-clearboost', pokemon);
					}
				}
			}
		},
	},
	freezyfrost: {
		inherit: true,
		onHit() {
			const allNoManagel = this.getAllActive().every(pokemon => !pokemon.hasItem('managel'));
			if (allNoManagel) {
				this.add('-clearallboost');
				for (const pokemon of this.getAllActive()) {
					pokemon.clearBoosts();
				}
			} else {
				for (const pokemon of this.getAllActive()) {
					if (!pokemon.hasItem('managel')) {
						pokemon.clearBoosts();
						this.add('-clearboost', pokemon);
					}
				}
			}
		},
	},
	clearsmog: {
		inherit: true,
		onHit(target) {
			if (!target.hasItem('managel')) {
				target.clearBoosts();
				this.add('-clearboost', target);
			}
		},
	},
};