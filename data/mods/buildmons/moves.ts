import { ModdedMoveData } from "../../../sim/dex-moves";

export const Moves: {[k: string]: ModdedMoveData} = {
	bestow: {
		inherit: true,
		isNonstandard: "Future",
	},
	corrosivegas: {
		inherit: true,
		isNonstandard: "Future",
	},
	covet: {
		inherit: true,
		isNonstandard: "Future",
	},
	fling: {
		inherit: true,
		isNonstandard: "Future",
	},
	switcheroo: {
		inherit: true,
		isNonstandard: "Future",
	},
	thief: {
		inherit: true,
		isNonstandard: "Future",
	},
	trick: {
		inherit: true,
		isNonstandard: "Future",
	},
	
	metronome: {
		inherit: true,
		isNonstandard: "Future",
	},
	
	electricterrain: {
		inherit: true,
		condition: {
			inherit: true,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Flying' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('move weakened by electric terrain');
					return this.chainModify(0.75);
				}
				if (move.type === 'Electric' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('electric terrain boost');
					return this.chainModify(1.1);
				}
			},
			onResidual(target, source, effect) {
				if (target.types.includes('Electric') && target.isGrounded() && !target.isSemiInvulnerable()) target.addVolatile("charge");
			},
		},
		desc: "For 5 turns, the terrain becomes Electric Terrain. During the effect, the power of Electric-type attacks made by grounded Pokemon is multiplied by 1.3 and grounded Pokemon cannot fall asleep and ground Electric-type Pokemon get the effect of Charge at the end of every turn; Pokemon already asleep do not wake up. Grounded Pokemon cannot become affected by Yawn or fall asleep from its effect. Camouflage transforms the user into an Electric type, Nature Power becomes Thunderbolt, and Secret Power has a 30% chance to cause paralysis. Fails if the current terrain is Electric Terrain.",
		shortDesc: "5 turns. Grounded: +Electric power, Electric get charge.",
	},
	grassyterrain: {
		inherit: true,
		condition: {
			inherit: true,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Ground' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('move weakened by grassy terrain');
					return this.chainModify(0.75);
				}
				if (move.type === 'Grass' && attacker.isGrounded()) {
					this.debug('grassy terrain boost');
					return this.chainModify(1.1);
				}
			},
			onResidual(pokemon) {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.heal(pokemon.baseMaxhp / 20, pokemon, pokemon);
				} else {
					this.debug(`Pokemon semi-invuln or not grounded; Grassy Terrain skipped`);
				}
			},
		},
	},
	mistyterrain: {
		inherit: true,
		condition: {
			inherit: true,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Dragon' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('move weakened by misty terrain');
					return this.chainModify(0.75);
				}
				if (move.type === 'Fairy' && attacker.isGrounded()) {
					this.debug('misty terrain boost');
					return this.chainModify(1.1);
				}
			},
		},
	},
	psychicterrain: {
		inherit: true,
		condition: {
			inherit: true,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Fighting' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('move weakened by psychic terrain');
					return this.chainModify(0.75);
				}
				if (move.type === 'Psychic' && attacker.isGrounded()) {
					this.debug('psychic terrain boost');
					return this.chainModify(1.1);
				}
			},
		},
	},

	knockoff: {
		inherit: true,
		desc: "If the target is holding an item, this move's power is multiplied by 1.5.",
		shortDesc: "1.5x damage if foe holds an item.",
		basePower: 60,
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) { return },
	},
	spikes: {
		inherit: true,
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Can be used up to three times before failing. Opponents lose 5% of their maximum HP with one layer, 10% of their maximum HP with two layers, and 15% of their maximum HP with three layers, all rounded down. Can be removed from the opposing side if any Pokemon uses Tidy Up, or if any opposing Pokemon uses Mortal Spin, Rapid Spin, or Defog successfully, or is hit by Defog.",
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots')) return;
				const damageAmounts = [0, 1, 2, 3]; // 5%, 10%, 15%
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 20);
			},
		},
	},

	armthrust: {
		inherit: true,
		basePower: 25,
	},
	belch: {
		inherit: true,
		flags: { protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1, sound: 1 },
		onDisableMove(pokemon) {
			if (pokemon.hp < pokemon.maxhp / 2) pokemon.disableMove('belch');
		},
		desc: "Cannot be selected if the user is below 50% HP.",
		shortDesc: "Cannot be selected if the user is below 50% HP.",
	},
	charge: {
		inherit: true,
		condition: {
			inherit: true,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric') {
					this.debug('charge boost');
					return this.chainModify(1.35);
				}
			},
			onModifyMovePriority: 1,
			onModifyMove(move, pokemon, target) {
				if (move.type === 'Electric') move.recoil = [1, 2];
			},
		},
		desc: "Raises the user's Special Defense by 1 stage. The user's next Electric-type attack will have 1.35x power; the effect ends when the user is no longer active, or after the user attempts to use any Electric-type move besides Charge, even if it is not successful.",
		shortDesc: "+1 SpD, user's next Electric move 1.35x power.",
	},
	crushclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	direclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	dragonbreath: {
		inherit: true,
		basePower: 75,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
		secondary: {
			chance: 70,
			status: 'brn',
		},
		target: "allAdjacent",
		shortDesc: "Hits adjacent. 70% chance to burn the target.",
	},
	dragonclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	dreameater: {
		inherit: true,
		desc: "The target is unaffected by this move unless it or the user is asleep. The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User gains 1/2 HP inflicted. Sleeping target/user.",
		sleepUsable: true,
		onTryImmunity(target, source) {
			return target.status === 'slp' || target.hasAbility('comatose') || source.status === 'slp' || source.hasAbility('comatose');
		},
	},
	drillpeck: {
		inherit: true,
		desc: "Has a 30% chance to bleed the target and a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio. 30% chance to bleed.",
		secondary: {
			chance: 30,
			status: 'bld',
		},
		critRatio: 2,
	},
	electroball: {
		inherit: true,
		basePower: 80,
		category: "Physical",
		basePowerCallback(pokemon, target, move) { const bp = move.basePower; return bp; },
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'electroball',
				source,
				moveData: {
					id: 'electroball',
					name: "Electro Ball",
					accuracy: 100,
					basePower: 80,
					category: "Physical",
					priority: 0,
					flags: { bullet: 1, allyanim: 1, metronome: 1, futuremove: 1 },
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Electric',
					secondary: {
						chance: 100,
						status: 'par',
					},
				},
			});
			//this.add('-start', source, 'move: Electro Ball', );
			return this.NOT_FAIL;
		},
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1, allyanim: 1, futuremove: 1 },
		desc: "Deals damage one turn after this move is used. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if this move or Doom Desire is already in effect for the target's position. When the move hits it has a 100% chance to paralyze the target.",
		shortDesc: "Hits next turn and paralyzes target.",
	},
	fairywind: {
		inherit: true,
		basePower: 80,
	},
	fireblast: {
		inherit: true,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
	},
	flamethrower: {
		inherit: true,
		basePower: 10,
		multihit: 10,
		desc: "Hits 10 times. Each hit has a 10% chance to burn.",
		shortDesc: "Hits 10 times. 10% chance to burn.",
	},
	flashcannon: {
		inherit: true,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
	},
	glare: {
		inherit: true,
		status: 'ptr',
		desc: "Petrifies the target.",
		shortDesc: "Petrifies the target.",
	},
	metalclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	moonblast: {
		inherit: true,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
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
	octazooka: {
		inherit: true,
		desc: "Has a 30% chance to wet the target.",
		shortDesc: "30% chance to wet.",
		basePower: 90,
		accuracy: 95,
		secondary: {
			chance: 30,
			status: 'wet',
		},
	},
	ominouswind: {
		inherit: true,
		flags: { protect: 1, mirror: 1, metronome: 1, wind: 1 },
	},
	powdersnow: {
		inherit: true,
		basePower: 75,
		flags: { protect: 1, mirror: 1, metronome: 1, powder: 1 },
		secondary: {
			chance: 30,
			status: 'frz',
		},
		desc: "Has a 30% chance to freeze the target.",
		shortDesc: "30% chance to freeze the foe(s).",
	},
	protect: {
		inherit: true,
		stallingMove: false,
		volatileStatus: undefined,
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			if (pokemon.volatiles["protect"]) this.effectState.stacks++;
			else pokemon.addVolatile("protect");
		},
		condition: {
			duration: 0,
			onStart(target) {
				this.effectState.stacks = 1;
				this.add('-start', target, 'Protect', this.effectState.stacks);
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
				target.getMoveHitData(move).bypassProtect = true;
				this.add('-end', target, 'Protect', this.effectState.stacks);
				this.effectState.stacks--;
				this.add('-start', target, 'Protect', this.effectState.stacks);
				return;
			},
			onUpdate(pokemon) {
				if (this.effectState.stacks <= 0) pokemon.removeVolatile("protect");
			},
		},
		desc: "Halves damage taken. Each use adds a stack which increases number of uses before breaking.",
		shortDesc: "Halves damage taken. Each use adds a stack which increases uses.",
	},
	razorwind: {
		inherit: true,
		type: "Steel",
		onTryMove(attacker, defender, move) {},
		secondary: {
			chance: 30,
			status: 'bld',
		},
		flags: { protect: 1, mirror: 1, metronome: 1, wind: 1 },
		desc: "Has a 30% chance to bleed the target and a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio. 30% chance to bleed.",
	},
	rest: {
		inherit: true,
		onHit(target, source, move) {
			const result = target.setStatus('slp', source, move);
			if (!result) return result;
			target.statusState.time = target.hasItem('comfypillow') ? 5 : 3;
			target.statusState.startTime = target.hasItem('comfypillow') ? 5 : 3;
			this.heal(target.maxhp); // Aesthetic only as the healing happens after you fall asleep in-game
		},
	},
	rockclimb: {
		inherit: true,
		self: {
			volatileStatus: 'magnetrise',
		},
		type: "Rock",
		desc: "Has a 20% chance to confuse the target. The becomes ungrounded if the move hits.",
		shortDesc: "20% chance to confuse target. Ungrounds user.",
	},
	silverwind: {
		inherit: true,
		flags: { protect: 1, mirror: 1, metronome: 1, wind: 1 },
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
	shadowclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	snore: {
		inherit: true,
		basePower: 95,
	},
	spotlight: {
		inherit: true,
		condition: {
			inherit: true,
			onAnyAccuracy(accuracy, target, source, move) {
				if (target.volatiles['spotlight']) {
					return true;
				}
				return accuracy;
			},
		},
	},
	stoneedge: {
		inherit: true,
		flags: { protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	tripleaxel: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, dance: 1 },
	},
	
	asteroidbelt: {
		accuracy: 90,
		basePower: 25,
		category: "Special",
		name: "Asteroid Belt",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		multihit: [2, 5],
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Rock",
		desc: "Hits two to five times, with each hit having a 10% chance to burn the target. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times. If the user is holding Loaded Dice, this move will hit 4-5 times.",
		shortDesc: "Hits 2-5 times in one turn. 10% chance to burn.",
	},
	chistrike: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Chi Strike",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "allAdjacent",
		type: "Fighting",
		desc: "Has a 30% chance to paralyze the target.",
		shortDesc: "30% chance to paralyze adjacent Pokemon.",
	},
	chromaclaw: {
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Chroma Claw",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
		critRatio: 2,
		onModifyType(move, source, target) {
			const types = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];
			move.type = this.sample(types);
		},
		target: "normal",
		type: "Normal",
		shortDesc: "Random type. High crit ratio.",
	},
	counterattack: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Counterattack",
		pp: 20,
		priority: 1,
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1 },
		volatileStatus: 'counterattack',
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Counterattack');
			},
			onHit(pokemon, source, move) {
				this.damage(pokemon.lastDamage, source);
			},
		},
		target: "self",
		type: "Fighting",
		shortDesc: "Returns direct damage taken until end of turn.",
	},
	dartthrow: {
		accuracy: 90,
		basePower: 25,
		category: "Physical",
		name: "Dart Throw",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1, slicing: 1 },
		multihit: [2, 5],
		target: "normal",
		type: "Flying",
		desc: "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times. If the user is holding Loaded Dice, this move will hit 4-5 times.",
		shortDesc: "Hits 2-5 times in one turn.",
	},
	deepfreeze: {
		inherit: true,
		isNonstandard: null,
	},
	fightingterrain: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fighting Terrain",
		pp: 10,
		priority: 0,
		flags: { nonsky: 1, metronome: 1 },
		terrain: 'fightingterrain',
		condition: {
			effectType: 'Terrain',
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onCriticalHit(pokemon, source, move) {
				if (move.type === "Fighting") return true;
				return false;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Psychic' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('move weakened by fighting terrain');
					return this.chainModify(0.75);
				}
				if (move.type === 'Fighting' && attacker.isGrounded()) {
					this.debug('fighting terrain boost');
					return this.chainModify(1.1);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Fighting Terrain', '[from] ability: ' + effect.name, `[of] ${source}`);
				} else {
					this.add('-fieldstart', 'move: Fighting Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Fighting Terrain');
			},
		},
		target: "all",
		type: "Fighting",
		shortDesc: "5 turns. Grounded: +Fighting power, only Fighting moves can crit.",
	},
	frostbite: {
		inherit: true,
		isNonstandard: null,
	},
	fulmination: {
		accuracy: 100,
		basePower: 80,
		onHit(target, source, move) {
			if (source.volatiles['charge']) {
				for (const enemies of target.adjacentAllies()) {
					this.damage(target.lastDamage / 2, enemies, source, move);
				}
			}
		},
		category: "Physical",
		name: "Fulmination",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Electric",
		shortDesc: "If user has charge chains for 50% dmg.",
	},
	gravityrush: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Gravity Rush",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, contact: 1 },
		volatileStatus: 'telekinesis',
		target: "normal",
		type: "Psychic",
		shortDesc: "Ungrounds the target.",
	},
	heatsink: {
		accuracy: 100,
		basePower: 75,
		onModifyMove(move, source, target) {
			if (target?.status === 'brn') {
				move.drain = [1, 1];
			}
		},
		category: "Special",
		name: "Heat Sink",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, heal: 1 },
		drain: [1, 2],
		target: "normal",
		type: "Fire",
		shortDesc: "50% drain. 100% drain if target is Burned.",
	},
	iceterrain: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ice Terrain",
		pp: 10,
		priority: 0,
		flags: { nonsky: 1, metronome: 1 },
		terrain: 'iceterrain',
		condition: {
			effectType: 'Terrain',
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Psychic' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('move weakened by ice terrain');
					return this.chainModify(0.75);
				}
				if (move.type === 'Ice' && attacker.isGrounded()) {
					this.debug('ice terrain boost');
					return this.chainModify(1.1);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Ice Terrain', '[from] ability: ' + effect.name, `[of] ${source}`);
				} else {
					this.add('-fieldstart', 'move: Ice Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Ice Terrain');
			},
		},
		target: "all",
		type: "Ice",
		shortDesc: "5 turns. Grounded: +Ice power.",
	},
	icywhip: {
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		name: "Icy Whip",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		onHit(target, source, move) {
			target.damage(target.baseMaxhp / 15, source, move);
		},
		target: "normal",
		type: "Ice",
		shortDesc: "Deals an additional 7.5% damage.",
	},
	morningstar: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Morning Star",
		pp: 10,
		priority: 2,
		flags: { bullet: 1, contact: 1, protect: 1, mirror: 1, metronome: 1 },
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Morning Star only works on your first turn out.");
				return false;
			}
		},
		target: "normal",
		type: "Steel",
		desc: "Fails unless it is the user's first turn on the field.",
		shortDesc: "Nearly always goes first. First turn out only.",
	},
	piledriver: {
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		name: "Piledriver",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, nonsky: 1, metronome: 1, contact: 1 },
		volatileStatus: 'smackdown',
		target: "normal",
		type: "Fighting",
		desc: "This move can hit a target using Bounce, Fly, or Sky Drop, or is under the effect of Sky Drop. If this move hits a target under the effect of Bounce, Fly, Magnet Rise, or Telekinesis, the effect ends. If the target is a Flying type that has not used Roost this turn or a Pokemon with the Levitate Ability, it loses its immunity to Ground-type attacks and the Arena Trap Ability as long as it remains active. During the effect, Magnet Rise fails for the target and Telekinesis fails against the target.",
		shortDesc: "Removes the target's Ground immunity.",
	},
	quicksand: {
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Quicksand",
		pp: 30,
		priority: 1,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Ground",
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
	},
	rockcrunch: {
		inherit: true,
		isNonstandard: null,
	},
	signalflare: {
		accuracy: true,
		basePower: 70,
		category: "Special",
		name: "Signal Flare",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
		onHit(target, source, move) {
			target.addVolatile('spotlight');
		},
		target: "normal",
		type: "Fire",
		shortDesc: "Applies Spotlight on target.",
	},
	soulchomp: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		overrideDefensiveStat: 'spd',
		name: "Soul Chomp",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, contact: 1, bite: 1 },
		target: "normal",
		type: "Ghost",
		desc: "Deals damage to the target based on its Special Defense instead of Defense.",
		shortDesc: "Damages target based on Sp. Def, not Defense.",
	},
	steelterrain: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Steel Terrain",
		pp: 10,
		priority: 0,
		flags: { nonsky: 1, metronome: 1 },
		terrain: 'steelterrain',
		condition: {
			effectType: 'Terrain',
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Fairy' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('move weakened by steel terrain');
					this.chainModify(0.75);
				}
				if (move.type === 'Steel' && attacker.isGrounded()) {
					this.debug('steel terrain boost');
					this.chainModify(1.1);
				}
				const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
				this.debug(`Base Power: ${basePowerAfterMultiplier}`);
				if (basePowerAfterMultiplier <= 60) {
					this.debug('Steel terrain boost');
					this.chainModify(1.25);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Steel Terrain', '[from] ability: ' + effect.name, `[of] ${source}`);
				} else {
					this.add('-fieldstart', 'move: Steel Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Steel Terrain');
			},
		},
		target: "all",
		type: "Steel",
		shortDesc: "5 turns. Grounded: +Steel power, 1.25x power on <= 60BP.",
	},
	stingerlance: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Stinger Lance",
		pp: 20,
		flags: { contact: 1, protect: 1, mirror: 1, distance: 1, metronome: 1 },
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness(move.type, type);
		},
		priority: 0,
		target: "any",
		type: "Bug",
		shortDesc: "Doubled type effectiveness.",
	},
	turret: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Turret",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, nonsky: 1, metronome: 1 },
		volatileStatus: 'turret',
		onTryHit(source) {
			if (source.volatiles['turret']) {
				this.add('-fail', source, 'move: Turret');
				return this.NOT_FAIL;
			}
			if (source.hp <= source.maxhp / 2 || source.maxhp === 1) { // Shedinja clause
				this.add('-fail', source, 'move: Turret', '[weak]');
				return this.NOT_FAIL;
			}
		},
		onHit(target) {
			this.directDamage(target.maxhp / 2);
		},
		condition: {
			onStart(target, source, effect) {
				this.add('-start', target, 'Turret');
				this.effectState.hp = Math.floor(target.maxhp / 2);
				if (target.volatiles['partiallytrapped']) {
					this.add('-end', target, target.volatiles['partiallytrapped'].sourceEffect, '[partiallytrapped]', '[silent]');
					delete target.volatiles['partiallytrapped'];
				}
			},
			onTryPrimaryHitPriority: -1,
			onTryPrimaryHit(target, source, move) {
				if (target === source || move.flags['bypasssub'] || move.infiltrates) {
					return;
				}
				target.types = ['Steel'];
				let damage = this.actions.getDamage(source, target, move);
				if (!damage && damage !== 0) {
					this.add('-fail', source);
					this.attrLastMove('[still]');
					return null;
				}
				if (damage > target.volatiles['turret'].hp) {
					damage = target.volatiles['turret'].hp as number;
				}
				target.volatiles['turret'].hp -= damage;
				source.lastDamage = damage;
				if (target.volatiles['turret'].hp <= 0) {
					if (move.ohko) this.add('-ohko');
					target.removeVolatile('turret');
				} else {
					this.add('-activate', target, 'move: Turret', '[damage]');
				}
				if (move.recoil || move.id === 'chloroblast') {
					this.damage(this.actions.calcRecoilDamage(damage, move, source), source, target, 'recoil');
				}
				if (move.drain) {
					this.heal(Math.ceil(damage * move.drain[0] / move.drain[1]), source, target, 'drain');
				}
				this.singleEvent('AfterSubDamage', move, null, target, source, move, damage);
				this.runEvent('AfterSubDamage', target, source, move, damage);
				return this.HIT_SUBSTITUTE;
			},
			onResidualOrder: 5,
			onResidual() {
				const source = this.effectState.source;
				if (!source || source.fainted) return;

				const move = this.dex.getActiveMove('flashcannon');
				move.target = 'randomNormal';

				this.actions.useMove(move, source);
			},
			onUpdate(pokemon) {
				pokemon.types = pokemon.baseSpecies.types;
			},
			onTryHeal() {
				return false;
			},
			onEnd(target) {
				this.add('-end', target, 'Turret');
				target.types = target.baseSpecies.types;
			},
		},
		target: "self",
		type: "Steel",
		desc: "The user takes 1/2 of its maximum HP, rounded down, and puts it into a turret to take its place in battle. The turret is removed once enough damage is inflicted on it, if the user switches out or faints, or if any Pokemon uses Tidy Up. Baton Pass can be used to transfer the turret to an ally, and the turret will keep its remaining HP. Until the turret is broken, it receives damage from all attacks made by other Pokemon and shields the user from status effects and stat stage changes caused by other Pokemon. Sound-based moves and Pokemon with the Infiltrator Ability ignore turrets. The user still takes normal damage from weather and status effects while behind its turret. If the turret breaks during a multi-hit attack, the user will take damage from any remaining hits. If a turret is created while the user is trapped by a binding move, the binding effect ends immediately. Fails if the user does not have enough HP remaining to create a turret without fainting, or if it already has a turret. Turrets have Steel-type effectiveness and use Flash Cannon on a random adjacent foe at the end of every turn they are active. While behind a Turret the user cannot heal by any means. The turret has Steel STAB even if the user does not.",
		shortDesc: "User takes 1/2 its max HP to put in a turret.",
	},
	wetslap: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Wet Slap",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 30,
			status: 'wet',
		},
		target: "normal",
		type: "Water",
		desc: "Has a 30% chance to wet the target.",
		shortDesc: "30% chance to wet the target.",
	},
};