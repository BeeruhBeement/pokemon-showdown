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