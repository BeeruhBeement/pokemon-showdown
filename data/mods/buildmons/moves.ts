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
		},
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
	crushclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	direclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	dragonclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
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
	fireblast: {
		inherit: true,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
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
	deepfreeze: {
		inherit: true,
		isNonstandard: null,
	},
	frostbite: {
		inherit: true,
		isNonstandard: null,
	},
	quicksand: {
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Quicksand",
		pp: 30,
		priority: 1,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: null,
		target: "normal",
		type: "Ground",
	},
	rockcrunch: {
		inherit: true,
		isNonstandard: null,
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
		secondary: null,
		target: "normal",
		type: "Ghost",
		desc: "Deals damage to the target based on its Special Defense instead of Defense.",
		shortDesc: "Damages target based on Sp. Def, not Defense.",
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
		secondary: null,
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