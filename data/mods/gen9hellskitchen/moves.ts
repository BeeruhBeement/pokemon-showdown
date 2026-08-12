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

	
	auroraveil: {
		inherit: true,
		onTry() {
			return this.field.isWeather(['hail', 'snowscape', 'hyperboreanstorm']);
		},
	},
	blizzard: {
		inherit: true,
		onModifyMove(move) {
			if (this.field.isWeather(['hail', 'snowscape', 'hyperboreanstorm'])) move.accuracy = true;
		},
	},
	dig: {
		inherit: true,
		condition: {
			inherit: true,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'aridwasteland' || type === 'hail') return false;
			},
		},
	},
	dive: {
		inherit: true,
		condition: {
			inherit: true,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'aridwasteland' || type === 'hail') return false;
			},
		},
	},
	moonlight: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather(undefined, true)) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'aridwasteland':
			case 'hail':
			case 'snowscape':
			case 'hyperboreanstorm':
				factor = 0.25;
				break;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	morningsun: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather(undefined, true)) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'aridwasteland':
			case 'hail':
			case 'snowscape':
			case 'hyperboreanstorm':
				factor = 0.25;
				break;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	shoreup: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			if (this.field.isWeather('sandstorm') || this.field.isWeather('aridwasteland')) {
				factor = 0.667;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	solarbeam: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			const weakWeathers = ['raindance', 'primordialsea', 'sandstorm', 'aridwasteland', 'hail', 'snowscape', 'hyperboreanstorm'];
			if (weakWeathers.includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},
	solarblade: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			const weakWeathers = ['raindance', 'primordialsea', 'sandstorm', 'aridwasteland', 'hail', 'snowscape', 'hyperboreanstorm'];
			if (weakWeathers.includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},
	synthesis: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather(undefined, true)) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'aridwasteland':
			case 'hail':
			case 'snowscape':
			case 'hyperboreanstorm':
				factor = 0.25;
				break;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	weatherball: {
		inherit: true,
		onModifyType(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Water';
				break;
			case 'sandstorm':
			case 'aridwasteland':
				move.type = 'Rock';
				break;
			case 'hail':
			case 'snowscape':
			case 'hyperboreanstorm':
				move.type = 'Ice';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.basePower *= 2;
				break;
			case 'raindance':
			case 'primordialsea':
				move.basePower *= 2;
				break;
			case 'sandstorm':
			case 'aridwasteland':
				move.basePower *= 2;
				break;
			case 'hail':
			case 'snowscape':
			case 'hyperboreanstorm':
				move.basePower *= 2;
				break;
			}
			this.debug(`BP: ${move.basePower}`);
		},
	},
};
