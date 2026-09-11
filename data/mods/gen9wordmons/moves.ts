import { Moves as Base } from '../../moves';

export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	laserbeam: {
		num: 1,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Laser Beam",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		critRatio: 2,
		target: "normal",
		type: "Laser",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
	},
	conspiracy: {
		num: 2,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Conspiracy",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, sound: 1 },
		onEffectiveness(typeMod, target, type) {
			if (type === 'Herd') return 1;
		},
		target: "normal",
		type: "Proof",
		desc: "This move's type effectiveness against Herd is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Herd.",
	},
	enrage: {
		num: 3,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Enrage",
		pp: 20,
		priority: 0,
		flags: { snatch: 1, metronome: 1 },
		volatileStatus: 'enrage',
		condition: {
			duration: 3,
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Enrage');
			},
			onUpdate(pokemon) {
				if (this.effectState.source && !this.effectState.source.isActive) {
					pokemon.removeVolatile('enrage');
				}
			},
			onResidualOrder: 14,
			onResidual(pokemon) {
				this.boost({ atk: 1 }, pokemon, this.effectState.source);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Enrage', '[silent]');
			},
		},
		target: "self",
		type: "Rage",
		shortDesc: "Raises Attack by 1 for 3 turns.",
	},
	coblance: {
		num: 4,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Cob Lance",
		pp: 20,
		flags: { protect: 1, mirror: 1, distance: 1, metronome: 1, slicing: 1 },
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness(move.type, type);
		},
		priority: 0,
		target: "any",
		type: "Corn",
		shortDesc: "Doubled type effectiveness.",
	},
	kernelpop: {
		num: 5,
		accuracy: 100,
		basePower: 15,
		category: "Physical",
		name: "Kernel Pop",
		pp: 20,
		onBasePower(basePower, pokemon) {
			if (pokemon.status === 'brn') {
				return this.chainModify(2);
			}
		},
		flags: { protect: 1, mirror: 1, metronome: 1 },
		priority: 0,
		target: "any",
		type: "Corn",
		desc: "Hits two to five times. Power doubles if the user is burned. The physical damage halving effect from the user's burn is ignored.",
		shortDesc: "Hits 2-5 times. Power doubles if user is burnt.",
	},
	demolition: {
		num: 6,
		accuracy: 85,
		basePower: 180,
		category: "Physical",
		name: "Demolition",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		self: {
			boosts: {
				spe: -1,
				atk: -1,
				def: -1,
			},
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Building",
		shortDesc: "Lowers the user's Atk, Def, Speed by 1. Confuses the user.",
	},
	intervene: {
		num: 7,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Intervene",
		pp: 15,
		priority: 1,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || move.category !== 'Status') {
				return false;
			}
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Honor",
		shortDesc: "+1 prio. 100% -1 Spe. Only vs Status move.",
	},
	reap: {
		num: 8,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Reap",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
		critRatio: 2,
		target: "normal",
		type: "Corn",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
	},
	penance: {
		num: 9,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			if (this.queue.willMove(target)) {
				this.debug('Payback NOT boosted');
				return move.basePower;
			}
			this.debug('Payback damage boost');
			return move.basePower * 2;
		},
		category: "Physical",
		name: "Penance",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Bless",
		desc: "Power doubles if the user moves after the target this turn. Switching in counts as an action.",
		shortDesc: "Power doubles if the user moves after the target.",
	},
	deluge: {
		num: 10,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Deluge",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Drink",
		shortDesc: "No additional effect.",
	},
	battery: {
		num: 11,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Battery",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		self: {
			boosts: {
				atk: -2,
			},
		},
		target: "normal",
		type: "Rage",
		desc: "Lowers the user's Attack by 2 stages.",
		shortDesc: "Lowers the user's Attack by 2.",
	},
	flay: {
		num: 12,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Flay",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 50,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Bless",
		desc: "Has a 50% chance to lower the target's Defense by 1 stage.",
		shortDesc: "50% chance to lower the target's Defense by 1.",
	},
	stampede: {
		num: 13,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Stampede",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, failinstruct: 1 },
		self: {
			volatileStatus: 'lockedmove',
		},
		target: "randomNormal",
		type: "Herd",
		contestType: "Cool",
		desc: "The user spends two or three turns locked into this move and becomes confused immediately after its move on the last turn of the effect if it is not already. This move targets an opposing Pokemon at random on each turn. If the user is prevented from moving, is asleep at the beginning of a turn, or the attack is not successful against the target on the first turn of the effect or the second turn of a three-turn effect, the effect ends without causing confusion. If this move is called by Sleep Talk and the user is asleep, the move is used for one turn and does not confuse the user.",
		shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
	},
	rake: {
		num: 14,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Rake",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, slicing: 1 },
		secondary: {
			chance: 30,
			status: 'bld',
		},
		target: "allAdjacent",
		type: "Corn",
		desc: "Has a 30% chance to bleed the target.",
		shortDesc: "30% chance to bleed the target.",
	},
	monsoon: {
		num: 15,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Monsoon",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		target: "allAdjacentFoes",
		type: "Drink",
		shortDesc: "No additional effect.",
	},
	precipitation: {
		num: 16,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Precipitation",
		pp: 10,
		priority: 0,
		flags: { allyanim: 1, metronome: 1, futuremove: 1 },
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'precipitation',
				source,
				moveData: {
					id: 'precipitation',
					name: "Precipitation",
					accuracy: 100,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: { allyanim: 1, metronome: 1, futuremove: 1 },
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Drink',
				},
			});
			this.add('-start', source, 'move: Precipitation');
			return this.NOT_FAIL;
		},
		target: "normal",
		type: "Drink",
		desc: "Deals damage two turns after this move is used. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if this move or Doom Desire is already in effect for the target's position.",
		shortDesc: "Hits two turns after being used.",
	},
	smite: {
		num: 17,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Smite",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Bless",
		shortDesc: "No additional effect.",
	},
	warp: {
		num: 18,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Warp",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		selfSwitch: true,
		target: "normal",
		type: "Matter",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out after damaging the target.",
	},
	isolate: {
		num: 19,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Isolate",
		pp: 10,
		priority: 0,
		flags: { contact: 1, charge: 1, mirror: 1, metronome: 1, nosleeptalk: 1, noassist: 1, failinstruct: 1 },
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		condition: {
			duration: 2,
			onInvulnerability: false,
		},
		selfSwitch: true,
		target: "normal",
		type: "Rage",
		shortDesc: "Disappears turn 1. Hits turn 2. Switches out.",
	},
	voidbarrage: {
		num: 20,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Void Barrage",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		target: "allAdjacentFoes",
		type: "Matter",
		desc: "No additional effect.",
		shortDesc: "No additional effect. Hits adjacent foes.",
	},
	havoc: {
		num: 21,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Havoc",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Rage",
		desc: "Has a 10% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "10% chance to lower the target's Sp. Def by 1.",
	},
	ancestralflash: {
		num: 22,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Ancestral Flash",
		pp: 30,
		priority: 1,
		flags: { protect: 1, mirror: 1, punch: 1, metronome: 1 },
		target: "normal",
		type: "Biography",
		contestType: "Tough",
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
	},
	relax: {
		num: 23,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Relax",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, heal: 1, metronome: 1 },
		heal: [1, 2],
		target: "self",
		type: "Comfort",
		desc: "The user restores 1/2 of its maximum HP, rounded half up.",
		shortDesc: "Heals the user by 50% of its max HP.",
	},
	lasersword: {
		num: 24,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Laser Sword",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
		critRatio: 2,
		target: "normal",
		type: "Laser",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
	},
	seism: {
		num: 25,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Seism",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Building",
		desc: "Has a 10% chance to lower the target's Speed by 1 stage.",
		shortDesc: "10% chance to lower the target's Speed by 1.",
	},
	panic: {
		num: 26,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Panic",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1 },
		secondary: {
			chance: 100,
			volatileStatus: 'healblock',
		},
		target: "normal",
		type: "Herd",
		desc: "For 2 turns, the target is prevented from restoring any HP as long as it remains active. During the effect, healing and draining moves are unusable, and Abilities and items that grant healing will not heal the user. If an affected Pokemon uses Baton Pass, the replacement will remain unable to restore its HP. Pain Split and the Regenerator Ability are unaffected.",
		shortDesc: "For 2 turns, the target is prevented from healing.",
	},
	energydrain: {
		num: 27,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Energy Drain",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, heal: 1, metronome: 1 },
		drain: [1, 2],
		target: "normal",
		type: "Flexible",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
	},
	parry: {
		num: 28,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			const damagedByTarget = pokemon.attackedBy.some(
				p => p.source === target && p.damage > 0 && p.thisTurn
			);
			if (damagedByTarget) {
				this.debug(`BP doubled for getting hit by ${target}`);
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		name: "Parry",
		pp: 10,
		priority: -4,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Honor",
		desc: "Power doubles if the user was hit by the target this turn.",
		shortDesc: "Power doubles if user is damaged by the target.",
	},
	cauterize: {
		num: 29,
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) {
				this.debug('BP doubled from status condition');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		name: "Cauterize",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Fuel",
		desc: "Power doubles if the target has a non-volatile status condition.",
		shortDesc: "Power doubles if the target has a status ailment.",
	},
	desertwind: {
		num: 30,
		accuracy: 90,
		basePower: 95,
		category: "Special",
		name: "Desert Wind",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, wind: 1 },
		target: "allAdjacentFoes",
		type: "Pyramid",
		desc: "No additional effect.",
		shortDesc: "No additional effect. Hits adjacent foes.",
	},
	fireworks: {
		num: 31,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Fireworks",
		pp: 30,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
		multihit: [2, 5],
		target: "normal",
		type: "Fuel",
		desc: "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times. If the user is holding Loaded Dice, this move will hit 4-5 times.",
		shortDesc: "Hits 2-5 times in one turn.",
	},
	plasmacutter: {
		num: 32,
		accuracy: 100,
		basePower: 120,
		basePowerCallback(source, target, move) {
			const callerMoveId = move.sourceEffect || move.id;
			const moveSlot = callerMoveId === 'instruct' ? source.getMoveData(move.id) : source.getMoveData(callerMoveId);
			let bp;
			if (!moveSlot) {
				bp = 10;
			} else {
				bp = 10 + (10 * (moveSlot.pp - 1));
			}

			this.debug(`BP: ${bp}`);
			return bp;
		},
		category: "Physical",
		name: "Plasma Cutter",
		pp: 12,
		noPPBoosts: true,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, slicing: 1 },
		target: "normal",
		type: "Laser",
		shortDesc: "10 less BP for each PP used.",
	},
	sully: {
		num: 33,
		accuracy: 100,
		basePower: 80,
		onBasePower(basePower, pokemon, target) {
			if (target.positiveBoosts.length > 0) return this.chainModify(1.5);
		},
		category: "Physical",
		name: "Sully",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Biography",
		shortDesc: "1.5x power if the target has any stat boosts.",
	},
	cameraflash: {
		num: 34,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Camera Flash",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondaries: [
			{
				chance: 10,
				boosts: {
					spd: -1,
				},
			}, {
				chance: 20,
				boosts: {
					evasion: -1,
				},
			},
		],
		target: "normal",
		type: "Camera",
		shortDesc: "10% chance to drop SpD, 20% evasion.",
	},
	photoshoot: {
		num: 35,
		accuracy: 100,
		basePower: 20,
		category: "Special",
		name: "Photoshoot",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 50,
			boosts: {
				spd: -1,
			},
		},
		multihit: 3,
		target: "normal",
		type: "Camera",
		shortDesc: "Hits 3 times. Each hit has 50% chance to lower SpD.",
	},
	voidcall: {
		num: 36,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Void Call",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, snatch: 1 },
		onHit(pokemon) {
			const goodStat = pokemon.getBestStat(true, true);

			let badStat: StatIDExceptHP = 'atk';
			let badStatVal = pokemon.getStat(goodStat, true, true);
			const stats: StatIDExceptHP[] = ['atk', 'def', 'spa', 'spd', 'spe'];
			for (const i of stats) {
				if (pokemon.getStat(i, true, true) < badStatVal) {
					badStat = i;
					badStatVal = pokemon.getStat(i, true, true);
				}
			}

			if (pokemon.boosts[goodStat] >= 6 && pokemon.boosts[badStat] <= -6) return false;
			this.boost({ [goodStat]: 1, [badStat]: 1 }, pokemon);
		},
		target: "self",
		type: "Matter",
		shortDesc: "Raises user's highest and lowest stat by 1 stage.",
	},
	wither: {
		num: 37,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		name: "Wither",
		pp: 20,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, metronome: 1 },
		status: 'rot',
		target: "normal",
		type: "Pyramid",
		shortDesc: "Rots the target.",
	},
	ancientscythe: {
		num: 38,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Ancient Scythe",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1, slicing: 1 },
		drain: [1, 2],
		target: "normal",
		type: "Pyramid",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
	},
	bananasplit: {
		num: 39,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Banana Split",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onModifyType(move, pokemon, target) {
			if (move.hit === 2) {
				move.type = "Drink";
			}
		},
		multihit: 2,
		target: "normal",
		type: "Corn",
		shortDesc: "Hits twice. 1st hit Corn, 2nd Drink.",
	},
	bandageup: {
		num: 40,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Bandage Up",
		pp: 10,
		priority: 0,
		flags: { heal: 1, bypasssub: 1 },
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			return pokemon.cureStatus() || success;
		},
		target: "self",
		type: "Pyramid",
		shortDesc: "User is healed 1/4 max HP, status cured.",
	},
	boast: {
		num: 41,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Boast",
		pp: 30,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, metronome: 1 },
		onHit(target, source) {
			this.boost({ def: -1 }, target, source);
			this.boost({ atk: 1 }, source, source);
		},
		target: "normal",
		type: "Legend",
		shortDesc: "Raises Attack by 1. Lowers foe Defense by 1.",
	},
	lensbash: {
		num: 42,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		overrideDefensiveStat: 'spd',
		name: "Lens Bash",
		pp: 10,
		priority: 0,
		flags: { contact:1, protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Camera",
		desc: "Deals damage to the target based on its Special Defense instead of Defense.",
		shortDesc: "Damages target based on Sp. Def, not Defense.",
	},
	hailmary: {
		num: 43,
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon) {
			const damage = pokemon.maxhp - pokemon.hp;
			return damage;
		},
		category: "Special",
		name: "Hail Mary",
		pp: 5,
		priority: 0,
		flags: { protect: 1, metronome: 1, noparentalbond: 1 },
		target: "normal",
		type: "Bless",
		shortDesc: "Does damage equal to the user's missing HP.",
	},
};

for (const moves in Base) {
	const key = moves as keyof typeof Moves;
	if (!Moves[key]) Moves[key] = {inherit: true, isNonstandard: "Custom"};
}