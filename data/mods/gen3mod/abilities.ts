export const Abilities: {[k: string]: ModdedAbilityData} = {
	hustle: {
		inherit: true,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			const physicalTypes = ['Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Dark', 'Dragon', 'Steel'];
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
		shortDesc: "This Pokemon's contact moves have their power multiplied by 1.2.",
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
	slushrush: {
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
			if (damage && this.checkMoveMakesContact(move, source, target, true)) {
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
		desc: "If this Pokemon is an Aegislash, it changes to Blade Forme before attempting to use an attacking move, and changes to Shield Forme before attempting to use Protect.",
		shortDesc: "If Aegislash, changes Forme to Blade before attacks and Shield before Protect.",
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			if (attacker.species.baseSpecies !== 'Aegislash' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'protect') return;
			const targetForme = (move.id === 'protect' ? 'Aegislash' : 'Aegislash-Blade');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
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
		desc: "This Pokemon is immune to powder moves, damage from Sandstorm, and the effects of Rage Powder and the Effect Spore Ability.",
		shortDesc: "This Pokemon is immune to powder moves, Sandstorm damage, Effect Spore.",
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'hail' || type === 'powder') return false;
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (move.flags['powder'] && target !== source && this.dex.getImmunity('powder', target)) {
				this.add('-immune', target, '[from] ability: Overcoat');
				return null;
			}
		},
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
	protosynthesis: {
		inherit: true,
		gen: 3,
		desc: "If Sunny Day is active or this Pokemon uses a held Booster Energy, this Pokemon's highest stat is multiplied by 1.3. Stat stage changes are considered at the time this Ability activates. If multiple stats are tied, Attack, Defense, Special Attack, Special Defense, and Speed are prioritized in that order. If this effect was started by Sunny Day, a held Booster Energy will not activate and the effect ends when Sunny Day is no longer active. If this effect was started by a held Booster Energy, it ends when this Pokemon is no longer active.",
		shortDesc: "Sunny Day active or Booster Energy used: highest stat is 1.3x.",
		onModifySpe(spe, pokemon) {
			if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
			this.debug('Protosynthesis spe boost');
			return this.chainModify([5325, 4096]);
		},
	},
	quarkdrive: {
		inherit: true,
		gen: 3,
		desc: "If Electric Terrain is active or this Pokemon uses a held Booster Energy, this Pokemon's highest stat is multiplied by 1.3. Stat stage changes are considered at the time this Ability activates. If multiple stats are tied, Attack, Defense, Special Attack, Special Defense, and Speed are prioritized in that order. If this effect was started by Electric Terrain, a held Booster Energy will not activate and the effect ends when Electric Terrain is no longer active. If this effect was started by a held Booster Energy, it ends when this Pokemon is no longer active.",
		shortDesc: "Electric Terrain active or Booster Energy used: highest stat is 1.3x.",
		onModifySpe(spe, pokemon) {
			if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
			this.debug('Protosynthesis spe boost');
			return this.chainModify([5325, 4096]);
		},
	},
	technician: {
		inherit: true,
		gen: 3,
	},
	stall: {
		inherit: true,
		gen: 3,
	},
	solidrock: {
		inherit: true,
		gen: 3,
	},
	heatproof: {
		inherit: true,
		gen: 3,
	},
	longreach: {
		inherit: true,
		gen: 3,
	},
	icebody: {
		inherit: true,
		gen: 3,
	},
	mindseye: {
		inherit: true,
		gen: 3,
	},
	illuminate: {
		inherit: true,
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			// List of moves to be boosted by Illuminate
			const boostedMoves = [
				'aurorabeam', 'bubblebeam', 'dazzlinggleam', 'eternabeam', 'flashcannon',
				'icebeam', 'lightofruin', 'lightthatburnsthesky', 'meteorbeam', 'moongeistbeam',
				'prismaticlaser', 'psybeam', 'signalbeam', 'solarbeam', 'solarblade',
				'steelbeam', 'doomdesire', 'glitzyglow', 'fleurcannon', 'lusterpurge',
				'mirrorshot', 'moonblast', 'photongeyser', 'powergem'
			];
			if (boostedMoves.includes(move.id)) {
				this.debug('Illuminate boost');
				return this.chainModify([12, 10]);
			}
		},
		rating: 2.5,
		desc: "The moves Aurora Beam, Bubble Beam, Dazzlign Gleam, Eternabeam, Flash Cannon, Ice Beam, Light Of Ruin, Light That Burns The Sky, Meteor Beam, Moongeist Beam, Primsatic Laser, Psybeam, Signal Beam, Solar Beam, Solar Blade, Steel Beam, Doom Desire, Glitzy Glow, Fleur Cannon, Luster Purge, Mirror Shot, Moonblast, Photon Geyser and Power Gem have their power multiplied by 1.2.",
		shortDesc: "Boosts some beam and light based moves by 1.2x.",
	},
	sharpness: {
		inherit: true,
		gen: 3,
	},
	filter: {
		inherit: true,
		gen: 3,
	},
	slowstart: {
		inherit: true,
		gen: 3,
	},
	reckless: {
		inherit: true,
		gen: 3,
	},
	skilllink: {
		inherit: true,
		gen: 3,
	},
	powerspot: {
		inherit: true,
		gen: 3,
		desc: "All Pokemon have the power of their moves multiplied by 1.3. This affects Doom Desire and Future Sight, even if the user is not on the field.",
		shortDesc: "All Pokemon have the power of their moves multiplied by 1.3.",
		onBasePowerPriority: 22,
		onBasePower(basePower, attacker, defender, move) {
			return this.chainModify([5325, 4096]);
		},
		onAllyBasePower(basePower, attacker, defender, move) {}
	},
	iceface: {
		inherit: true,
		gen: 3,
		desc: "If this Pokemon is an Eiscue, the first physical hit it takes in battle deals 0 neutral damage. Its ice face is then broken and it changes forme to Noice Face. Eiscue regains its Ice Face forme when Snow begins or when Eiscue switches in while Snow is active. Confusion damage also breaks the ice face.",
		shortDesc: "If Eiscue, the first physical hit it takes deals 0 damage. Effect is restored in Snow.",
	},
	arenatrap: {
		inherit: true,
		desc: "Prevents opposing Pokemon from choosing to switch out for one turn unless they are airborne, are holding a Shed Shell, or are a Ghost type.",
		shortDesc: "Prevents opposing grounded Pokemon from switching out for 1 turn.",
		onFoeTrapPokemon(pokemon) {},
		onFoeMaybeTrapPokemon(pokemon, source) {},
		onStart(pokemon) {
			for (const target of pokemon.adjacentFoes()) {
				pokemon.addVolatile('Arena Trap');
			}
		},
		condition: {
			duration: 1,
			onFoeTrapPokemon(pokemon) {
				if (!pokemon.isAdjacent(this.effectState.target)) return;
				if (pokemon.isGrounded()) {
					pokemon.tryTrap();
				}
			},
		},
	},	
	shadowtag: {
		inherit: true,
		desc: "Prevents opposing Pokemon from choosing to switch out, unless they are holding a Shed Shell, are a Ghost type, or also have this Ability.",
		shortDesc: "Prevents foes without this ability from switching for 1 turn.",
		onFoeTrapPokemon(pokemon) {},
		onFoeMaybeTrapPokemon(pokemon, source) {},
		onStart(pokemon) {
			if (!pokemon.hasAbility('shadowtag') && pokemon.isAdjacent(this.effectState.target)) {
				for (const target of pokemon.adjacentFoes()) {
					pokemon.addVolatile('Shadow Tag');
				}
			}
		},
		condition: {
			duration: 1,
			onFoeTrapPokemon(pokemon) {
				if (!pokemon.isAdjacent(this.effectState.target)) return;
				pokemon.tryTrap();
			},
		},
	},	
	tanglinghair: {
		inherit: true,
		gen: 3,
	},
	sandveil: {
		inherit: true,
		desc: "If Sandstorm is active, the defense of this Pokemon is multiplied by 1.25. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "If Sandstorm is active, this Pokemon's defense is 1.25x; immunity to Sandstorm.",
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onModifyAccuracy(accuracy) {
			return;
		},
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.25);
			}
		}
	},
	snowcloak: {
		inherit: true,
		gen: 3,
		desc: "If Snowscape is active, the defense of this Pokemon is multiplied by 1.25.",
		shortDesc: "If Snow is active, this Pokemon's defense is 1.25x.",
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onModifyAccuracy(accuracy) {
			return;
		},
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			if (this.field.isWeather('hail')) {
				return this.chainModify(1.25);
			}
		}
	},
	hypercutter: {
		inherit: true,
		shortDesc: "Prevents lowering this Pokemon's Attack stat stage.",
		onTryBoost(boost, target, source, effect) {
			if (boost.atk && boost.atk < 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Attack", "[from] ability: Hyper Cutter", "[of] " + target);
				}
			}
		},
	},
	lightningrod: {
		inherit: true,
		desc: "This Pokemon is immune to Electric-type moves and raises its Special Attack by 1 stage when hit by an Electric-type move. If this Pokemon is not the target of a single-target Electric-type move used by another Pokemon, this Pokemon redirects that move to itself if it is within the range of that move. If multiple Pokemon could redirect with this Ability, it goes to the one with the highest Speed, or in the case of a tie to the one that has had this Ability active longer.",
		shortDesc: "This Pokemon draws Electric moves to itself to raise Sp. Atk by 1; Electric immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Lightning Rod');
				}
				return null;
			}
		},
	},
	stormdrain: {
		inherit: true,
		gen: 3,
		desc: "This Pokemon is immune to Water-type moves and raises its Special Attack by 1 stage when hit by a Water-type move. If this Pokemon is not the target of a single-target Water-type move used by another Pokemon, this Pokemon redirects that move to itself if it is within the range of that move. If multiple Pokemon could redirect with this Ability, it goes to the one with the highest Speed, or in the case of a tie to the one that has had this Ability active longer.",
		shortDesc: "This Pokemon draws Water moves to itself to raise Sp. Atk by 1; Water immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Storm Drain');
				}
				return null;
			}
		},
	},
	rivalry: {
		inherit: true,
		gen: 3,
		desc: "This Pokemon's attacks have their power multiplied by 1.25 against targets of the same gender. There is no modifier if either this Pokemon or the target is genderless.",
		shortDesc: "This Pokemon's attacks do 1.25x on same gender targets.",
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.gender && defender.gender) {
				if (attacker.gender === defender.gender) {
					this.debug('Rivalry boost');
					return this.chainModify(1.25);
				}
			}
		},
	},
	magicguard: {
		inherit: true,
		gen: 3,
	},
	effectspore: {
		inherit: true,
		desc: "30% chance a Pokemon making contact with this Pokemon will be poisoned, paralyzed, or fall asleep. This effect does not happen if this Pokemon did not lose HP from the attack.",
		shortDesc: "30% chance of poison/paralysis/sleep on others making contact with this Pokemon.",
		onDamagingHit(damage, target, source, move) {
			if (damage && this.checkMoveMakesContact(move, source, target) && !source.status && source.runStatusImmunity('powder')) {
				const r = this.random(100);
				if (r < 10) {
					source.setStatus('slp', target);
				} else if (r < 20) {
					source.setStatus('par', target);
				} else if (r < 30) {
					source.setStatus('psn', target);
				}
			}
		},
	},
	merciless: {
		inherit: true,
		gen: 3,
	},
	noguard: {
		inherit: true,
		gen: 3,
	},
	windrider: {
		inherit: true,
		gen: 3,
	},
	plus: {
		inherit: true,
		shortDesc: "This Pokemon's Special Attack is 1.5x.",
		onModifySpA(spa, pokemon) {
			return this.chainModify(1.5);
		},
	},
	minus: {
		inherit: true,
		shortDesc: "This Pokemon's Special Defense is 1.5x.",
		onModifySpA(spa, pokemon) {
			return;
		},
		onModifySpDPriority: 5,
		onModifySpD(spa, pokemon) {
			return this.chainModify(1.5);
		},
	},
	tintedlens: {
		inherit: true,
		gen: 3,
	},

	// -ate abilities

	galvanize: {
		inherit: true,
		gen: 3,
		desc: "This Pokemon's Normal-type moves become Electric-type moves. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Electric type.",
		onModifyMove(move) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id)){
				move.type = 'Electric';
				move.category = 'Special';
			}
		},
		onBasePower(basePower, pokemon, target, move) {},
	},
	pixilate: {
		inherit: true,
		gen: 3,
		desc: "This Pokemon's Normal-type moves become Fairy-type moves. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Fairy type.",
		onModifyMove(move) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id)){
				move.type = 'Fairy';
				move.category = 'Special';
			}
		},
		onBasePower(basePower, pokemon, target, move) {},
	},
	refrigerate: {
		inherit: true,
		gen: 3,
		desc: "This Pokemon's Normal-type moves become Ice-type moves. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Ice type.",
		onModifyMove(move) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id)){
				move.type = 'Ice';
				move.category = 'Special';
			}
		},
		onBasePower(basePower, pokemon, target, move) {},
	},
	aerilate: {
		inherit: true,
		gen: 3,
		desc: "This Pokemon's Normal-type moves become Flying-type moves. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Flying type.",
		onModifyMove(move) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id)){
				move.type = 'Flying';
			}
		},
		onBasePower(basePower, pokemon, target, move) {},
	},
	immolate: {
		inherit: true,
		gen: 3,
		desc: "This Pokemon's Normal-type moves become Fire-type moves. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Fire type.",
		onModifyMove(move) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id)){
				move.type = 'Fire';
				move.category = 'Special';
			}
		},
		onBasePower(basePower, pokemon, target, move) {},
	},
	drench: {
		inherit: true,
		gen: 3,
		desc: "This Pokemon's Normal-type moves become Water-type moves. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Water type.",
		onModifyMove(move) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id)){
				move.type = 'Water';
				move.category = 'Special';
			}
		},
		onBasePower(basePower, pokemon, target, move) {},
	},

	// custom abilities
	
	pixieveil: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	heartveil: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	adrenaline: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	executioner: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	chrysalis: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	cleanser: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	stonebreaker: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	steelbreaker: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	deadwood: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	superhero: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	vanguard: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	piercing: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	nightfall: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	miracleguard: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
};
