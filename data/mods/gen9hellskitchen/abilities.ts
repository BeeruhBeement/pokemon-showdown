import { ModdedAbilityData } from "../../../sim/dex-abilities";

export const Abilities: {[k: string]: ModdedAbilityData} = {
	galewings: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.type === 'Flying') return priority + 1;
		},
		shortDesc: "This Pokemon's Flying-type moves have their priority increased by 1.",
		rating: 4,
	},
	
	solarborne: {
		name: "Solarborne",
		num: 0,
	},
	perfectorganism: {
		onSwitchIn(pokemon) {
			this.boost({spa: 1}, pokemon);
		},
		flags: {},
		name: "Perfect Organism",
		shortDesc: "+1 Sp. Atk on switch-in.",
		num: 0,
	},
	dimensionaltwist: {
		onStart(pokemon) {
			this.field.addPseudoWeather('trickroom');
		},
		flags: {},
		name: "Dimensional Twist",
		shortDesc: "Sets Trick Room on entry.",
		num: 0,
	},
	arborealapathy: {
		onResidual(target, source, effect) {
			this.heal(target.baseMaxhp / 16);
		},
		flags: {},
		name: "Arboreal Apathy",
		shortDesc: "Heals 1/16th HP every turn.",
		num: 0,
	},
	newtonzone: {
		onStart(pokemon) {
			this.field.addPseudoWeather('gravity');
		},
		flags: {},
		name: "Newton Zone",
		shortDesc: "Sets Gravity on entry.",
		num: 0,
	},
	ubercharge: {
		// airborneness implemented in sim/pokemon.js:Pokemon#isGrounded
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(1.5);
		},
		flags: { breakable: 1 },
		name: "Ubercharge",
		shortDesc: "This Pokemon floats and has 1.5x Sp. Atk.",
		num: 0,
	},	
	megabuster: {
		gen: 9,
		shortDesc: "This Pokemon's attacks deal 2x damage to Mega-Evolved Pokemon.",
		onBasePowerPriority: 24,
		onBasePower(basePower, attacker, defender, move) {
			if (defender.species.isMega) {
				this.debug('Rivalry boost');
				return this.chainModify(2);
			}
		},
		name: "Mega Buster",
		num: 0,
	},
	eternalyouth: {
		onResidual(pokemon) {
			if (!this.effectState.count) this.effectState.count = 0;
			this.effectState.count++;
			if (this.effectState.count === 3) {
				this.effectState.count = 0;
				this.heal(pokemon.baseMaxhp*0.75);
			}
		},
		flags: {},
		name: "Eternal Youth",
		shortDesc: "Every 3 turns, this Pokemon automatically recovers 75% of its max HP.",
		num: 0,
	},
	searingcleats: {
		onDamage(damage, target, source, effect) {
			if (effect && ['stealthrock', 'spikes', 'gmaxsteelsurge'].includes(effect.id)) {
				return false;
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (effect && effect.id !== 'stickyweb') return;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
				}
			}
		},
		onSetStatus(status, target, source, effect) {
			if (effect && ['toxicspikes'].includes(effect.id)) {
				return false;
			}
		},
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (move.flags.kicking) {
				if (this.randomChance(3, 10)) {
					target.trySetStatus('brn', source);
				}
			}
		},
		flags: {},
		name: "Searing Cleats",
		shortDesc: "This Pokemon is immune to Entry Hazards. 20% burn chance with kicking moves.",
		num: 0,
	},
	highground: {
		onModifyMove(move) {
			if (!move.flags['contact']) {
				delete move.flags['protect'];
				move.infiltrates = true;
			}
		},
		flags: {},
		name: "High Ground",
		shortDesc: "This Pokemon's non-contact moves ignore the target's protection, screens, and substitute.",
		num: 0,
	},
	skyspacescraper: {
		onAfterTerastallization(pokemon) {
			if (this.field.weather) {
				this.add('-ability', pokemon, 'Skyspace Scraper');
				this.field.clearWeather();
			}
		},
		flags: {},
		name: "Skyspace Scraper",
		shortDesc: "Ends the effects of weather upon entry.",
		num: 0,
	},
	acierate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && (!noModifyType.includes(move.id) || this.activeMove?.isMax) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Steel';
				move.typeChangerBoosted = this.effect;
			}
		},
		flags: {},
		name: "Acierate",
		shortDesc: "Levitates and user's Normal-type moves become Steel-type.",
		num: 0,
	},
	mach10: {
		onStart(pokemon) {
			this.field.addPseudoWeather('tailwind');
		},
		flags: {},
		name: "Mach 10",
		shortDesc: "Sets Tailwind on entry.",
		num: 0,
	},
	meltingpoint: {
		onDamagingHit(damage, target, source, move) {
			if (!this.checkMoveMakesContact(move, source, target) || source.volatiles['meltingpoint']) return;
			this.add('-ability', target, 'Melting Point');
			source.addVolatile('meltingpoint', source);
			(source.volatiles['meltingpoint'] as any).turns = 3;
		},
		onResidual(pokemon) {
			for (const opp of pokemon.adjacentFoes()) {
				if (!opp.volatiles['meltingpoint']) continue;
				opp.volatiles['meltingpoint'].turns--;
				if (opp.volatiles['meltingpoint'].turns === 0) {
					opp.removeVolatile('meltingpoint');
					opp.trySetStatus('brn', pokemon);
				}
			}
		},
		flags: {},
		name: "Melting Point",
		shortDesc: "Making contact with this Pokemon starts a 3-turn counter, at the end of this counter the opposing Pokemon is burned. Switching out resets this counter.",
		num: 0,
	},
	fearfactor: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Fear Factor', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({ spa: -1 }, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "Fear Factor",
		shortDesc: "On switch-in, this Pokemon lowers the Special Attack of opponents by 1 stage.",
		num: 0,
	},
	megazord: {
		onPrepareHit(source, target, move) {
			if (move.category != 'Physical' || move.multihit || move.flags['noparentalbond'] || move.flags['charge'] ||
				move.flags['futuremove'] || move.spreadHit || move.isZ || move.isMax) return;
			move.multihit = 6;
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.category === 'Physical') return this.chainModify(0.2);
		},
		onModifyMove(move, pokemon, target) {
			this.effectState.move = {...move};

			delete move.secondaries;
			delete move.secondary;
			delete move.self?.boosts;
			
			if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
		},
		onSourceDamagingHit(damage, target, pokemon, move) {
			if (move.multihit && typeof(move.multihit) === 'number' && Math.floor(move.multihit - 1) === move.hit) {
				move = {...this.effectState.move};
			}
		},
		flags: {},
		name: "Megazord",
		rating: 4.5,
		num: 185,
		shortDesc: "Physical moves hit 6 times at 0.2x power."
	},
	piercingdrill: {
		inherit: true,
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		isNonstandard: null,
		shortDesc: "Contact moves ignore target's protection and deal 1/4 damage. Ignores abilities.",
	},
	criminalmind: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fairy') {
				if (!this.boost({ atk: 1 })) {
					this.add('-immune', target, '[from] ability: Criminal Mind');
				}
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Criminal Mind",
		rating: 3,
		num: 0,
		shortDesc: "Fairy immunity; +1 Atk if hit by Fairy-type move.",
	},
	dunetune: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound'] && !pokemon.volatiles['dynamax']) { // hardcode
				move.type = 'Ground';
			}
		},
		flags: {},
		name: "Dune Tune",
		rating: 1.5,
		num: 0,
		shortDesc: "This Pokemon's sound-based moves become Ground type.",
	},
	freakyfunhouse: {
		onStart(source) {
			if (!this.field.pseudoWeather.gravity) {
				this.add('-activate', source, 'ability: Freaky Funhouse');
				this.field.addPseudoWeather('magicroom');
			} 
				
		},
		flags: {},
		name: "Freaky Funhouse",
		rating: 4.5,
		num: 0,
		shortDesc: "On Switch-in, this Pokemon summons Magic Room.",
	},
	fullsteamahead: {
		onDamagingHit(damage, target, source, move) {
			if (['Water', 'Fire'].includes(move.type)) {
				this.boost({ spe: 6, atk: 2, spa: 2 });
			}
		},
		flags: {},
		name: "Full Steam Ahead",
		rating: 2,
		num: 0,
		shortDesc: "+2 Atk, +2 Sp. Aatk, +6 Speed after it is damaged by Fire/Water moves.",
	},
	genomeflux: {
		onUpdate(pokemon) {
			if (pokemon.transformed && !this.effectState.transformed) {
				this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, pokemon);
				this.effectState.transformed = true;
			}
		},
		flags: {},
		name: "Genome Flux",
		rating: 2,
		num: 0,
		shortDesc: "Omniboost on transform.",
	},
	instanttransmission: {
		onModifyMove(move, pokemon, target) {
			if (move.id === 'aurasphere') move.selfSwitch = true;
		},
		flags: {},
		name: "Instant Transmission",
		rating: 2,
		num: 0,
		shortDesc: "Switches out after hitting with Aura Sphere.",
	},
	lunchrush: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Dragon' && pokemon.hp >= pokemon.maxhp / 2) return priority + 1;
		},
		flags: {},
		name: "Lunch Rush",
		rating: 2,
		num: 0,
		shortDesc: "+1 priority on Dragon-type moves when above 50% max HP.",
	},
	metalmorphosis: {
		onTryMovePriority: -2,
		onTryMove(pokemon, target, move) {
			if (move.id === 'stealthrock') {
				for (const side of pokemon.side.foeSidesWithConditions()) {
					side.addSideCondition('gmaxsteelsurge');
				}
				return null;
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball', 'laserpulse',
			];
			if (move.type === 'Rock' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Steel';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Metalmorphosis",
		desc: "This Pokemon's Rock-type moves become Steel-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type. Stealth Rock sets a Steelsurge instead.",
		shortDesc: "This Pokemon's Rock-type moves become Steel type and have 1.2x power.",
		rating: 4,
		num: 0,
	},
	mikumikubeam: {
		onAfterMove(pokemon, target, move) {
			if (pokemon.volatiles["mustrecharge"]) {
				pokemon.removeVolatile("mustrecharge");
				this.add("cant", pokemon, "recharge");
				return;
			}
		},
		flags: {},
		name: "Miku Miku Beam",
		shortDesc: "Does not have to recharge after using a recharge move.",
		rating: 3,
		num: 0,
	},
	morotezuki: {
		onModifyMovePriority: 1,
		onModifyMove(move, pokemon, target) {
			if (move.flags.punch) {
				move.multihit = 2;
				delete move.flags['contact'];
			}
		},
		onBasePower(basePower, source, target, move) {
			if (move.flags.punch) return this.chainModify(0.5);
		},
		flags: {},
		name: "Morote-Zuki",
		shortDesc: "Punching moves hit twice at 50% power and no contact.",
		rating: 3,
		num: 0,
	},
	prophet: {
		onAfterMove(source, target, move) {
			if (!move.flags.futuremove) return;
			if (target.side.slotConditions[target.position]?.['futuremove']) {
				let moveData = target.side.slotConditions[target.position]['futuremove'].moveData
				moveData = {
					...moveData,
					basePower: moveData.basePower*1.3
				};
				target.side.slotConditions[target.position]['futuremove'].moveData = moveData;
			}
		},
		flags: {},
		name: "Prophet",
		rating: 3.5,
		num: 0,
		shortDesc: "User's future moves have 1.3x power.",
	},
	rainbowshift: {
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Hue Shift');
			}
		},
		onSwitchIn() {},
		flags: {},
		name: "Rainbow Shift",
		desc: "This Pokemon's type changes to match the type of the move it is about to use. This effect comes after all effects that change a move's type.",
		shortDesc: "This Pokemon's type changes to match the type of the move it is about to use.",
		rating: 4,
		num: 0,
	},
	searingsolvent: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Poison'] = true;
			}
		},
		onEffectiveness(typeMod, target, type, move) {
			if (type === 'Steel' && move.type === 'Poison') return 1;
		},
		flags: { breakable: 1 },
		name: "Searing Solvent",
		shortDesc: "Poison-type moves hit Steel for supereffective.",
		rating: 5,
		num: 0,
	},
	splinterarmor: {
		onDamagingHit(damage, target, source, move) {
			const side = source.isAlly(target) ? source.side.foe : source.side;
			const spikes = side.sideConditions['spikes'];
			if (move.category === 'Physical' && (!spikes || spikes.layers < 3)) {
				this.add('-activate', target, 'ability: Splinter Armor');
				side.addSideCondition('spikes', target);
			}
		},
		flags: {},
		name: "Splinter Armor",
		rating: 3.5,
		num: 0,
		shortDesc: "If this Pokemon is hit by a physical attack, Spikes are set on the opposing side.",
	},
	striker: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags.kicking) {
				return this.chainModify(1.2);
			}
		},
		onModifyMove(move, pokemon, target) {
			if (move.flags.kicking && move.flags.contact) delete move.flags['contact'];
		},
		flags: {},
		name: "Striker",
		rating: 3.5,
		num: 173,
		shortDesc: "1.2x power on kicking moves. Kicking moves no longer make contact."
	},
	teamplayer: {
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Team Player');
			const fallen = Math.min(pokemon.side.totalFainted, 5);
			this.add('-start', pokemon, `teammates${fallen}`, '[silent]');
			this.effectState.fallen = fallen;
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `teammates${this.effectState.fallen}`, '[silent]');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			const powMod = [6144, 5734, 5325, 4915, 4506, 4096];
			this.debug(`Team Player boost: ${powMod[this.effectState.fallen]}/4096`);
			return this.chainModify([powMod[this.effectState.fallen], 4096]);
		},
		flags: {},
		name: "Team Player",
		rating: 4,
		num: 293,
	},
	sweetdreams: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Sweet Dreams');
		},
		onAnySetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Sweet Dreams');
			}
			return false;
		},
		// Permanent sleep "status" implemented in the relevant sleep-checking effects
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Sweet Dreams",
		rating: 4,
		num: 213,
	},
	tyrannicalreign: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (!move.flags.contact) {
				return this.chainModify(1.2);
			}
		},
		flags: {},
		name: "Tyrannical Reign",
		rating: 3.5,
		num: 173,
		shortDesc: "1.2x power on non-contact moves."
	},
	unkemptmane: {
		onSourceDamagingHit(damage, target, source, move) {
			if (move.flags.contact) {
				target.addVolatile('partiallytrapped')
			}
		},
		flags: {},
		name: "Unkempt Mane",
		rating: 3.5,
		num: 173,
		shortDesc: "Contact moves also apply bind for 3 turns."
	},
	whippedwonderland: {
		onStart(source) {
			this.field.setTerrain('mistyterrain');
		},
		onModifySpDPriority: 6,
		onModifySpD(spd, pokemon) {
			if (this.field.isTerrain('mistyterrain')) return this.chainModify([4, 3]);
		},
		flags: {},
		name: "Whipped Wonderland",
		rating: 3.5,
		num: 228,
		shortDesc: "On switch-in, this Pokemon summons Misty Terrain. 1.33x Sp. Def in Misty Terrain.",
	},
	wildfire: {
		onSourceDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire') {
				target.addVolatile('gmaxwildfire')
			}
		},
		flags: {},
		name: "Wildfire",
		rating: 3.5,
		num: 173,
		shortDesc: "Fire-type moves cause target to lose 1/8 max HP every turn for 4 turns."
	},
};
