export const Moves: {[k: string]: ModdedMoveData} = {
	charm: {
		inherit: true,
		type: "Fairy",
	},
	moonlight: {
		inherit: true,
		type: "Fairy",
	},
	sweetkiss: {
		inherit: true,
		type: "Fairy",
	},
	futuresight: {
		inherit: true,
		basePower: 120,
		accuracy: 100,
	},
	metalclaw: {
		inherit: true,
		basePower: 70,
	},
	suckerpunch: {
		inherit: true,
		gen: 3,
		basePower: 60,
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
		basePower: 100,
	},
	thrash: {
		inherit: true,
		basePower: 100,
	},
	petaldance: {
		inherit: true,
		basePower: 100,
	},
	drainingkiss: {
		inherit: true,
		desc: "The user recovers 1/2 the HP lost by the target, rounded down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		drain: [1, 2],
		gen: 3,
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
	bugbite: {
		inherit: true,
		gen: 3,
		onHit(target, source) {},
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
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
		onTry(source, target) {},
		desc: "If this move is successful, it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally.",
		shortDesc: "Nullifies Detect, Protect, and Quick/Wide Guard.",
	},
	armthrust: {
		inherit: true,
		basePower: 20,
	},
	bulletseed: {
		inherit: true,
		basePower: 20,
	},
	iciclespear: {
		inherit: true,
		basePower: 20,
	},
	pinmissile: {
		inherit: true,
		basePower: 20,
	},
	triplekick: {
		inherit: true,
		basePower: 20,
	},
	doublekick: {
		inherit: true,
		basePower: 40,
		accuracy: 90,
	},
	hypervoice: {
		inherit: true,
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
	snarl: {
		inherit: true,
		gen: 3,
		flags: {protect: 1, mirror: 1, sound: 1},
	},
	uturn: {
		inherit: true,
		gen: 3,
		type: "Normal",
		basePower: 40,
	},
	voltswitch: {
		inherit: true,
		gen: 3,
		basePower: 40,
	},
	leechlife: {
		inherit: true,
		basePower: 60,
	},
	twineedle: {
		inherit: true,
		basePower: 40,
		accuracy: 90,
	},
	shellsmash: {
		inherit: true,
		desc: "Lowers the user's Defense and Special Defense by 1 stage. Raises the user's Attack, Special Attack, and Speed by 1 stages.",
		shortDesc: "Lowers Def, SpD by 1; raises Atk, SpA, Spe by 1.",
		boosts: {
			def: -1,
			spd: -1,
			atk: 1,
			spa: 1,
			spe: 1,
		},
		type: "Water",
		gen: 3,
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
		basePower: 110,
		desc: "If this attack is not successful, the user loses half of its maximum HP, rounded down, as crash damage. Pokemon with the Magic Guard Ability are unaffected by crash damage.",
		shortDesc: "User is hurt by 50% of its max HP if it misses.",
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('High Jump Kick'));
		},
	},
	jumpkick: {
		inherit: true,
		basePower: 90,
		desc: "If this attack is not successful, the user loses half of its maximum HP, rounded down, as crash damage. Pokemon with the Magic Guard Ability are unaffected by crash damage.",
		shortDesc: "User is hurt by 50% of its max HP if it misses.",
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('Jump Kick'));
		},
	},
	stealthrock: {
		inherit: true,
		gen: 3,
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in. Fails if the effect is already active on the opposing side. Foes lose 1/8 or 1/2 of their maximum HP, rounded down, based on wheter they are Flying-type or not. Can be removed from the opposing side if any opposing Pokemon uses Mortal Spin, Rapid Spin, or Defog successfully, or is hit by Defog.",
		shortDesc: "Hurts foes on switch-in. Double damage on Flying.",
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
	
				// Check if the Pokemon is Flying type
				if (pokemon.hasType('Flying')) {
					this.damage(pokemon.maxhp / 4); // Double damage for Flying types (25% of max HP)
				} else {
					this.damage(pokemon.maxhp / 8); // Neutral damage for other types (12.5% of max HP)
				}
			},
		},
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
	forcepunch: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	weatherdance: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
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
			if (move.type === 'Psychic' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
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
	hammerarm: {
		inherit: true,
		gen: 3,
	},
	xscissor: {
		inherit: true,
		gen: 3,
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
	},
	energyball: {
		inherit: true,
		gen: 3,
		basePower: 80,
	},
	thunderwave: {
		inherit: true,
		accuracy: 90,
	},
	steelroller: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Steel Roller",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onHit() {
			this.field.clearTerrain();
		},
		onAfterSubDamage() {
			this.field.clearTerrain();
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		gen: 3,
		desc: "Ends the effects of Electric Terrain, Grassy Terrain, Misty Terrain, and Psychic Terrain.",
		shortDesc: "Ends the effects of terrain.",
	},
	metalburst: {
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
	hiddenpowerfairy: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
		basePower: 70,
	},
	aeroblast: {
		inherit: true,
		basePower: 80,
	},
	roost: {
		inherit: true,
		gen: 3,
	},
	block: {
		inherit: true,
		type: "Dark",
	},
	sleeppowder: {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1, powder: 1},
	},
	stunspore: {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1, powder: 1},
	},
	poisonpowder: {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1, powder: 1},
	},
	spore: {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1, powder: 1},
	},
	lovelykiss: {
		inherit: true,
		type: "Fairy",
	},
	taunt: {
		inherit: true,
		desc: "For 2 to 4 turns, prevents the target from using non-damaging moves.",
		shortDesc: "For 2-4 turns, the target can't use status moves.",
		flags: {protect: 1, mirror: 1, bypasssub: 1, metronome: 1},
		condition: {
			durationCallback() {
				return this.random(2, 4);
			},
			onStart(target) {
				this.add('-start', target, 'move: Taunt');
			},
			onResidualOrder: 10,
			onResidualSubOrder: 15,
			onEnd(target) {
				this.add('-end', target, 'move: Taunt');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).category === 'Status') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (move.category === 'Status') {
					this.add('cant', attacker, 'move: Taunt', move);
					return false;
				}
			},
		},
	},
};