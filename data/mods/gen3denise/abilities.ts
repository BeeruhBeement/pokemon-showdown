import { ModdedAbilityData } from "../../../sim/dex-abilities";

export const Abilities: {[k: string]: ModdedAbilityData} = {
	hustle: {
		inherit: true,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			const physicalTypes = ['Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Dragon', 'Dark', 'Steel'];
			if (physicalTypes.includes(move.type) && typeof accuracy === 'number') {
				return this.chainModify([3277, 4096]);
			}
		},
	},
	toughclaws: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([12, 10]);
			}
		},
		shortDesc: "This Pokemon's contact moves have their power multiplied by 1.2.",
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
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Iron Fist boost');
				return this.chainModify([13, 10]);
			}
		},
		desc: "This Pokemon's punch-based attacks have their power multiplied by 1.3.",
		shortDesc: "This Pokemon's punch-based attacks have 1.3x power. Sucker Punch is not boosted.",
	},
	infiltrator: {
		inherit: true,
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
	snowwarning: {
		inherit: true,
		onStart(source) {
			this.field.setWeather('snow');
		},
	},
	colorchange: {
		inherit: true,
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
		onDamagingHit(target, source, move) {},
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
				this.add('-ability', pokemon, "Solar Power", '[from] ability: Forecast', `[of] ${pokemon}`);
				break;
			case 'raindance':
			case 'primordialsea':
				if (pokemon.species.id !== 'castformrainy') forme = 'Castform-Rainy';
				this.add('-ability', pokemon, "Rain Dish", '[from] ability: Forecast', `[of] ${pokemon}`);
				break;
			case 'hail':
			case 'snow':
				if (pokemon.species.id !== 'castformsnowy') forme = 'Castform-Snowy';
				this.add('-ability', pokemon, "Ice Body", '[from] ability: Forecast', `[of] ${pokemon}`);
				break;
			case 'sandstorm':
				if (pokemon.species.id !== 'castformsandy') forme = 'Castform-Sandy';
				this.add('-ability', pokemon, "Sand Force", '[from] ability: Forecast', `[of] ${pokemon}`);
				break;
			case 'night':
				if (pokemon.species.id !== 'castformnight') forme = 'Castform-Night';
				this.add('-ability', pokemon, "Lunar Charge", '[from] ability: Forecast', `[of] ${pokemon}`);
				break;
			default:
				if (pokemon.species.id !== 'castform') forme = 'Castform';
				this.add('-ability', pokemon, "Forecast", '[from] ability: Forecast', `[of] ${pokemon}`);
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
	solarpower: {
		inherit: true,
		desc: "If Sunny Day is active, this Pokemon's Special Attack is multiplied by 1.5 and it loses 1/10 of its maximum HP, rounded down, at the end of each turn.",
		shortDesc: "If Sunny Day is active, this Pokemon's Sp. Atk is 1.5x; loses 1/10 max HP per turn.",
		onWeather(target, source, effect) {
			if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 10, target, target);
			}
		},
	},
	sandforce: {
		inherit: true,
		desc: "If Sandstorm is active, this Pokemon's attacks have their power multiplied by 1.3. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "This Pokemon's attacks have 1.3x power in Sandstorm; immunity to it.",
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify([5325, 4096]);
			}
		},
	},
	regenerator: {
		inherit: true,
		shortDesc: "This Pokemon restores 1/4 of its maximum HP, rounded down, when it switches out.",
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 4);
		},
	},
	overcoat: {
		inherit: true,
		desc: "This Pokemon is immune to powder moves, damage from Sandstorm, and the effects of Rage Powder and the Effect Spore Ability.",
		shortDesc: "This Pokemon is immune to powder moves, Sandstorm damage, Effect Spore.",
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'hail' || type === 'powder') return false;
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (move.flags['powder'] && this.dex.getImmunity('powder', target)) {
				this.add('-immune', target, '[from] ability: Overcoat');
				return null;
			}
		},
	},
	protosynthesis: {
		inherit: true,
		desc: "If Sunny Day is active  this Pokemon's highest stat is multiplied by 1.3. Stat stage changes are considered at the time this Ability activates. If multiple stats are tied, Attack, Defense, Special Attack, Special Defense, and Speed are prioritized in that order. If this effect was started by Sunny Day, a held Booster Energy will not activate and the effect ends when Sunny Day is no longer active. If this effect was started by a held Booster Energy, it ends when this Pokemon is no longer active.",
		shortDesc: "Sunny Day active: highest stat is 1.3x.",
		onModifySpe(spe, pokemon) {
			if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
			this.debug('Protosynthesis spe boost');
			return this.chainModify([5325, 4096]);
		},
	},
	quarkdrive: {
		inherit: true,
		desc: "If Electric Terrain is active this Pokemon's highest stat is multiplied by 1.3. Stat stage changes are considered at the time this Ability activates. If multiple stats are tied, Attack, Defense, Special Attack, Special Defense, and Speed are prioritized in that order. If this effect was started by Electric Terrain, a held Booster Energy will not activate and the effect ends when Electric Terrain is no longer active. If this effect was started by a held Booster Energy, it ends when this Pokemon is no longer active.",
		shortDesc: "Electric Terrain: highest stat is 1.3x.",
		onModifySpe(spe, pokemon) {
			if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
			this.debug('Protosynthesis spe boost');
			return this.chainModify([5325, 4096]);
		},
	},
	illuminate: {
		inherit: true,
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			// List of moves to be boosted by Illuminate
			const boostedMoves = [
				'aurorabeam', 'bubblebeam', 'dazzlinggleam', 'eternabeam', 'flashcannon',
				'hyperbeam', 'icebeam', 'lightofruin', 'lightthatburnsthesky', 'meteorbeam',
				'moongeistbeam', 'prismaticlaser', 'psybeam', 'signalbeam', 'solarbeam',
				'solarblade', 'steelbeam', 'doomdesire', 'glitzyglow', 'fleurcannon',
				'lusterpurge', 'mirrorshot', 'moonblast', 'photongeyser', 'powergem'
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
	powerspot: {
		inherit: true,
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
		desc: "If this Pokemon is an Eiscue, the first physical hit it takes in battle deals 0 neutral damage. Its ice face is then broken and it changes forme to Noice Face. Eiscue regains its Ice Face forme when Snow begins or when Eiscue switches in while Snow is active. Confusion damage also breaks the ice face.",
		shortDesc: "If Eiscue, the first physical hit it takes deals 0 damage. Effect is restored in Snow.",
	},
	arenatrap: {
		inherit: true,
		desc: "Prevents opposing Pokemon from choosing to switch out for one turn unless they are airborne, are holding a Shed Shell, or are a Ghost type.",
		shortDesc: "Prevents opposing grounded Pokemon from switching out for 1 turn.",
		onFoeTrapPokemon(pokemon) {
			if (!pokemon.isAdjacent(this.effectState.target)) return;
			if (pokemon.isGrounded() && pokemon.activeMoveActions <= 0) {
				pokemon.tryTrap(true);
			}
		},
	},	
	shadowtag: {
		inherit: true,
		desc: "Prevents opposing Pokemon from choosing to switch out, unless they are holding a Shed Shell, are a Ghost type, or also have this Ability.",
		shortDesc: "Prevents foes without this ability from switching for 1 turn.",
		onFoeTrapPokemon(pokemon) {
			if (!pokemon.hasAbility('shadowtag') && pokemon.isAdjacent(this.effectState.target) && pokemon.activeMoveActions <= 0) {
				pokemon.tryTrap(true);
			}
		},
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
		desc: "This Pokemon's attacks have their power multiplied by 1.25 against targets of the same type.",
		shortDesc: "This Pokemon's attacks do 1.25x on same type targets.",
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.types && defender.types) {
				if (attacker.types.includes(defender.types[0]) || attacker.types.includes(defender.types[1]) || attacker.types.includes(defender.types[2])) {
					this.debug('Rivalry boost');
					return this.chainModify(1.25);
				}
			}
		},
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
		shortDesc: "This Pokemon's attacks are critical hits if the target is statused.",
		onModifyCritRatio(critRatio, source, target) {
			if (target && target.status) return 5;
		},
	},
	plus: {
		inherit: true,
		shortDesc: "This Pokemon's Special Attack is 1.1x.",
		onModifySpA(spa, pokemon) {
			return this.chainModify(1.1);
		},
	},
	minus: {
		inherit: true,
		shortDesc: "This Pokemon's Special Defense is 1.1x.",
		onModifySpA(spa, pokemon) {
			return;
		},
		onModifySpDPriority: 5,
		onModifySpD(spa, pokemon) {
			return this.chainModify(1.1);
		},
	},
	toxicboost: {
		inherit: true,
		desc: "While this Pokemon is poisoned, the power of its physical attacks is multiplied by 1.5. Immune to damage from poison.",
		shortDesc: "While poisoned, physical attacks have 1.5x power. No damage from poison.",
		onBasePower(basePower, attacker, defender, move) {
			if ((attacker.status === 'psn' || attacker.status === 'tox') && move.category === 'Physical') {
				return this.chainModify(1.5);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox') {
				return false;
			}
		},
	},
	soundproof: {
		inherit: true,
		shortDesc: "Immune to sound-based and Sound type moves, including Heal Bell.",
		onTryHit(target, source, move) {
			if (move.flags['sound'] || move.type === 'Sound') {
				this.add('-immune', target, '[from] ability: Soundproof');
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (move.flags['sound'] || move.type === 'Sound') {
				this.add('-immune', this.effectState.target, '[from] ability: Soundproof');
			}
		},
	},
	damp: {
		inherit: true,
		desc: "While this Pokemon is active, Explosion, Mind Blown, Misty Explosion, Self-Destruct, and the Aftermath Ability deal no damage.",
		shortDesc: "Prevents damage from explosion moves and abilities.",
		onAnyTryMove(target, source, effect) {},
		onAnyDamage(damage, target, source, effect) {
			if (effect && effect.name === 'Aftermath') {
				return false;
			}
			if (['explosion', 'mindblown', 'mistyexplosion', 'selfdestruct'].includes(effect.id)) {
				return false;
			}
		},
		rating: 2.5,
	},
	hydration: {
		inherit: true,
		desc: "This Pokemon has its non-volatile status condition cured at the end of each turn if Rain Dance is active or is hit by a Water-type move.",
		shortDesc: "This Pokemon has its status cured if Rain Dance is active or is hit by Water.",
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') {
				this.debug('hydration');
				this.add('-activate', target, 'ability: Hydration');
				target.cureStatus();
			}
		},
	},
	mindseye: {
		inherit: true,
		desc: "This Pokemon can hit Dark types with Psychic-type moves. Prevents other Pokemon from lowering this Pokemon's accuracy stat stage. This Pokemon ignores a target's evasiveness stat stage.",
		shortDesc: "Psychic moves hit Dark. Accuracy can't be lowered, ignores evasiveness.",
		onModifyMove(move) {
			move.ignoreEvasion = true;
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Psychic'] = true;
			}
		},
	},
	lightmetal: {
		inherit: true,
		desc: "This Pokemon receives 3/4 damage from Ground-type attacks and its weight is halved, rounded down to a tenth of a kilogram. This effect is calculated after the effect of Autotomize, and before the effect of Float Stone. A Pokemon's weight will not drop below 0.1 kg.",
		shortDesc: "This Pokemon's weight is halved. 3/4 damage from Ground-type attacks.",
		onSourceModifyAtkPriority: 6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ground') {
				this.debug('Light Metal weaken');
				return this.chainModify(0.75);
			}
		},
	},
	heavymetal: {
		inherit: true,
		desc: "This Pokemon receives 3/4 damage from Fighting-type attacks and its weight is doubled. This effect is calculated after the effect of Autotomize, and before the effect of Float Stone.",
		shortDesc: "This Pokemon's weight is doubled. 3/4 damage from Fighting-type attacks.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fighting') {
				this.debug('Heavy Metal weaken');
				return this.chainModify(0.75);
			}
		},
	},
	liquidvoice: {
		inherit: true,
		onModifyMovePriority: -1,
		onModifyMove(move, pokemon) {
			if (move.flags['sound'] && !pokemon.volatiles['dynamax']) { // hardcode
				move.type = 'Water';
				move.category = 'Special';
			}
		},
		onModifyType(move, pokemon) {},
	},
	runaway: {
		inherit: true,
		shortDesc: "Immune to trapping.",
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			pokemon.trapped = pokemon.maybeTrapped = false;
		},
	},
	healer: {
		inherit: true,
		desc: "Heals itself and its allies by 1/16 of their max HP at the end of each turn.",
		shortDesc: "Heal self and allies by 1/16 max HP each turn.",
		onResidual(pokemon) {
			for (const allyActive of pokemon.adjacentAllies()) {
				this.add('-activate', pokemon, 'ability: Healer');
				pokemon.heal(pokemon.baseMaxhp / 16);
				allyActive.heal(allyActive.baseMaxhp / 16);
			}
		},
	},
	desolateland: {
		inherit: true,
		onEnd(pokemon) {},
	},
	primordialsea: {
		inherit: true,
		onEnd(pokemon) {},
	},
	simple: {
		inherit: true,
		onModifyBoost(boosts, pokemon) { return },
		onChangeBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			let i: BoostID;
			for (i in boost) {
				boost[i]! *= 2;
			}
		},
	},
	emergencyexit: {
		inherit: true,
		onResidualOrder: 1,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				if (!this.canSwitch(pokemon.side) || pokemon.forceSwitchFlag || pokemon.switchFlag) return;
				for (const side of this.sides) {
					for (const active of side.active) {
						active.switchFlag = false;
					}
				}
				pokemon.switchFlag = true;
				this.add('-activate', pokemon, 'ability: Emergency Exit');
			};
		},
	},

	// -ate abilities

	normalize: {
		inherit: true,
		onModifyMove(move) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (!noModifyType.includes(move.id)){
				move.type = 'Normal';
				move.category = 'Physical';
			}
		},
	},
	galvanize: {
		inherit: true,
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
		isNonstandard: null,
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
		isNonstandard: null,
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
};
