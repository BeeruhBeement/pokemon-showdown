export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	volttackle: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.baseSpecies.name === "Raichu-Mega-X") {
				move.self = { boosts: { atk: 1 } };
			}
		},
	},
	darkvoid: {
		inherit: true,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, nosketch: 1 },
		drain: [1, 2],
		target: "normal",
		status: "",
		desc: "User recovers 50% of damage dealt, doubled power on sleeping foes.",
		shortDesc: "User recovers 50% of damage dealt, doubled power on sleeping foes.",
	},
	
	"10000000voltthunderbolt": {
		inherit: true,
		onTry(source, target, move) {
			if ((source.species.name === 'Pikachu' || source.baseSpecies.name === "Pikachu-Mega")|| move.hasBounced) {
				return;
			}
			this.add('-fail', source, 'move: 10,000,000 Volt Thunderbolt');
			this.hint("Only a Pokemon whose form is Pikachu can use this move.");
			return null;
		},
		isZ: false,
		noPPBoosts: true,
	},
	extremeevoboost: {
		inherit: true,
		onTry(source, target, move) {
			if ((source.species.name === 'Eevee' || source.baseSpecies.name === "Eevee-Mega") || move.hasBounced) {
				return;
			}
			this.add('-fail', source, 'move: Extreme Evoboost');
			this.hint("Only a Pokemon whose form is Eevee can use this move.");
			return null;
		},
		isZ: false,
		noPPBoosts: true,
	},
	armthrust: {
		inherit: true,
		basePower: 25,
	},
	geargrind: {
		inherit: true,
		basePower: 60,
		accuracy: 90,
	},
	shadowclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	dragonclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	direclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	metalclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	crushclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	axekick: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, kicking: 1 },
	},
	blazekick: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, kicking: 1 },
	},
	doublekick: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, kicking: 1 },
	},
	highjumpkick: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, kicking: 1 },
	},
	lowkick: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, kicking: 1 },
	},
	megakick: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, kicking: 1 },
	},
	rollingkick: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, kicking: 1 },
	},
	thunderouskick: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, kicking: 1 },
	},
	triplekick: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, kicking: 1 },
	},
	tripleaxel: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, kicking: 1 },
	},
	tropkick: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, kicking: 1 },
	},
	jumpkick: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, kicking: 1 },
	},
	dreameater: {
		inherit: true,
		onTryImmunity(target, source) {
			for (const poke of this.getAllActive()) {
				if (poke.hasAbility('sweetdreams')) return true;
			}
			return target.status === 'slp' || target.hasAbility('comatose');
		},
	},
	hex: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) {
				this.debug('BP doubled from status condition');
				return move.basePower * 2;
			}
			for (const poke of this.getAllActive()) {
				if (poke.hasAbility('sweetdreams')) return move.basePower * 2;
			}
			return move.basePower;
		},
	},
	infernalparade: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			for (const poke of this.getAllActive()) {
				if (poke.hasAbility('sweetdreams')) return move.basePower * 2;
			}
			return move.basePower;
		},
	},
	nightmare: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon, source) {
				for (const poke of this.getAllActive()) {
					if (poke.hasAbility('sweetdreams')) return true;
				}
				if (pokemon.status !== 'slp' && !pokemon.hasAbility('comatose')) {
					return false;
				}
				this.add('-start', pokemon, 'Nightmare');
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
	},
	rest: {
		inherit: true,
		onTry(source) {
			if (source.status === 'slp' || source.hasAbility('comatose')) return false;
			for (const poke of this.getAllActive()) {
				if (poke.hasAbility('sweetdreams')) return false;
			}
			if (source.hp === source.maxhp) {
				this.add('-fail', source, 'heal');
				return null;
			}
			// insomnia and vital spirit checks are separate so that the message is accurate in multi-ability mods
			if (source.hasAbility('insomnia')) {
				this.add('-fail', source, '[from] ability: Insomnia', `[of] ${source}`);
				return null;
			}
			if (source.hasAbility('vitalspirit')) {
				this.add('-fail', source, '[from] ability: Vital Spirit', `[of] ${source}`);
				return null;
			}
		},
	},
	sleeptalk: {
		inherit: true,
		onTry(source) {
			for (const poke of this.getAllActive()) {
				if (poke.hasAbility('sweetdreams')) return true;
			}
			return source.status === 'slp' || source.hasAbility('comatose');
		},
	},
	snore: {
		inherit: true,
		onTry(source) {
			for (const poke of this.getAllActive()) {
				if (poke.hasAbility('sweetdreams')) return true;
			}
			return source.status === 'slp' || source.hasAbility('comatose');
		},
	},
	wakeupslap: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose')) {
				this.debug('BP doubled on sleeping target');
				return move.basePower * 2;
			}
			for (const poke of this.getAllActive()) {
				if (poke.hasAbility('sweetdreams')) return move.basePower * 2;
			}
			return move.basePower;
		},
	},
	calcitecrunch: {
		num: 0,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Calcite Crunch",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1 },
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Defense by 1.",
	},
	brutalbash: {
		num: 0,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Brutal Bash",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		recoil: [1, 4],
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "Has 1/4 recoil.",
	},
	vexingvolley: {
		num: 0,
		accuracy: 100,
		basePower: 25,
		category: "Special",
		name: "Vexing Volley",
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		multihit: [2, 5],
		selfBoost: {
			boosts: {
				spd: -1,
				spe: 1,
			},
		},
		target: "normal",
		type: "Psychic",
		zMove: { basePower: 140 },
		maxMove: { basePower: 130 },
		shortDesc: "Hits 2-5 times. User: -1 Sp. Def, +1 Spe after last hit.",
	},
};
