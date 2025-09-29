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
	metalclaw: {
		inherit: true,
		basePower: 70,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
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
	drainingkiss: {
		inherit: true,
		desc: "The user recovers 1/2 the HP lost by the target, rounded down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		basePower: 75,
		drain: [1, 2],
	},
	howl: {
		inherit: true,
		target: "allies",
		onModifyMove(move, pokemon) {
			if (['night'].includes(pokemon.effectiveWeather())) move.boosts = {atk: 2};
		},
		desc: "Raises the Attack of the user and all allies 1 stage. If the weather is Night, this move raises the user's Attack by 2 stages.",
		shortDesc: "Raises user's and ally Attack by 1; 2 in Night.",
	},
	poisongas: {
		inherit: true,
		accuracy: 90,
		target: "allAdjacentFoes",
		desc: "Poisons the target.",
		shortDesc: "Poisons the foe(s).",
	},
	feint: {
		inherit: true,
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
		inherit: true,
		desc: "If the user uses an Electric-type attack, its power will be doubled until it's no longer active.",
		shortDesc: "The user's Electric attacks have 2x power.",
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
	},
	uturn: {
		inherit: true,
		basePower: 50,
	},
	voltswitch: {
		inherit: true,
		basePower: 50,
	},
	flipturn: {
		inherit: true,
		basePower: 50,
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
	stealthrock: {
		inherit: true,
		flags: {metronome: 1, mustpressure: 1, reflectable: 1},
	},
	spikes: {
		inherit: true,
		flags: {metronome: 1, mustpressure: 1, reflectable: 1},
	},
	encore: {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1, failencore: 1},
	},
	blizzard: {
		inherit: true,
		desc: "Has a 10% chance to freeze the target. If the weather is Snow, this move does not check accuracy.",
		shortDesc: "10% chance to freeze foe(s). Can't miss in Snow.",
		basePower: 110,
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
		basePower: 65,
	},
	flash: {
		inherit: true,
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
		type: "Electric",
		accuracy: 100,
		basePower: 30,
		category: "Special",
		priority: 1,
		boosts: {},
	},
	disable: {
		inherit: true,
		type: "Ghost",
		accuracy: 100,
	},
	grassyterrain: {
		inherit: true,
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
		desc: "For 5 turns, the terrain becomes Psychic Terrain. During the effect, the power of Psychic-type attacks made by grounded Pokemon is multiplied by 1.3 and grounded Pokemon cannot be hit by moves with priority greater than 0, unless the target is an ally. Camouflage transforms the user into a Psychic type, Nature Power becomes Psychic, and Secret Power has a 30% chance to lower the target's Speed by 1 stage. Fails if the current terrain is Psychic Terrain.",
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Psychic' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
				this.debug('psychic terrain boost');
				return this.chainModify(1.3);
			}
		},
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
	xscissor: {
		inherit: true,
		desc: "Has a 20% chance to bleed the target.",
		shortDesc: "20% chance to bleed the target.",
		secondary: {
			chance: 20,
			status: 'bld',
		},
	},
	thunderwave: {
		inherit: true,
		accuracy: 90,
	},
	steelroller: {
		inherit: true,
		basePower: 80,
		desc: "Ends the effects of Electric Terrain, Grassy Terrain, Misty Terrain, and Psychic Terrain.",
		shortDesc: "Ends the effects of terrain.",
		onTry() {},
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
	heartstamp: {
		inherit	: true,
		desc: "Has a 30% chance to make the target become infatuated, making it unable to attack 50% of the time. The effect ends when either the user or the target is no longer active.",
		shortDesc: "30% chance opposite gender gets infatuated.",
		secondary: {
			chance: 30,
			volatileStatus: 'attract',
		},
	},
	snore: {
		inherit: true,
		basePower: 75,
	},
	psyshieldbash: {
		inherit: true,
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
	struggle: {
		inherit: true,
		basePower: 80,
		recoil: [1, 2],
	},
	triattack: {
		inherit: true,
		desc: "Hits three times. Power increases to 40 for the second hit and 60 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit three times.",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		secondary: null,
		pp: 10,
		priority: 0,
		multihit: 3,
		multiaccuracy: true,
	},
	rockclimb: {
		inherit: true,
		type: "Rock",
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
		condition: {
			duration: 4,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Tailwind');
					return 6;
				}
				return 4;
			},
			onSideStart(side, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-sidestart', side, 'move: Tailwind', '[persistent]');
				} else {
					this.add('-sidestart', side, 'move: Tailwind');
				}
			},
			onModifySpe(spe) {
				return spe * 2;
			},
			onSideResidualOrder: 5,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Tailwind');
			},
		},
	},
	lovelykiss: {
		inherit: true,
		type: "Psychic",
	},
	boomburst: {
		inherit: true,
		type: "Sound",
	},
	partingshot: {
		inherit: true,
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
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
		type: "Sound",
		basePower: 40,
		pp: 30,
		priority: 1,
	},
	dragonrage: {
		inherit: true,
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
		type: "Dragon",
		basePower: 40,
		pp: 30,
		priority: 1,
	},
	supersonic: {
		inherit: true,
		type: "Sound",
	},
	synchronoise: {
		inherit: true,
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
					pokemon.disableMove(moveSlot.id, true);
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
	fishiousrend: {
		inherit: true,
		basePower: 75,
	},
	boltbeak: {
		inherit: true,
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
		onHit(target) {
			return;
		},
		self: {
			onHit(source) { return },
		},
		selfSwitch: true,
	},
	multiattack: {
		inherit: true,
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
	ragingbull: {
		inherit: true,
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
	firstimpression: {
		inherit: true,
		basePower: 80,
	},
	dreameater: {
		inherit: true,
		desc: "The target is unaffected by this move unless it or the user is asleep. The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User gains 1/2 HP inflicted. Sleeping target/user.",
		onTry(source) {
			if (source.status === 'slp' || source.hasAbility('comatose')) return true;
		},
		onTryImmunity(target, source) {
			return target.status === 'slp' || target.hasAbility('comatose') || source.status === 'slp' || source.hasAbility('comatose');
		},
	},
	kingsshield: {
		inherit: true,
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
	revelationdance: {
		inherit: true,
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
		desc: "Has a 30% chance to burn the target. The target thaws out if it is frozen. Deals neutral damage to Fire types.",
		shortDesc: "30% chance to burn the target. Fire neutral.",
		onEffectiveness(typeMod, target, type) {
			if (type === 'Fire') return 0;
		},
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
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1},
		condition: {
			duration: 3,
			onStart(target) {
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
	lusterpurge: {
		inherit: true,
		basePower: 95,
	},
	mistball: {
		inherit: true,
		basePower: 95,
	},
	blazingtorque: {
		inherit: true,
		isNonstandard: null,
		basePower: 100,
		flags: {
			protect: 1
		},
	},
	wickedtorque: {
		inherit: true,
		isNonstandard: null,
		basePower: 100,
		flags: {
			protect: 1
		},
	},
	noxioustorque: {
		inherit: true,
		isNonstandard: null,
		flags: {
			protect: 1
		},
	},
	combattorque: {
		inherit: true,
		isNonstandard: null,
		flags: {
			protect: 1
		},
	},
	magicaltorque: {
		inherit: true,
		isNonstandard: null,
		flags: {
			protect: 1
		},
	},
	toxic: {
		inherit: true,
		accuracy: 90,
	},
	headcharge: {
		inherit: true,
		basePower: 130,
	},
	skullbash: {
		inherit: true,
		desc: "This attack charges on the first turn and executes on the second unless the attacker's Attack is greater than the target's Attack. Raises the user's Defense by 1 stage on the first turn. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "No charge if user's Atk > target's Atk. +1 Def.",
		basePower: 130,
		pp: 10,
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
		desc: "Raises the user's Special Attack and Speed by 1 stage.",
		shortDesc: "Raises the user's Sp. Atk and Speed by 1.",
		boosts: {
			spa: 1,
			spe: 1,
		},
	},
	snaptrap: {
		inherit: true,
		desc: "Prevents the target from switching out. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field.",
		shortDesc: "Prevents the target from switching out. +1 priority.",
		volatileStatus: 'partiallytrapped',
		priority: 1,
	},
	sacredsword: {
		inherit: true,
		pp: 15,
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
	steamroller: {
		inherit: true,
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
		basePower: 60,
		pp: 15,
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
	bonemerang: {
		inherit: true,
		accuracy: 100,
	},
	slash: {
		inherit: true,
		desc: "Has a 30% chance to bleed the target and a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio. 30% chance to bleed.",
		secondary: {
			chance: 30,
			status: 'bld',
		},
	},
	nightslash: {
		inherit: true,
		desc: "Has a 30% chance to bleed the target and a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio. 30% chance to bleed.",
		secondary: {
			chance: 30,
			status: 'bld',
		},
	},
	razorwind: {
		inherit: true,
		basePower: 85,
		desc: "Has a higher chance for a critical hit. This attack charges on the first turn and executes on the second. If the user is holding a Power Herb or the weather is Primordial Sea or Rain Dance, the move completes in one turn.",
		shortDesc: "High critical. Charges and hits turn 2. No charge in rain.",
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['raindance', 'primordialsea'].includes(attacker.effectiveWeather())) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		type: "Flying",
	},
	poweruppunch: {
		inherit: true,
		basePower: 50,
	},
	noretreat: {
		inherit: true,
		desc: "Raises the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage and causes the Steel type to be added to the user, but it becomes prevented from switching out. The user can still switch out if it uses Baton Pass, Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch. If the user leaves the field using Baton Pass, the replacement will remain trapped. Fails if the user has already been prevented from switching by this effect.",
		shortDesc: "Raises all stats by 1. Traps user. + Steel type.",
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: No Retreat');
				if (pokemon.hasType('Steel')) return false;
				if (!pokemon.addType('Steel')) return false;
				this.add('-start', pokemon, 'typeadd', 'Steel', '[from] move: No Retreat');
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
		},
	},
	ragefist: {
		inherit: true,
		type: "Fighting",
	},
	hyperdrill: {
		inherit: true,
		shortDesc: "Bypasses protection. 100% lower target Defense.",
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
	},
	chatter: {
		inherit: true,
		type: "Sound",
		basePower: 75,
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',
		},
	},
	ominouswind: {
		inherit: true,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1},
	},
	silverwind: {
		inherit: true,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1},
	},
	whirlwind: {
		inherit: true,
		type: "Flying",
	},
	hyperspacehole: {
		inherit: true,
		basePower: 100,
	},
	bloodmoon: {
		inherit: true,
		type: "Psychic",
	},
	smellingsalts: {
		inherit: true,
		type: "Rock",
		basePower: 70,
	},
	wakeupslap: {
		inherit: true,
		basePower: 70,
	},
	magnetbomb: {
		inherit: true,
		desc: "This move does not check accuracy. This move's type effectiveness against Steel is changed to be super effective no matter what this move's type is.",
		shortDesc: "Does not check accuracy. Super effective on Steel.",
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		type: "Electric",
	},
	pyroball: {
		inherit: true,
		desc: "Has a 100% chance to burn the target.",
		shortDesc: "100% chance to burn the target. Thaws user.",
		basePower: 60,
		secondary: {
			chance: 100,
			status: 'brn',
		},
	},
	aquastep: {
		inherit: true,
		desc: "If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field. Has a 100% chance to raise the user's Speed by 1 stage.",
		shortDesc: "Free user from hazards/bind/Leech Seed; +1 Spe.",
		basePower: 50,
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
	},
	ceaselessedge: {
		inherit: true,
		basePower: 50,
	},
	stoneaxe: {
		inherit: true,
		basePower: 50,
	},
	strangesteam: {
		inherit: true,
		basePower: 75,
		secondary: {
			chance: 100,
			volatileStatus: 'torment',
		},
		desc: "Applies Torment on the target.",
		shortDesc: "Applies Torment on the target.",
	},

	// Move Base Power updates

	absorb: {
		inherit: true,
		pp: 25,
	},
	megadrain: {
		inherit: true,
		pp: 20,
	},
	stockpile: {
		inherit: true,
		pp: 20,
	},
	acidarmor: {
		inherit: true,
		pp: 20,
	},
	barrier: {
		inherit: true,
		pp: 20,
	},
	extrasensory: {
		inherit: true,
		pp: 20,
	},
	minimize: {
		inherit: true,
		pp: 10,
	},
	submission: {
		inherit: true,
		pp: 15,
		basePower: 90,
		accuracy: 100,
	},
	swordsdance: {
		inherit: true,
		pp: 20,
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
	leafblade: {
		inherit: true,
		basePower: 90,
	},
	outrage: {
		inherit: true,
		basePower: 120,
		pp: 10,
	},
	rocksmash: {
		inherit: true,
		basePower: 60,
	},
	zapcannon: {
		inherit: true,
		basePower: 120,
	},
	inferno: {
		inherit: true,
		basePower: 120,
	},
	bulletseed: {
		inherit: true,
		basePower: 25,
	},
	covet: {
		inherit: true,
		basePower: 60,
		pp: 25,
	},
	doomdesire: {
		inherit: true,
		basePower: 140,
		accuracy: 100,
	},
	drainpunch: {
		inherit: true,
		pp: 10,
		basePower: 75,
	},
	firespin: {
		inherit: true,
		basePower: 35,
		accuracy: 85,
	},
	gigadrain: {
		inherit: true,
		pp: 10,
		basePower: 75,
	},
	highjumpkick: {
		inherit: true,
		basePower: 130,
		pp: 10,
		desc: "If this attack is not successful, the user loses half of its maximum HP, rounded down, as crash damage. Pokemon with the Magic Guard Ability are unaffected by crash damage.",
		shortDesc: "User is hurt by 50% of its max HP if it misses.",
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('High Jump Kick'));
		},
	},
	iciclespear: {
		inherit: true,
		basePower: 25,
	},
	jumpkick: {
		inherit: true,
		basePower: 100,
		pp: 10,
		desc: "If this attack is not successful, the user loses half of its maximum HP, rounded down, as crash damage. Pokemon with the Magic Guard Ability are unaffected by crash damage.",
		shortDesc: "User is hurt by 50% of its max HP if it misses.",
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('Jump Kick'));
		},
	},
	petaldance: {
		inherit: true,
		basePower: 120,
		pp: 10,
	},
	sandtomb: {
		inherit: true,
		basePower: 35,
		accuracy: 85,
	},
	thrash: {
		inherit: true,
		basePower: 120,
		pp: 10,
	},
	uproar: {
		inherit: true,
		basePower: 120,
		type: "Sound",
	},
	whirlpool: {
		inherit: true,
		basePower: 35,
		accuracy: 85,
	},
	aircutter: {
		inherit: true,
		basePower: 60,
	},
	clamp: {
		inherit: true,
		accuracy: 85,
		pp: 15,
	},
	cottonspore: {
		inherit: true,
		accuracy: 100,
	},
	crabhammer: {
		inherit: true,
		basePower: 100,
		accuracy: 90,
	},
	energyball: {
		inherit: true,
		basePower: 90,
	},
	fireblast: {
		inherit: true,
		basePower: 110,
	},
	flamethrower: {
		inherit: true,
		basePower: 90,
	},
	furycutter: {
		inherit: true,
		basePower: 40,
	},
	futuresight: {
		inherit: true,
		basePower: 120,
		accuracy: 100,
		pp: 10,
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
	heatwave: {
		inherit: true,
		basePower: 95,
	},
	hurricane: {
		inherit: true,
		basePower: 110,
	},
	hydropump: {
		inherit: true,
		basePower: 110,
	},
	icebeam: {
		inherit: true,
		basePower: 90,
	},
	leafstorm: {
		inherit: true,
		basePower: 130,
	},
	lick: {
		inherit: true,
		basePower: 30,
	},
	lowsweep: {
		inherit: true,
		basePower: 65,
	},
	magmastorm: {
		inherit: true,
		basePower: 100,
		accuracy: 75,
	},
	meteormash: {
		inherit: true,
		basePower: 90,
		accuracy: 90,
	},
	muddywater: {
		inherit: true,
		basePower: 90,
	},
	overheat: {
		inherit: true,
		basePower: 130,
	},
	pinmissile: {
		inherit: true,
		basePower: 25,
		accuracy: 95,
	},
	smog: {
		inherit: true,
		basePower: 30,
	},
	surf: {
		inherit: true,
		basePower: 90,
	},
	thief: {
		inherit: true,
		basePower: 60,
		pp: 25,
	},
	thunder: {
		inherit: true,
		basePower: 110,
	},
	thunderbolt: {
		inherit: true,
		basePower: 90,
	},
	vinewhip: {
		inherit: true,
		basePower: 45,
		pp: 25,
	},
	leechlife: {
		inherit: true,
		basePower: 75,
		pp: 10,
	},
	mysticalfire: {
		inherit: true,
		basePower: 75,
	},
	paraboliccharge: {
		inherit: true,
		basePower: 75,
	},
	suckerpunch: {
		inherit: true,
		basePower: 70,
	},
	tackle: {
		inherit: true,
		basePower: 40,
		accuracy: 100,
	},
	rockblast: {
		inherit: true,
		accuracy: 90,
	},
	willowisp: {
		inherit: true,
		accuracy: 85,
	},
	psywave: {
		inherit: true,
		accuracy: 100,
	},
	psychoshift: {
		inherit: true,
		accuracy: 100,
	},
	gunkshot: {
		inherit: true,
		accuracy: 80
	},
	glare: {
		inherit: true,
		type: "Dark",
		accuracy: 100,
		ignoreImmunity: true,
	},
	swagger: {
		inherit: true,
		accuracy: 85,
	},
	bind: {
		inherit: true,
		type: "Fighting",
		accuracy: 85,
	},
	wrap: {
		inherit: true,
		accuracy: 90,
	},
	lifedew: {
		inherit: true,
		desc: "Each Pokemon on the user's side restores 1/3 of its maximum HP, rounded half up.",
		shortDesc: "Heals the user and its allies by 1/3 their max HP.",
		heal: [1, 3],
	},
	axekick: {
		inherit: true,
		type: "Dark",
	},
	frostbreath: {
		inherit: true,
		basePower: 60,
	},
	razorshell: {
		inherit: true,
		desc: "Has a 100% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "100% chance to lower the target's Sp. Def by 1.",
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
	},
	firelash: {
		inherit: true,
		desc: "Has a 100% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "100% chance to lower the target's Sp. Def by 1.",
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
	},
	aurawheel: {
		inherit: true,
		basePower: 90,
		onTry(source) {
			return;
		},
		onModifyType(move, pokemon) {
			return;
		},
		desc: "Has a 100% chance to raise the user's Speed by 1 stage.",
		shortDesc: "100% chance to raise the user's Speed by 1.",
	},
	hiddenpower: {
		inherit: true,
		basePower: 60,
		onModifyMove(move, pokemon) {
			move.type = pokemon.hpType || 'Dark';
			const specialTypes = ['Fire', 'Water', 'Grass', 'Ice', 'Electric', 'Psychic', 'Ghost', 'Fairy', 'Sound'];
			move.category = specialTypes.includes(move.type) ? 'Special' : 'Physical';
		},
		basePowerCallback(pokemon) {
			return 60;
		},
	},
	hiddenpowerbug: {
		inherit: true,
		basePower: 60,
	},
	hiddenpowerdark: {
		inherit: true,
		basePower: 60,
	},
	hiddenpowerdragon: {
		inherit: true,
		basePower: 60,
	},
	hiddenpowerelectric: {
		inherit: true,
		basePower: 60,
	},
	hiddenpowerfighting: {
		inherit: true,
		basePower: 60,
	},
	hiddenpowerfire: {
		inherit: true,
		basePower: 60,
	},
	hiddenpowerflying: {
		inherit: true,
		basePower: 60,
	},
	hiddenpowerghost: {
		inherit: true,
		basePower: 60,
	},
	hiddenpowergrass: {
		inherit: true,
		basePower: 60,
	},
	hiddenpowerground: {
		inherit: true,
		basePower: 60,
	},
	hiddenpowerice: {
		inherit: true,
		basePower: 60,
	},
	hiddenpowerpoison: {
		inherit: true,
		basePower: 60,
	},
	hiddenpowerpsychic: {
		inherit: true,
		basePower: 60,
	},
	hiddenpowerrock: {
		inherit: true,
		basePower: 60,
	},
	hiddenpowersteel: {
		inherit: true,
		basePower: 60,
	},
	hiddenpowerwater: {
		inherit: true,
		basePower: 60,
	},

	hivecrash: {
		inherit: true,
		isNonstandard: null,
		recoil: [1, 3],
	},
};