import { ModdedMoveData } from "../../../sim/dex-moves";

export const Moves: {[k: string]: ModdedMoveData} = {
	charm: {
		inherit: true,
		type: "Fairy",
	},
	morningsun: {
		inherit: true,
		type: "Fire",
	},
	sweetkiss: {
		inherit: true,
		type: "Fairy",
	},
	futuresight: {
		inherit: true,
		basePower: 120,
		accuracy: 100,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'futuresight',
				source: source,
				moveData: {
					id: 'futuresight',
					name: "Future Sight",
					accuracy: 100,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: {allyanim: 1, metronome: 1, futuremove: 1},
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Psychic',
				},
			});
			this.add('-start', source, 'move: Future Sight');
			return this.NOT_FAIL;
		},
	},
	metalclaw: {
		inherit: true,
		basePower: 70,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
	},
	suckerpunch: {
		inherit: true,
		gen: 3,
		basePower: 70,
	},
	babydolleyes: {
		inherit: true,
		gen: 3,
	},
	dazzlinggleam: {
		inherit: true,
		gen: 3,
	},
	disarmingvoice: {
		inherit: true,
		gen: 3,
		flags: {protect: 1, mirror: 1, sound: 1, metronome: 1},
	},
	dualwingbeat: {
		inherit: true,
		gen: 3,
		accuracy: 85,
	},
	rapidspin: {
		inherit: true,
		desc: "If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field. Has a 100% chance to raise the user's Speed by 1 stage.",
		shortDesc: "Free user from hazards/bind/Leech Seed; +1 Spe.",
		basePower: 50,
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
	},
	outrage: {
		inherit: true,
		basePower: 120,
	},
	thrash: {
		inherit: true,
		basePower: 120,
	},
	petaldance: {
		inherit: true,
		basePower: 120,
	},
	drainingkiss: {
		inherit: true,
		gen: 3,
		desc: "The user recovers 1/2 the HP lost by the target, rounded down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		basePower: 75,
		drain: [1, 2],
	},
	matblock: {
		inherit: true,
		gen: 3,
	},
	furycutter: {
		inherit: true,
		basePower: 40,
	},
	rocksmash: {
		inherit: true,
		basePower: 60,
	},
	howl: {
		inherit: true,
		target: "allies",
		desc: "Raises the Attack of the user and all allies 1 stage.",
		shortDesc: "Raises the user's and ally's Attack by 1.",
	},
	iceshard: {
		inherit: true,
		gen: 3,
	},
	bulletpunch: {
		inherit: true,
		gen: 3,
	},
	poisongas: {
		inherit: true,
		accuracy: 80,
		target: "allAdjacentFoes",
		desc: "Poisons the target.",
		shortDesc: "Poisons the foe(s).",
	},
	feint: {
		inherit: true,
		gen: 3,
		basePower: 30,
		desc: "If this move is successful, it deals double damage and breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally.",
		shortDesc: "Double damage on Detect, Protect, and Quick/Wide Guard.",
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds
			if (target.volatiles['protect']) {
				this.debug('Feint damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		onTry(source, target) {},
	},
	armthrust: {
		inherit: true,
		basePower: 25,
	},
	bulletseed: {
		inherit: true,
		basePower: 25,
	},
	iciclespear: {
		inherit: true,
		basePower: 25,
	},
	pinmissile: {
		inherit: true,
		basePower: 25,
	},
	triplekick: {
		inherit: true,
		basePower: 15,
		basePowerCallback(pokemon, target, move) {
			return 15 * move.hit;
		},
	},
	doublekick: {
		inherit: true,
		basePower: 40,
		accuracy: 90,
	},
	hypervoice: {
		inherit: true,
		type: "Sound",
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
	},
	charge: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Charge",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		desc: "If the user uses an Electric-type attack, its power will be doubled until it's no longer active.",
		shortDesc: "The user's Electric attacks have 2x power.",
		volatileStatus: 'charge',
		condition: {
			onStart(pokemon, source, effect) {
				if (effect && ['Electromorphosis', 'Wind Power'].includes(effect.name)) {
					this.add('-start', pokemon, 'Charge', this.activeMove!.name, '[from] ability: ' + effect.name);
				} else {
					this.add('-start', pokemon, 'Charge');
				}
			},
			onRestart(pokemon, source, effect) {
				if (effect && ['Electromorphosis', 'Wind Power'].includes(effect.name)) {
					this.add('-start', pokemon, 'Charge', this.activeMove!.name, '[from] ability: ' + effect.name);
				} else {
					this.add('-start', pokemon, 'Charge');
				}
			},
			onBasePowerPriority: 9,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric') {
					this.debug('charge boost');
					return this.chainModify(2);
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Charge', '[silent]');
			},
		},
		boosts: {},
		secondary: null,
		target: "self",
		type: "Electric",
		zMove: {boost: {spd: 1}},
		contestType: "Clever",
	},
	thief: {
		inherit: true,
		basePower: 60,
	},
	uturn: {
		inherit: true,
		gen: 3,
		basePower: 50,
	},
	voltswitch: {
		inherit: true,
		gen: 3,
		basePower: 50,
	},
	flipturn: {
		inherit: true,
		gen: 3,
		basePower: 50,
	},
	leechlife: {
		inherit: true,
		basePower: 75,
	},
	twineedle: {
		inherit: true,
		basePower: 40,
		accuracy: 90,
	},
	growth: {
		inherit: true,
		desc: "Raises the user's Attack and Special Attack by 1 stage.",
		shortDesc: "Raises user's Attack and Sp. Atk by 1.",
		boosts: {
			atk: 1,
			spa: 1,
		},
		secondary: null,
		type: "Grass",
	},
	highjumpkick: {
		inherit: true,
		basePower: 120,
		desc: "If this attack is not successful, the user loses half of its maximum HP, rounded down, as crash damage. Pokemon with the Magic Guard Ability are unaffected by crash damage.",
		shortDesc: "User is hurt by 50% of its max HP if it misses.",
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('High Jump Kick'));
		},
	},
	jumpkick: {
		inherit: true,
		basePower: 100,
		desc: "If this attack is not successful, the user loses half of its maximum HP, rounded down, as crash damage. Pokemon with the Magic Guard Ability are unaffected by crash damage.",
		shortDesc: "User is hurt by 50% of its max HP if it misses.",
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('Jump Kick'));
		},
	},
	stealthrock: {
		inherit: true,
		gen: 3,
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in. Fails if the effect is already active on the opposing side. Damage is rounded down. Foes lose 1/8 of their max hp if neutral to Rock, 1/4 if they are Flying-type and 1/16 of they resist Rock. Can be removed from the opposing side if any opposing Pokemon uses Mortal Spin, Rapid Spin, or Defog successfully, or is hit by Defog.",
		shortDesc: "Hurts switch-in. x2 damage Flying, 1/2 resist.",
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
	
				const typeMod = pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock'));

				if (pokemon.hasType('Flying')) {
					this.damage(pokemon.maxhp / 4);
				} else if (typeMod < 0){
					this.damage(pokemon.maxhp / 16);
				}
				else {
					this.damage(pokemon.maxhp / 8);
				}
			},
		},
		flags: {metronome: 1, mustpressure: 1, reflectable: 1},
	},
	spikes: {
		inherit: true,
		flags: {metronome: 1, mustpressure: 1, reflectable: 1},
	},
	blizzard: {
		inherit: true,
		desc: "Has a 10% chance to freeze the target. If the weather is Snow, this move does not check accuracy.",
		shortDesc: "10% chance to freeze foe(s). Can't miss in Snow.",
		onModifyMove(move) {
			if (this.field.isWeather(['hail', 'snow'])) move.accuracy = true;
		},
	},
	hail: {
		inherit: true,
		weather: 'snow',
	},
	recover: {
		inherit: true,
		pp: 10,
	},
	hex: {
		inherit: true,
		gen: 3,
		basePower: 65,
	},
	flash: {
		inherit: true,
		type: "Electric",
		accuracy: 100,
	},
	disable: {
		inherit: true,
		type: "Ghost",
		accuracy: 100,
	},
	grassyterrain: {
		inherit: true,
		gen: 3,
		desc: "For 5 turns, the terrain becomes Grassy Terrain. During the effect, the power of Grass-type attacks used by grounded Pokemon is multiplied by 1.3, the power of Bulldoze, Earthquake, and Magnitude used against grounded Pokemon is multiplied by 0.5, and grounded Pokemon have 1/16 of their maximum HP, rounded down, restored at the end of each turn, including the last turn. Camouflage transforms the user into a Grass type, Nature Power becomes Energy Ball, and Secret Power has a 30% chance to cause sleep. Fails if the current terrain is Grassy Terrain.",
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
				this.debug('grassy terrain boost');
				return this.chainModify(1.3);
			}
		},
	},
	electricterrain: {
		inherit: true,
		gen: 3,
		desc: "For 5 turns, the terrain becomes Electric Terrain. During the effect, the power of Electric-type attacks made by grounded Pokemon is multiplied by 1.3 and grounded Pokemon cannot fall asleep; Pokemon already asleep do not wake up. Grounded Pokemon cannot become affected by Yawn or fall asleep from its effect. Camouflage transforms the user into an Electric type, Nature Power becomes Thunderbolt, and Secret Power has a 30% chance to cause paralysis. Fails if the current terrain is Electric Terrain.",
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Electric' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
				this.debug('electric terrain boost');
				return this.chainModify(1.3);
			}
		},
	},
	mistyterrain: {
		inherit: true,
		gen: 3,
		desc: "For 5 turns, the terrain becomes Misty Terrain. During the effect, the power of Fairy-type attacks made by grounded Pokemon is multiplied by 1.3 and the power of Dragon-type attacks used against grounded Pokemon is multiplied by 0.5 and grounded Pokemon cannot be inflicted with a non-volatile status condition nor confusion. Grounded Pokemon can become affected by Yawn but cannot fall asleep from its effect. Camouflage transforms the user into a Fairy type, Nature Power becomes Moonblast, and Secret Power has a 30% chance to lower Special Attack by 1 stage. Fails if the current terrain is Misty Terrain.",
		shortDesc: "5 turns. Can't status, +Fairy power, -Dragon power.",
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fairy' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
				this.debug('misty terrain boost');
				return this.chainModify(1.3);
			}
		},
	},
	psychicterrain: {
		inherit: true,
		gen: 3,
		desc: "For 5 turns, the terrain becomes Psychic Terrain. During the effect, the power of Psychic-type attacks made by grounded Pokemon is multiplied by 1.3 and grounded Pokemon cannot be hit by moves with priority greater than 0, unless the target is an ally. Camouflage transforms the user into a Psychic type, Nature Power becomes Psychic, and Secret Power has a 30% chance to lower the target's Speed by 1 stage. Fails if the current terrain is Psychic Terrain.",
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Psychic' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
				this.debug('psychic terrain boost');
				return this.chainModify(1.3);
			}
		},
	},
	takeheart: {
		inherit: true,
		gen: 3,
	},
	psychicnoise: {
		inherit: true,
		gen: 3,
	},
	meditate: {
		inherit: true,
		desc: "Raises the user's Attack and Special Defense by 1 stage.",
		shortDesc: "Raises the user's Attack and Sp. Def by 1.",
		boosts: {
			atk: 1,
			spd: 1,
		},
	},
	defog: {
		inherit: true,
		gen: 3,
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
	},
	stomp: {
		inherit: true,
		basePower: 75,
		type: "Ground",
	},
	circlethrow: {
		inherit: true,
		gen: 3,
	},
	dragontail: {
		inherit: true,
		gen: 3,
	},
	xscissor: {
		inherit: true,
		gen: 3,
		desc: "Has a 20% chance to bleed the target.",
		shortDesc: "20% chance to bleed the target.",
		secondary: {
			chance: 20,
			status: 'bld',
		},
	},
	fusionflare: {
		inherit: true,
		gen: 3,
	},
	blueflare: {
		inherit: true,
		gen: 3,
	},
	gigadrain: {
		inherit: true,
		pp: 15,
		basePower: 75,
	},
	energyball: {
		inherit: true,
		gen: 3,
	},
	thunderwave: {
		inherit: true,
		accuracy: 90,
	},
	steelroller: {
		inherit: true,
		gen: 3,
		basePower: 80,
		desc: "Ends the effects of Electric Terrain, Grassy Terrain, Misty Terrain, and Psychic Terrain.",
		shortDesc: "Ends the effects of terrain.",
		onTry() {},
	},
	metalburst: {
		inherit: true,
		gen: 3,
	},
	falsesurrender: {
		inherit: true,
		gen: 3,
	},
	spiritbreak: {
		inherit: true,
		gen: 3,
	},
	beakblast: {
		inherit: true,
		gen: 3,
	},
	roost: {
		inherit: true,
		gen: 3,
	},
	block: {
		inherit: true,
		type: "Dark",
	},
	teleport: {
		inherit: true,
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members.",
		shortDesc: "User switches out.",
		priority: -6,
		onTry(source) {
			return !!this.canSwitch(source.side);
		},
		selfSwitch: true,
		target: "self",
	},
	headsmash: {
		inherit: true,
		gen: 3,
		basePower: 120,
	},
	aquajet: {
		inherit: true,
		gen: 3,
	},
	heartstamp: {
		inherit	: true,
		gen: 3,
		desc: "Has a 30% chance to make the target become infatuated, making it unable to attack 50% of the time. The effect ends when either the user or the target is no longer active.",
		shortDesc: "30% chance opposite gender gets infatuated.",
		secondary: {
			chance: 30,
			volatileStatus: 'attract',
		},
	},
	paraboliccharge: {
		inherit: true,
		gen: 3,
		basePower: 75,
	},
	snore: {
		inherit: true,
		basePower: 75,
	},
	psyshieldbash: {
		inherit: true,
		gen: 3,
		desc: "Damage is calculated using the user's Defense stat as its Special Attack, including stat stage changes. Other effects that modify the Special Attack stat are used as normal.",
		shortDesc: "Uses Def stat as Sp. Atk in damage calculation.",
		overrideOffensiveStat: 'def',
	},
	crunch: {
		inherit: true,
		desc: "Has a 20% chance to lower the target's Defense by 1 stage.",
		shortDesc: "20% chance to lower the target's Defense by 1.",
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
	},
	mysticalfire: {
		inherit: true,
		gen: 3,
		basePower: 75,
	},
	dig: {
		inherit: true,
		basePower: 80,
	},
	dive: {
		inherit: true,
		basePower: 80,
	},
	fly: {
		inherit: true,
		basePower: 90,
	},
	filletaway: {
		inherit: true,
		gen: 3,
	},
	struggle: {
		inherit: true,
		basePower: 80,
		recoil: [1, 2],
	},
	tackle: {
		inherit: true,
		basePower: 50,
		accuracy: 100,
	},
	leafstorm: {
		inherit: true,
		gen: 3,
	},
	forestscurse: {
		inherit: true,
		gen: 3,
	},
	trickortreat: {
		inherit: true,
		gen: 3,
	},
	uproar: {
		inherit: true,
		basePower: 90,
		type: "Sound",
	},
	spinout: {
		inherit: true,
		gen: 3,
	},
	throatchop: {
		inherit: true,
		gen: 3,
	},
	drainpunch: {
		inherit: true,
		gen: 3,
		basePower: 75,
	},
	hurricane: {
		inherit: true,
		gen: 3,
	},
	glare: {
		inherit: true,
		type: "Dark",
		accuracy: 100,
	},
	watershuriken: {
		inherit: true,
		gen: 3,
	},
	triattack: {
		inherit: true,
		desc: "Hits three times. Power increases to 50 for the second hit and 75 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit three times.",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
		accuracy: 90,
		basePower: 22,
		basePowerCallback(pokemon, target, move) {
			return 22 * move.hit;
		},
		secondary: null,
		pp: 10,
		priority: 0,
		multihit: 3,
		multiaccuracy: true,
	},
	rockclimb: {
		inherit: true,
		gen: 3,
		type: "Rock",
	},
	spotlight: {
		inherit: true,
		gen: 3,
	},
	poisontail: {
		inherit: true,
		desc: "If this move strikes with a critical hit, the damage is multiplied by 1.5.",
		shortDesc: "1.5x power on critical hit.",
		basePower: 75,
		onBasePower(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.debug('Poison Tail boost');
				return this.chainModify(1.5);
			}
		},
		critRatio: 0,
		secondary: null,
	},
	switcheroo: {
		inherit: true,
		gen: 3,
	},
	weatherball: {
		inherit: true,
		desc: "Power doubles if a weather condition other than Delta Stream is active, and this move's type changes to match. Ice type during Snow, Water type during Primordial Sea or Rain Dance, Rock type during Sandstorm, and Fire type during Desolate Land or Sunny Day. If the user is holding Utility Umbrella and uses Weather Ball during Primordial Sea, Rain Dance, Desolate Land, or Sunny Day, this move remains Normal type and does not double in power.",
		shortDesc: "Power doubles and type varies in each weather.",
		onModifyMove(move) {
			switch (this.field.effectiveWeather()) {
			case 'sunnyday':
				move.type = 'Fire';
				move.category = 'Special';
				break;
			case 'raindance':
				move.type = 'Water';
				move.category = 'Special';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'hail':
			case 'snow':
				move.type = 'Ice';
				move.category = 'Special';
				break;
			case 'night':
				move.type = 'Dark';
				break;
			}
			if (this.field.effectiveWeather()) move.basePower *= 2;
		},
	},
	rage: {
		inherit: true,
		basePower: 60,
		type: "Dark",
	},
	moonlight: {
		inherit: true,
		desc: "The user restores 1/2 of its maximum HP if Delta Stream or no weather conditions are in effect or if the user is holding Utility Umbrella, 2/3 of its maximum HP if the weather is Night, and 1/4 of its maximum HP if the weather is Primordial Sea, Rain Dance, Sandstorm, Snow, Desolate Land or Sunny Day, all rounded half down.",
		shortDesc: "Heals the user by a weather-dependent amount.",
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'night':
				factor = 0.667;
				break;
			case 'sunnyday':
			case 'desolateland':
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'snow':
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
		type: "Fairy",
	},
	tailwind: {
		inherit: true,
		gen: 3,
	},
	lovelykiss: {
		inherit: true,
		type: "Psychic",
	},
	boomburst: {
		inherit: true,
		gen: 3,
		type: "Sound",
		basePower: 130,
	},
	coil: {
		inherit: true,
		gen: 3,
	},
	tidyup: {
		inherit: true,
		gen: 3,
	},
	partingshot: {
		inherit: true,
		gen: 3,
		desc: "Lowers the target's Special Attack by 1 stage. If this move is successful, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members.",
		shortDesc: "Lowers target's Sp. Atk by 1. User switches.",
		onHit(target, source) {
			this.boost({spa: -1}, target, source);
		},
	},
	sing: {
		inherit: true,
		type: "Sound",
	},
	sonicboom: {
		inherit: true,
		type: "Sound",
	},
	supersonic: {
		inherit: true,
		type: "Sound",
	},
	synchronoise: {
		inherit: true,
		gen: 3,
		type: "Sound",
		basePower: 80,
		desc: "The user prevents all opposing Pokemon from using any moves that the user also knows as long as the foe remains active.",
		shortDesc: "Foes can't use moves known by user.",
		onTryImmunity(target, source, move) {},
		secondary: {
			chance: 100,
			volatileStatus: 'imprison',
		},
		condition: {
			noCopy: true,
			onStart(target) {
				this.add('-start', target, 'move: Imprison');
			},
			onFoeDisableMove(pokemon) {
				for (const moveSlot of this.effectState.source.moveSlots) {
					if (moveSlot.id === 'struggle') continue;
					pokemon.disableMove(moveSlot.id, 'hidden');
				}
				pokemon.maybeDisabled = true;
			},
			onFoeBeforeMovePriority: 4,
			onFoeBeforeMove(attacker, defender, move) {
				if (move.id !== 'struggle' && this.effectState.source.hasMove(move.id) && !move.isZ && !move.isMax) {
					this.add('cant', attacker, 'move: Imprison', move);
					return false;
				}
			},
		},
		target: "normal",
	},
	healbell: {
		inherit: true,
		type: "Sound",
	},
	psychoshift: {
		inherit: true,
		gen: 3,
	},
	fishiousrend: {
		inherit: true,
		gen: 3,
		basePower: 75,
	},
	boltbeak: {
		inherit: true,
		gen: 3,
		basePower: 75,
	},
	strength: {
		inherit: true,
		type: "Fighting",
	},
	batonpass: {
		inherit: true,
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members.",
		shortDesc: "User switches out.",
		self: {
			onHit(source) { return },
		},
		selfSwitch: true,
	},
	multiattack: {
		inherit: true,
		gen: 3,
		basePower: 100,
		onModifyMove(move, pokemon) {
			if (pokemon.ignoringItem()) return;
			move.type = this.runEvent('Memory', pokemon, null, move, 'Normal');
			const specialTypes = ['Fire', 'Water', 'Grass', 'Ice', 'Electric', 'Psychic', 'Ghost', 'Fairy', 'Sound'];
			move.category = specialTypes.includes(move.type) ? 'Special' : 'Physical';
		},
	},
	perishsong: {
		inherit: true,
		type: "Ghost",
	},
	magmastorm: {
		inherit: true,
		gen: 3,
	},
	ragingbull: {
		inherit: true,
		gen: 3,
		desc: "If this attack does not miss, the effects of Reflect, Light Screen, and Aurora Veil end for the target's side of the field before damage is calculated. If the user's current form is a Paldean Tauros, this move's type changes to Fighting type. Has a 20% chance to make the target flinch.",
		shortDesc: "Destroys screens. Paldea = Fighting. 20% Flinch.",
		onModifyMove(move, pokemon) {
			switch (pokemon.species.name) {
				case 'Tauros-Paldea-Combat':
				case 'Tauros-Paldea-Blaze':
				case 'Tauros-Paldea-Aqua':
					move.type = 'Fighting';
					break;
			}
		},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
	},
	hiddenpower: {
		inherit: true,
		onModifyMove(move, pokemon) {
			move.type = pokemon.hpType || 'Dark';
			const specialTypes = ['Fire', 'Water', 'Grass', 'Ice', 'Electric', 'Psychic', 'Ghost', 'Fairy', 'Sound'];
			move.category = specialTypes.includes(move.type) ? 'Special' : 'Physical';
		},
	},
	firstimpression: {
		inherit: true,
		gen: 3,
		basePower: 75,
	},
	snipeshot: {
		inherit: true,
		gen: 3,
	},
	miracleeye: {
		inherit: true,
		gen: 3,
	},
	spiritshackle: {
		inherit: true,
		gen: 3,
	},
	doodle: {
		inherit: true,
		gen: 3,
	},
	dreameater: {
		inherit: true,
		desc: "The target is unaffected by this move unless it or the user is asleep. The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User gains 1/2 HP inflicted. Sleeping target/user.",
		onTryImmunity(target, source) {
			return target.status === 'slp' || target.hasAbility('comatose') || source.status === 'slp' || source.hasAbility('comatose');
		},
	},
	kingsshield: {
		inherit: true,
		gen: 3,
		desc: "The user is protected from most attacks made by other Pokemon during this turn, and Pokemon trying to make contact with the user have their Attack lowered by 1 stage. Non-damaging moves go through this protection. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Burning Bulwark, Detect, Endure, King's Shield, Max Guard, Obstruct, Protect, Quick Guard, Silk Trap, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "Protects from damaging attacks. Contact: -1 Atk.",
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (this.checkMoveMakesContact(move, source, target)) {
					this.boost({atk: -1}, source, target, this.dex.getActiveMove("King's Shield"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					this.boost({atk: -1}, source, target, this.dex.getActiveMove("King's Shield"));
				}
			},
		},
	},
	vcreate: {
		inherit: true,
		gen: 3,
	},
	leafblade: {
		inherit: true,
		basePower: 90,
	},
	gunkshot: {
		inherit: true,
		gen: 3,
	},
	revelationdance: {
		inherit: true,
		gen: 3,
		onModifyMove(move, pokemon) {
			const types = pokemon.getTypes();
			const specialTypes = ['Fire', 'Water', 'Grass', 'Ice', 'Electric', 'Psychic', 'Ghost', 'Fairy', 'Sound'];
			let type = types[0];
			if (type === 'Bird') type = '???';
			if (type === '???' && types[1]) type = types[1];
			move.type = type;
			move.category = specialTypes.includes(move.type) ? 'Special' : 'Physical';
		},
		onModifyType(move, pokemon) {},
	},
	scald: {
		inherit: true,
		gen: 3,
		desc: "Has a 30% chance to burn the target. The target thaws out if it is frozen. Deals neutral damage to Fire types.",
		shortDesc: "30% chance to burn the target. Fire neutral.",
		onEffectiveness(typeMod, target, type) {
			if (type === 'Fire') return 0;
		},
	},
	nastyplot: {
		inherit: true,
		gen: 3,
	},
	tailglow: {
		inherit: true,
		desc: "Raises the user's Special Attack by 3 stages.",
		shortDesc: "Raises the user's Sp. Atk by 3.",
		boosts: {
			spa: 3,
		},
	},
	taunt: {
		inherit: true,
		desc: "For 3 turns, prevents the target from using non-damaging moves.",
		shortDesc: "For 3 turns, the target can't use status moves.",
		condition: {
			duration: 3,
			onStart(target) {
				if (target.activeTurns && !this.queue.willMove(target)) {
					this.effectState.duration++;
				}
				this.add('-start', target, 'move: Taunt');
			},
			onResidualOrder: 15,
			onEnd(target) {
				this.add('-end', target, 'move: Taunt');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.moves.get(moveSlot.id);
					if (move.category === 'Status' && move.id !== 'mefirst') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && !move.isMax && move.category === 'Status' && move.id !== 'mefirst') {
					this.add('cant', attacker, 'move: Taunt', move);
					return false;
				}
			},
		},
	},
	rockpolish: {
		inherit: true,
		gen: 3,
	},
	healingwish: {
		inherit: true,
		gen: 3,
	},
	lusterpurge: {
		inherit: true,
		basePower: 95,
	},
	mistball: {
		inherit: true,
		basePower: 95,
	},
	psystrike: {
		inherit: true,
		gen: 3,
	},
	accelerock: {
		inherit: true,
		gen: 3,
	},
	shadowsneak: {
		inherit: true,
		gen: 3,
	},
	blazingtorque: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
		basePower: 100,
		flags: {
			protect: 1
		},
	},
	wickedtorque: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
		basePower: 100,
		flags: {
			protect: 1
		},
	},
	noxioustorque: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
		flags: {
			protect: 1
		},
	},
	combattorque: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
		flags: {
			protect: 1
		},
	},
	magicaltorque: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
		flags: {
			protect: 1
		},
	},
	honeclaws: {
		inherit: true,
		gen: 3,
	},
	toxic: {
		inherit: true,
		accuracy: 90,
	},
	strengthsap: {
		inherit: true,
		gen: 3,
	},
	shiftgear: {
		inherit: true,
		gen: 3,
	},
	geargrind: {
		inherit: true,
		gen: 3,
	},
	headcharge: {
		inherit: true,
		gen: 3,
		basePower: 130,
	},
	banefulbunker: {
		inherit: true,
		gen: 3,
	},
	discharge: {
		inherit: true,
		gen: 3,
	},
	lavaplume: {
		inherit: true,
		gen: 3,
	},
	naturesmadness: {
		inherit: true,
		gen: 3,
	},
	skullbash: {
		inherit: true,
		gen: 3,
		desc: "This attack charges on the first turn and executes on the second unless the attacker's Attack is greater than the target's Attack. Raises the user's Defense by 1 stage on the first turn. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "No charge if user's Atk > target's Atk. +1 Def.",
		basePower: 130,
		onTryMove(attacker, defender, move) {
			let userAtk = Math.floor(attacker.getStat('atk'));
			let targetAtk = Math.floor(defender.getStat('atk'));
			if(userAtk >= targetAtk) {
				this.boost({def: 1}, attacker, attacker, move);
				return;
			}
			else {
				if (attacker.removeVolatile(move.id)) {
					return;
				}
				this.add('-prepare', attacker, move.name);
				this.boost({def: 1}, attacker, attacker, move);
				if (!this.runEvent('ChargeMove', attacker, defender, move)) {
					return;
				}
				attacker.addVolatile('twoturnmove', defender);
				return null;
			}
		},
	},
	spikecannon: {
		inherit: true,
		type: "Steel",
		basePower: 25,
	},
	quiverdance: {
		inherit: true,
		gen: 3,
		desc: "Raises the user's Special Attack and Speed by 1 stage.",
		shortDesc: "Raises the user's Sp. Atk and Speed by 1.",
		boosts: {
			spa: 1,
			spe: 1,
		},
	},
	snaptrap: {
		inherit: true,
		gen: 3,
		desc: "Prevents the target from switching out. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field.",
		shortDesc: "Prevents the target from switching out. +1 priority.",
		volatileStatus: 'partiallytrapped',
		priority: 1,
	},
	sacredsword: {
		inherit: true,
		gen: 3,
	},
	dragondarts: {
		inherit: true,
		gen: 3,
	},
	tailslap: {
		inherit: true,
		gen: 3,
	},
	assist: {
		inherit: true,
		desc: "A random move among those known by the user's party members is selected for use. Does not select Assist, Baneful Bunker, Beak Blast, Belch, Bestow, Blazing Torque, Bounce, Celebrate, Chatter, Circle Throw, Combat Torque, Copycat, Counter, Covet, Destiny Bond, Detect, Dig, Dive, Dragon Tail, Endure, Feint, Fly, Focus Punch, Follow Me, Helping Hand, Hold Hands, King's Shield, Magical Torque, Mat Block, Me First, Metronome, Mimic, Mirror Coat, Mirror Move, Nature Power, Noxious Torque, Phantom Force, Protect, Rage Powder, Roar, Shadow Force, Shell Trap, Sketch, Sky Drop, Sleep Talk, Snatch, Spiky Shield, Spotlight, Struggle, Switcheroo, Tera Starstorm, Thief, Transform, Trick, Whirlwind, Wicked Torque or moves with a Base Power inferior to 70.",
		shortDesc: "Uses a random move known by a team member. Power >= 70.",
		onHit(target) {
			const moves = [];
			for (const pokemon of target.side.pokemon) {
				if (pokemon === target) continue;
				for (const moveSlot of pokemon.moveSlots) {
					const moveid = moveSlot.id;
					const move = this.dex.moves.get(moveid);
					if (move.flags['noassist'] || move.isZ || move.isMax || move.basePower < 70) {
						continue;
					}
					moves.push(moveid);
				}
			}
			let randomMove = '';
			if (moves.length) randomMove = this.sample(moves);
			if (!randomMove) {
				return false;
			}
			this.actions.useMove(randomMove, target);
		},
	},
	metronome: {
		inherit: true,
		desc: "A random move is selected for use, other than After You, Apple Acid, Armor Cannon, Assist, Astral Barrage, Aura Wheel, Baneful Bunker, Beak Blast, Behemoth Bash, Behemoth Blade, Belch, Bestow, Blazing Torque, Body Press, Branch Poke, Breaking Swipe, Celebrate, Chatter, Chilling Water, Chilly Reception, Clangorous Soul, Collision Course, Combat Torque, Comeuppance, Copycat, Counter, Covet, Crafty Shield, Decorate, Destiny Bond, Detect, Diamond Storm, Doodle, Double Iron Bash, Double Shock, Dragon Ascent, Dragon Energy, Drum Beating, Dynamax Cannon, Electro Drift, Endure, Eternabeam, False Surrender, Feint, Fiery Wrath, Fillet Away, Fleur Cannon, Focus Punch, Follow Me, Freeze Shock, Freezing Glare, Glacial Lance, Grav Apple, Helping Hand, Hold Hands, Hyper Drill, Hyperspace Fury, Hyperspace Hole, Ice Burn, Instruct, Jet Punch, Jungle Healing, King's Shield, Life Dew, Light of Ruin, Magical Torque, Make It Rain, Mat Block, Me First, Meteor Assault, Metronome, Mimic, Mind Blown, Mirror Coat, Mirror Move, Moongeist Beam, Nature Power, Nature's Madness, Noxious Torque, Obstruct, Order Up, Origin Pulse, Overdrive, Photon Geyser, Plasma Fists, Population Bomb, Pounce, Power Shift, Precipice Blades, Protect, Pyro Ball, Quash, Quick Guard, Rage Fist, Rage Powder, Raging Bull, Raging Fury, Relic Song, Revival Blessing, Ruination, Salt Cure, Secret Sword, Shed Tail, Shell Trap, Silk Trap, Sketch, Sleep Talk, Snap Trap, Snarl, Snatch, Snore, Snowscape, Spectral Thief, Spicy Extract, Spiky Shield, Spirit Break, Spotlight, Springtide Storm, Steam Eruption, Steel Beam, Strange Steam, Struggle, Sunsteel Strike, Surging Strikes, Switcheroo, Techno Blast, Tera Starstorm, Thief, Thousand Arrows, Thousand Waves, Thunder Cage, Thunderous Kick, Tidy Up, Trailblaze, Transform, Trick, Twin Beam, V-create, Wicked Blow, Wicked Torque, Wide Guard or moves with a Base Power inferior to 70.",
		shortDesc: "Picks a random move with 70 or more Base Power.",
		onHit(target, source, effect) {
			const moves = this.dex.moves.all().filter(move => (
				(![2, 4].includes(this.gen) || !source.moves.includes(move.id)) &&
				(!move.isNonstandard || move.isNonstandard === 'Unobtainable') &&
				move.flags['metronome'] && move.basePower < 70
			));
			let randomMove = '';
			if (moves.length) {
				moves.sort((a, b) => a.num - b.num);
				randomMove = this.sample(moves).id;
			}
			if (!randomMove) return false;
			source.side.lastSelectedMove = this.toID(randomMove);
			this.actions.useMove(randomMove, target);
		},
	},
	stompingtantrum: {
		inherit: true,
		gen: 3,
	},
	temperflare: {
		inherit: true,
		gen: 3,
	},
	acrobatics: {
		inherit: true,
		gen: 3,
	},
	steamroller: {
		inherit: true,
		gen: 3,
		desc: "Has a 100% chance to raise the user's Attack by 1 stage.",
		shortDesc: "100% chance to raise the user's Attack by 1.",
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
	},
	rocktomb: {
		inherit: true,
		accuracy: 95,
	},
	wish: {
		inherit: true,
		desc: "At the end of the next turn, the Pokemon at the user's position has 1/2 of the user's maximum HP restored to it, rounded down. Fails if this move is already in effect for the user's position.",
		shortDesc: "Next turn, 50% of the user's max HP is restored.",
		slotCondition: 'Wish',
		condition: {
			duration: 2,
			onStart(pokemon, source) {
				this.effectState.hp = source.maxhp / 2;
			},
			onResidualOrder: 7,
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectState.hp, target, target);
					if (damage) {
						this.add('-heal', target, target.getHealth, '[from] move: Wish', '[wisher] ' + this.effectState.source.name);
					}
				}
			},
		},
	},

	shieldbash: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	shadowcrescent: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	solarflare: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	rampaginghammer: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	rottenvial: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	nightfall: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	zapbarrage: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	rockcrunch: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	bladequills: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	deepfreeze: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	frostbite: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	echolocation: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	
	breakneckblitz: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	alloutpummeling: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	supersonicskystrike: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	aciddownpour: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	tectonicrage: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	continentalcrush: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	savagespinout: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	neverendingnightmare: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	corkscrewcrash: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	infernooverdrive: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	hydrovortex: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	bloomdoom: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	gigavolthavoc: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	shatteredpsyche: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	subzeroslammer: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	devastatingdrake: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	blacholeeclypse: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	twinkletackle: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	resonantannihilation: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	catastropika: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	"10000000voltthunderbolt": {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	stokedsparksurfer: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	extremeevoboost: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	pulverizingpancake: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	gensissupernova: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	sinisterarrowraid: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	splinteredstormshards: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	letssnuggleforever: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	guardianofalola: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
};