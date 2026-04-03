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
	slash: {
		inherit: true,
		desc: "Has a 30% chance to bleed the target and a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio. 30% chance to bleed.",
		secondary: {
			chance: 30,
			status: 'bld',
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
	stoneedge: {
		inherit: true,
		flags: { protect: 1, mirror: 1, metronome: 1, slicing: 1 },
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
		inherit: true,
		type: "Normal",
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		flags: {protect: 1, mirror: 1, contact: 1},
		critRatio: 2,
		shortDesc: "Random type. High crit ratio.",
		onModifyType(move, source, target) {
			const types = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];
			move.type = this.sample(types);
		},
	},
	deepfreeze: {
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