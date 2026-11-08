export const Abilities: import("../../../sim/dex-abilities").ModdedAbilityDataTable = {
	aquagenic: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Aquagenic');
				}
				return null;
			}
		},
		onSourceBasePowerPriority: 17,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(1.25);
			}
		},
		onWeather(target, source, effect) {
			if (target.effectiveWeather() !== effect.id) return;
			if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.heal(target.baseMaxhp / 8);
			} else if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		flags: { breakable: 1 },
		name: "Aquagenic",
		shortDesc: "Fire and sunlight heals the user, Water moves deal 25% more damage (Reverse Dry Skin)",
	},
	brickwall: {
		onHit(target, source, move) {
			if (!target.hp) return;
			if (move?.effectType === 'Move' && (target.getMoveHitData(move).crit || move.type === "Flying")) {
				this.boost({ def: 6 }, target, target);
			}
		},
		flags: {},
		name: "Brick Wall",
		shortDesc: "User gains +6 Defense from a critical hit or Flying move",
	},
	burnbothends: {
		onModifySpAPriority: 5,
		onModifySpA(atk, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Burn Both Ends",
		shortDesc: "Boosts Sp. Attack by 50% when Burned, Frostbitten, Poisoned, Paralyzed. Frostbite doesn't half the user's damage",
	},
	candlelight: {
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Bug') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.knownType || pokemon.hasType('Bug')) {
				pokemon.maybeTrapped = true;
			}
		},
		flags: {},
		name: "Candle Light",
		shortDesc: "Traps Bug-types (Magnet Pull but for Bugs)",
	},
	chillyspray: {
		onDamagingHit(damage, target, source, move) {
			source.trySetStatus('frz', target);
		},
		flags: {},
		name: "Chilly Spray",
		shortDesc: "When the user takes damage from a move, it frostbites the attacker",
	},
	conductor: {
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				return this.chainModify(1.5);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Electric') {
				this.boost({ spd: 1 });
			}
		},
		flags: {},
		name: "Conductor",
		shortDesc: "User's sound-based moves are boosted by 50%. Electric moves raise its Sp. Defense",
	},
	darksmoke: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add('-fail', target, 'unboost', '[from] ability: Dark Smoke', `[of] ${target}`);
			}
		},
		flags: { breakable: 1 },
		name: "Dark Smoke",
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages.",
	},
	dragonsoul: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dragon') {
				this.debug('Dragon Soul boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dragon') {
				this.debug('Dragon Soul boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Dragon Soul",
		shortDesc: "Gain Dragon STAB (Steelworker but for Dragon moves)",
	},
	forecast: {
		inherit: true,
		onWeatherChange(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Metamoso' || pokemon.transformed) return;
			let forme = null;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				if (pokemon.species.id !== 'metamososunny') forme = 'Metamoso-Sunny';
				break;
			case 'raindance':
			case 'primordialsea':
				if (pokemon.species.id !== 'metamosorainy') forme = 'Metamoso-Rainy';
				break;
			case 'hail':
			case 'snowscape':
				if (pokemon.species.id !== 'metamososnowy') forme = 'Metamoso-Snowy';
				break;
			default:
				if (pokemon.species.id !== 'metamoso') forme = 'Metamoso';
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme, this.effect, false, '0', '[msg]');
			}
		},
		desc: "If this Pokemon is a Metamoso, its type changes to the current weather condition's type, except Sandstorm. This effect is prevented if this Pokemon is holding a Utility Umbrella and the weather is Rain or Sun.",
		shortDesc: "Metamoso's type changes to the current weather condition's type, except Sandstorm.",
	},
	fragmentation: {
		onStart(pokemon) {
			const side = pokemon.side.foe;
			const stealthRock = side.sideConditions['stealthrock'];
			if (!stealthRock) {
				this.add('-activate', pokemon, 'ability: Fragmentation');
				pokemon.side.foe.addSideCondition('stealthrock', pokemon);
			}
		},
		flags: {},
		name: "Fragmentation",
		shortDesc: "Sets up Stealth Rock",
	},
	galewings: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Flying') return priority + 1;
		},
		rating: 4,
		shortDesc: "This Pokemon's Flying-type moves have their priority increased by 1.",
	},
	gemstone: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Gemstone');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Rock') return;
			if (!move.auraBooster?.hasAbility('Gemstone')) move.auraBooster = this.effectState.target;
			if (move.auraBooster !== this.effectState.target) return;
			return this.chainModify([move.hasAuraBreak ? 3072 : 5448, 4096]);
		},
		flags: {},
		name: "Gemstone",
		shortDesc: "Boosts all Rock-type moves on the field by 33% (Dark Aura/Fairy Aura but for Rock)",
	},
	geosurge: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Rock' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Geosurge boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Rock' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Geosurge boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Geosurge",
		shortDesc: "Powers Rock-type moves by 50% when under 1/3 HP",
	},
	herbivorous: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Grass') {
				if (!this.boost({ spa: 1 })) {
					this.add('-immune', target, '[from] ability: Herbivorous');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (source === this.effectState.target || !target.isAlly(source)) return;
			if (move.type === 'Grass') {
				this.boost({ spa: 1 }, this.effectState.target);
			}
		},
		flags: { breakable: 1 },
		name: "Herbivorous",
		shortDesc: "Boosts user's Sp. Attack when hit by a Grass move",
	},
	illuminate: {
		inherit: true,
		onAnyModifyAccuracyPriority: -1,
		onAnyModifyAccuracy(accuracy, target, source) {
			if (source.isAlly(this.effectState.target) && typeof accuracy === 'number') {
				return this.chainModify([4506, 4096]);
			}
		},
		onTryBoost(boost, target, source, effect) { },
		onModifyMove(move) { },
		flags: {},
		shortDesc: "Boosts accuracy of itself and allies by 10%",
	},
	ironfist: {
		inherit: true,
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Iron Fist boost');
				return this.chainModify([5324, 4096]);
			}
		},
		flags: {},
		desc: "This Pokemon's punch-based attacks have their power multiplied by 1.3.",
		shortDesc: "This Pokemon's punch-based attacks have 1.3× power. Sucker Punch is not boosted.",
	},
	kleptomaniac: {
		onStart(pokemon) {
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			this.effectState.boost = true;
			const sides = [this.sides[0], this.sides[3]!, this.sides[1], this.sides[2]!];
			for (const side of sides) {
				if (!side.sideConditions) continue;
				for (const id in side.sideConditions) {
					if (sideConditions.includes(id)) {
						side.removeSideCondition(id);
						if (this.effectState.boost) {
							this.boost({ def: 1, spd: 1 }, pokemon);
							this.effectState.boost = false;
						}
					}
				}
			}
		},
		onResidual(pokemon) {
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			this.effectState.boost = true;
			const sides = [this.sides[0], this.sides[3]!, this.sides[1], this.sides[2]!];
			for (const side of sides) {
				if (!side.sideConditions) continue;
				for (const id in side.sideConditions) {
					if (sideConditions.includes(id)) {
						side.removeSideCondition(id);
						if (this.effectState.boost) {
							this.boost({ def: 1, spd: 1 }, pokemon);
							this.effectState.boost = false;
						}
					}
				}
			}
		},
		flags: {},
		name: "Kleptomaniac",
		shortDesc: "On switch-in and at end of turn, clear all hazards. If any hazards were cleared +1 Def/SpD.",
	},
	laziness: {
		onDamagingHit(damage, target, source, move) {
			const sourceAbility = source.getAbility();
			if (sourceAbility.flags['cantsuppress'] || sourceAbility.id === 'laziness') {
				return;
			}
			if (this.checkMoveMakesContact(move, source, target, !source.isAlly(target))) {
				source.setAbility('laziness', target);
			}
		},
		flags: {},
		name: "Laziness",
		shortDesc: "Contact with Laziness spreads this ability (Mummy renamed)",
	},
	leafcutter: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Leafcutter boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Leafcutter boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Leafcutter",
		shortDesc: "Gain Grass STAB (Steelworker but for Grass moves)",
	},
	moneymaw: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		flags: {},
		name: "Money Maw",
		desc: "Pokemon making contact with this Pokemon lose 1/8 of their maximum HP, rounded down.",
		shortDesc: "Pokemon making contact with this Pokemon lose 1/8 of their max HP.",
	},
	overawe: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Overawe', 'boost');
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
		name: "Overawe",
		shortDesc: "Lowers the foe's Sp. Attack stat (Intimidate but for Sp. Attack)",
	},
	nocturnal: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Nocturnal');
				}
				return null;
			}
		},
		onSourceBasePowerPriority: 17,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fairy') {
				return this.chainModify(1.25);
			}
		},
		flags: { breakable: 1 },
		name: "Nocturnal",
		rating: 3,
		num: 87,
		shortDesc: "Dark moves heal the user, Fairy moves deal 25% more damage",
	},
	paratonnerre: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({ atk: 1 })) {
					this.add('-immune', target, '[from] ability: Paratonnerre');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Electric' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Paratonnerre');
				}
				return this.effectState.target;
			}
		},
		flags: { breakable: 1 },
		name: "Paratonnerre",
		shortDesc: "Draws in Electric moves and boosts the user's Attack (Lightning Rod but raises Attack)",
	},
	phantasma: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ghost') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Phantasma');
				}
				return null;
			}
		},
		onSourceBasePowerPriority: 17,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Dark') {
				return this.chainModify(1.25);
			}
		},
		flags: { breakable: 1 },
		name: "Phantasma",
		rating: 3,
		num: 87,
		shortDesc: "Ghost moves heal the user, Dark moves deal 25% more damage",
	},
	plantveil: {
		onAllyTryBoost(boost, target, source, effect) {
			if ((source && target === source) || !target.hasType('Grass')) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries) {
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Plant Veil', `[of] ${effectHolder}`);
			}
		},
		onAllySetStatus(status, target, source, effect) {
			if (target.hasType('Grass') && source && target !== source && effect && effect.id !== 'yawn') {
				this.debug('interrupting setStatus with Plant Veil');
				if (effect.name === 'Synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Plant Veil', `[of] ${effectHolder}`);
				}
				return null;
			}
		},
		onAllyTryAddVolatile(status, target) {
			if (target.hasType('Grass') && status.id === 'yawn') {
				this.debug('Plant Veil blocking yawn');
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Plant Veil', `[of] ${effectHolder}`);
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Plant Veil",
		shortDesc: "Prevents Grass-types from having their stats lowered (Flower Veil renamed)",
	},
	protean: {
		inherit: true,
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch' || move.callsMove) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		rating: 4.5,
		desc: "This Pokemon's type changes to match the type of the move it is about to use. This effect comes after all effects that change a move's type.",
		shortDesc: "This Pokemon's type changes to match the type of the move it is about to use.",
	},
	searingtouch: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (this.checkMoveMakesContact(move, target, source)) {
				if (this.randomChance(3, 10)) {
					target.trySetStatus('brn', source);
				}
			}
		},
		flags: {},
		name: "Searing Touch",
		shortDesc: "The user's physical moves have a 30% chance to Burn (Poison Touch but for Burn)",
	},
	secondwind: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Flying' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Second Wind boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Flying' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Second Wind boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Second Wind",
		shortDesc: "Powers Flying-type moves by 50% when under 1/3 HP",
	},
	shedtears: {
		flags: {},
		name: "Shed Tears",
		shortDesc: "No competitive use.",
	},
	smallsoldier: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Small Soldier",
		shortDesc: "Raises attacking stats by 50% when under 50% HP (it's Defeatist but raises stats instead)",
	},
	sturdyhome: {
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Flying') mod *= 2;
			if (move.flags['contact']) mod /= 2;
			return this.chainModify(mod);
		},
		flags: { breakable: 1 },
		name: "Sturdy Home",
		shortDesc: "Halfs physical damage, but x2 weak to Flying moves (Fluffy but for Flying moves)",
	},
	stormweaver: {
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'hail' || type === 'powder') return false;
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifyDefPriority: 5,
		onModifyDef(spa, pokemon) {
			if (['hail'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 5,
		onModifySpD(spa, pokemon) {
			if (['sandstorm'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onWeather(target, source, effect) {
			if (target.effectiveWeather() !== effect.id) return;
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		name: "Stormweaver",
		shortDesc: "Immune to Sandstorm/Hail. Sun boosts Sp. Attack, Rain restores 1/16 HP, Sandstorm boosts Sp. Defense, Hail boosts Defense ",
	},
	sunshower: {
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland', 'raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Sunshower",
		shortDesc: "1.5x Speed in rain or sunshine.",
	},
	swoleup: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fighting' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Swole Up boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fighting' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Swole Up boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Swole Up",
		shortDesc: "Powers Fighting-type moves by 50% when under 1/3 HP",
	},
	thermalbody: {
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire') {
				this.boost({ spa: 2 });
			}
		},
		flags: {},
		name: "Thermal Body",
		shortDesc: "Raises Sp. Attack when hit by a Fire move",
	},
	vastvines: {
		onTryHitPriority: 4,
		onTryHit(target, source, move) {
			if (this.effectState.vastvines) return;
			// Wide Guard blocks all spread moves
			if (move?.target !== 'allAdjacent' && move.target !== 'allAdjacentFoes') {
				return;
			}
			if (this.checkMoveBypassesProtect(move, source, target)) return;
			this.add('-activate', target, 'ability: Vast Vines');
			const lockedmove = source.getVolatile('lockedmove');
			if (lockedmove) {
				// Outrage counter is reset
				if (source.volatiles['lockedmove'].duration === 2) {
					delete source.volatiles['lockedmove'];
				}
			}
			this.effectState.vastvines = true;
			return this.NOT_FAIL;
		},
		flags: {},
		name: "Vast Vines",
		shortDesc: "Protects the user and ally from from one spread move once per switch-in.",
	},
	volcanic: {
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Malhelent' || pokemon.transformed) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp / 2 && !['Volcanic'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('volcanic');
			} else if (pokemon.hp > pokemon.maxhp / 2 && ['Volcanic'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('volcanic'); // in case of base Darmanitan-Zen
				pokemon.removeVolatile('volcanic');
			}
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['volcanic'] || !pokemon.hp) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['volcanic'];
			if (pokemon.species.baseSpecies === 'Malhelent' && pokemon.species.battleOnly) {
				pokemon.formeChange(pokemon.species.battleOnly as string, this.effect, false, '0', '[silent]');
			}
		},
		condition: {
			onStart(pokemon) {
				if (pokemon.species.id !== 'malhelentvolcanic') pokemon.formeChange('Malhelent-Volcanic');
			},
			onEnd(pokemon) {
				if (['Volcanic'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Volcanic",
		shortDesc: "Changes form when under 50% HP (Zen Mode renamed)",
	},
	watchdog: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			const side = pokemon.side.foe;
			side.pokemon.forEach(foe => {
				this.boost({ spa: -1 }, foe);
			});
		},
		flags: {},
		name: "Watchdog",
		shortDesc: "At the end of every turn, the opponent's side gets their Sp. Attack lowered",
	},
	wonderskin: {
		onModifyAccuracyPriority: 10,
		onModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Status' && typeof accuracy === 'number') {
				this.debug('Wonder Skin - setting accuracy to 0');
				return 0;
			}
		},
		flags: { breakable: 1 },
		name: "Wonder Skin",
		desc: "Non-damaging moves that check accuracy have their accuracy changed to 0% when used against this Pokemon. This effect comes before other effects that modify accuracy.",
		shortDesc: "Status moves with accuracy checks are 0% accurate when used on this Pokemon.",
	},
	yogapower: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.chainModify(2);
		},
		flags: {},
		name: "Yoga Power",
		shortDesc: "Doubles the power of the Pokémon's physical moves (It's Pure Power, Yoga Power is the Japanese name)",
	},
	
	auraguard: {
		inherit: true,
		isNonstandard: null,
	},
	snowwarning: {
		inherit: true,
		onStart(source) {
			this.field.setWeather('hail');
		},
		rating: 4,
		shortDesc: "On switch-in, this Pokemon summons Hail.",
	},
};
