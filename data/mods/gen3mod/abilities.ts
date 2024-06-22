export const Abilities: {[k: string]: ModdedAbilityData} = {
	hustle: {
		inherit: true,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			const physicalTypes = ['Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Fairy'];
			if (physicalTypes.includes(move.type) && typeof accuracy === 'number') {
				return this.chainModify([3277, 4096]);
			}
		},
	},
	toughclaws: {
		inherit: true,
		gen: 3,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([12, 10]);
			}
		},
		shortDesc: "This Pokemon's contact moves have their power multiplied by 1.1.",
	},
	sapsipper: {
		inherit: true,
		gen: 3,
	},
	strongjaw: {
		inherit: true,
		gen: 3,
		shortDesc: "This Pokemon's bite-based attacks have 1.5x power.",
	},
	sturdy: {
		inherit: true,
		onTryHit(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Sturdy');
				return null;
			}
		},
		onDamagePriority: -30,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Sturdy');
				return target.hp - 1;
			}
		},
		desc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. OHKO moves fail when used against this Pokemon.",
		shortDesc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.",
	},
	ironfist: {
		inherit: true,
		gen: 3,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Iron Fist boost');
				return this.chainModify([13, 10]);
			}
		},
		desc: "This Pokemon's punch-based attacks have their power multiplied by 1.3.",
		shortDesc: "This Pokemon's punch-based attacks have 1.3x power. Sucker Punch is not boosted.",
	},
	moldbreaker: {
		inherit: true,
		gen: 3,
	},
	sandrush: {
		inherit: true,
		gen: 3,
	},
	infiltrator: {
		inherit: true,
		gen: 3,
		onModifyMove(move) {
			move.infiltrates = true;
		},
	},
	roughskin: {
		inherit: true,
		desc: "Pokemon making contact with this Pokemon lose 1/8 of their maximum HP, rounded down. This effect does not happen if this Pokemon did not lose HP from the attack.",
		shortDesc: "Pokemon making contact with this Pokemon lose 1/8 of their max HP.",
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
	},
	eartheater: {
		inherit: true,
		gen: 3,
	},
	aftermath: {
		inherit: true,
		gen: 3,
	},
	snowwarning: {
		inherit: true,
		gen:3,
		onStart(source) {
			this.field.setWeather('snow');
		},
	},
	stancechange: {
		gen: 3,
		desc: "If this Pokemon is an Aegislash, it changes to Blade Forme before attempting to use Swords Dance, and changes to Shield Forme before attempting to use Protect.",
		shortDesc: "If Aegislash, changes Forme to Blade before Swords Dance and Shield before Protect.",
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			if (attacker.species.baseSpecies !== 'Aegislash' || attacker.transformed || (move.id !== 'swordsdance' && move.id !== 'protect')) return;
			if (move.id === 'swordsdance' && attacker.species.name !== 'Aegislash-Blade') {
				attacker.formeChange('Aegislash-Blade');
			}
			if (move.id === 'protect' && attacker.species.name !== 'Aegislash') {
				attacker.formeChange('Aegislash');
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Stance Change",
		rating: 4,
		num: 176,
	},
	quickdraw: {
		inherit: true,
		gen:3,
	},
	colorchange: {
		desc: "On switch-in, this Pokemon's type changes to match the type of an adjacent foe.",
		shortDesc: "On switch-in, this Pokemon's type changes to match an adjacent foe's type.",
		onSwitchIn(pokemon) {
			const possibleTargets = pokemon.adjacentFoes();
			if (!possibleTargets.length) return;
	
			const target = this.sample(possibleTargets);
			const targetTypes = target.getTypes();
			if (pokemon.setType(targetTypes)) {
				this.add('-start', pokemon, 'typechange', targetTypes.join('/'), '[from] ability: Color Change', '[of] ' + pokemon);
			}
		},
		flags: {},
		name: "Color Change",
		rating: 2,
		num: 16,
	},
	rockypayload: {
		inherit: true,
		gen: 3,
	},
	weakarmor: {
		inherit: true,
		gen: 3,
	},
	beastboost: {
		inherit: true,
		gen: 3,
	},
	electricsurge: {
		inherit: true,
		gen: 3,
	},
	grassysurge: {
		inherit: true,
		gen: 3,
	},
	psychicsurge: {
		inherit: true,
		gen: 3,
	},
	mistysurge: {
		inherit: true,
		gen: 3,
	},
	forecast: {
		inherit: true,
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Castform' || pokemon.transformed) return;
			let forme = null;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				if (pokemon.species.id !== 'castformsunny') forme = 'Castform-Sunny';
				break;
			case 'raindance':
			case 'primordialsea':
				if (pokemon.species.id !== 'castformrainy') forme = 'Castform-Rainy';
				break;
			case 'hail':
			case 'snow':
				if (pokemon.species.id !== 'castformsnowy') forme = 'Castform-Snowy';
				break;
			case 'sandstorm':
				if (pokemon.species.id !== 'castformsandy') forme = 'Castform-Sandy';
				break;
			default:
				if (pokemon.species.id !== 'castform') forme = 'Castform';
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme, this.effect, false, '[msg]');
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1},
		name: "Forecast",
		rating: 2,
		num: 59,
	},
	dryskin: {
		inherit: true,
		gen: 3,
	},
	solarpower: {
		inherit: true,
		gen: 3,
	},
	regenerator: {
		inherit: true,
		gen: 3,
		shortDesc: "This Pokemon restores 1/4 of its maximum HP, rounded down, when it switches out.",
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 4);
		},
	},
	overcoat: {
		inherit: true,
		gen: 3,
	},
	bulletproof: {
		inherit: true,
		gen: 3,
	},
	gluttony: {
		inherit: true,
		gen: 3,
	},
	wellbakedbody: {
		inherit: true,
		gen: 3,
		desc: "This Pokemon is immune to Fire-type moves and raises its Defense by 1 stage when hit by a Fire-type move.",
		shortDesc: "This Pokemon's Defense is raised 1 stage if hit by a Fire move; Fire immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({def: 1})) {
					this.add('-immune', target, '[from] ability: Well-Baked Body');
				}
				return null;
			}
		},
	},
};
