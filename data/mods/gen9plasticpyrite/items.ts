export const Items: import("../../../sim/dex-items").ModdedItemDataTable = {
	darkgem: {
		inherit: true,
		isNonstandard: null,
	},
	steelgem: {
		inherit: true,
		isNonstandard: null,
	},
	weaknesspolicy: {
		inherit: true,
		isNonstandard: "Future",
	},
	blunderpolicy: {
		inherit: true,
		isNonstandard: "Future",
	},
	heavydutyboots: {
		inherit: true,
		isNonstandard: "Future",
	},
	loadeddice: {
		inherit: true,
		isNonstandard: "Future",
	},
	covertcloak: {
		inherit: true,
		isNonstandard: "Future",
	},
	abilityshield: {
		inherit: true,
		isNonstandard: "Future",
	},
	
	brightbulb: {
		name: "Bright Bulb",
		spritenum: -1,
		fling: {
			basePower: 30,
			status: 'par',
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('par', pokemon);
			if (pokemon.types.includes("Electric")) {
				if (this.effectState.brightbulb) return;
				pokemon.addVolatile("charge");
				this.effectState.brightbulb = true;
			}
		},
		shortDesc: "At end of turn: Paralysis. If Electric: Charge, once per switch-in.",
	},
	dawnball: {
		name: "Dawn Ball",
		spritenum: -1,
		isPokeball: true,
		shortDesc: "A Poke Ball that makes it easier to catch wild Pokemon during the day.",
	},
	dentures: {
		name: "Dentures",
		spritenum: -1,
		fling: {
			basePower: 90,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Enamanuel' || pokemon.baseSpecies.baseSpecies === 'Malkolmolar') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Enamanuel", "Malkolmolar", "Feral Fang"],
		shortDesc: "If held by a Enamanuel, Malkolmolar or a Feral Fang, its Attack is doubled.",
	},
	electirizer: {
		inherit: true,
		name: "Electirizer",
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.status === 'par') return;
				}
				move.secondaries.push({
					chance: 10,
					status: 'par',
				});
			}
		},
		desc: "Holder's attacks without a chance to paralyze the target gain a 10% chance to paralyze the target.",
		shortDesc: "Holder's attacks without a chance to paralyze gain a 10% chance to paralyze.",
	},
	fireball: {
		name: "Fire Ball",
		spritenum: -1,
		isPokeball: true,
		shortDesc: "A Poke Ball that works especially well on Fire- and Dragon-type Pokemon.",
	},
	frostorb: {
		name: "Frost Orb",
		spritenum: -1,
		fling: {
			basePower: 30,
			status: 'frz',
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('frz', pokemon);
		},
		shortDesc: "At the end of every turn, this item attempts to frostbite the holder.",
	},
	lightball: {
		inherit: true,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Rikoroll') {
				return this.chainModify(2);
			}
		},
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Rikoroll') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Rikoroll"],
		shortDesc: "If held by a Rikoroll, its Attack and Sp. Atk are doubled.",
	},
	lightupshoes: {
		name: "Light-Up Shoes",
		spritenum: -1,
		fling: {
			basePower: 80,
		},
		onDamage(damage, target, source, effect) {
			const sideConditions = ['spikes', 'stealthrock', 'gmaxsteelsurge'];
			if (sideConditions.includes(effect.id)) {
				return false;
			}
		},
		onSetStatus(status, target, source, effect) {
			if (effect.id === 'toxicspikes') return false;
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.id === 'stickyweb') return false;
		},
		shortDesc: "When switching in, the holder is unaffected by hazards on its side of the field.",
	},
	luckyamulet: {
		name: "Lucky Amulet",
		spritenum: -1,
		fling: {
			basePower: 40,
		},
		onCriticalHit: false,
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.debug('Sniper boost');
				return this.chainModify(1.5);
			}
		},
		shortDesc: "This Pokemon cannot be struck by a critical hit. Critical hit damage is multiplied by 1.5.",
	},
	luckybucket: {
		name: "Lucky Bucket",
		spritenum: -1,
		fling: {
			basePower: 40,
		},
		onModifyCritRatio(critRatio, user) {
			if (user.baseSpecies.name === 'Gargan') {
				return critRatio + 2;
			}
		},
		itemUser: ["Gargan"],
		shortDesc: "If held by a Gargan, its critical hit ratio is raised by 2 stages.",
	},
	magmacream: {
		name: "Magma Cream",
		spritenum: -1,
		fling: {
			basePower: 30,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.hasType('Fire')) {
				this.heal(pokemon.baseMaxhp / 16);
			} else {
				this.damage(pokemon.baseMaxhp / 8);
			}
		},
		shortDesc: "Each turn, if holder is a Fire type, restores 1/16 max HP; loses 1/8 if not.",
	},
	magmarizer: {
		inherit: true,
		name: "Magmarizer",
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.status === 'brn') return;
				}
				move.secondaries.push({
					chance: 10,
					status: 'brn',
				});
			}
		},
		desc: "Holder's attacks without a chance to burn the target gain a 10% chance to burn the target.",
		shortDesc: "Holder's attacks without a chance to burn gain a 10% chance to burn.",
	},
	metalpowder: {
		inherit: true,
		onModifyDef(def, pokemon) {
			if (pokemon.species.name === 'Animon' && !pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Animon"],
		shortDesc: "If held by an Animon that hasn't Transformed, its Defense is doubled.",
	},
	miraclite: {
		name: "Miraclite",
		spritenum: -1,
		fling: {
			basePower: 40,
		},
		onModifyAtkPriority: 2,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 2,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.5);
			}
		},
		shortDesc: "If holder's species can evolve, its Attack and Sp. Atk are 1.5×.",
	},
	oddkeystone: {
		name: "Odd Keystone",
		spritenum: -1,
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.volatileStatus === 'curse') return;
				}
				move.secondaries.push({
					chance: 10,
					volatileStatus: 'curse',
				});
			}
		},
		desc: "Holder's attacks without a chance to curse the target gain a 10% chance to curse the target.",
		shortDesc: "Holder's attacks without a chance to curse gain a 10% chance to curse.",
	},
	ovalstone: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('defensecurl');
		},
		shortDesc: "Doubles the power of Rollout and Ice Ball.",
	},
	poisonstone: {
		name: "Poison Stone",
		spritenum: -1,
		fling: {
			basePower: 30,
		},
		shortDesc: "Evolves certain species of Pokemon when used.",
	},
	prettycomb: {
		name: "Pretty Comb",
		spritenum: -1,
		fling: {
			basePower: 30,
		},
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Daminu' || pokemon.baseSpecies.baseSpecies === 'Elastini') {
				return this.chainModify(2);
			}
		},
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Daminu' || pokemon.baseSpecies.baseSpecies === 'Elastini') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Daminu", "Elastini"],
		shortDesc: "If held by a Daminu or Elastini, its Defense and Sp. Def are doubled.",
	},
	quickpowder: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (pokemon.species.name === 'Animon' && !pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Animon"],
		shortDesc: "If held by an Animon that hasn't Transformed, its Speed is doubled.",
	},
	razzleball: {
		name: "Razzle Ball",
		spritenum: -1,
		isPokeball: true,
		shortDesc: "A Ball made of Razz Berries that provides an ultra high Pokémon catch rate.",
	},
	stick: {
		inherit: true,
		onModifyCritRatio(critRatio, user) {
			if (this.toID(user.baseSpecies.baseSpecies) === 'tropper' || this.toID(user.baseSpecies.baseSpecies) === 'camokage') {
				return critRatio + 2;
			}
		},
		itemUser: ["Tropper", "Camokage"],
		shortDesc: "If held by a Tropper or Camokage, its critical hit ratio is raised by 2 stages.",
	},
	thermalmitts: {
		name: "Thermal Mitts",
		spritenum: -1,
		fling: {
			basePower: 80,
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.dex.moves.get(moveSlot.id);
				if (move.category === 'Status' && move.id !== 'mefirst') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		shortDesc: "Fire-/Ice-type moves against this Pokemon damage with halved offensive stat, but can only select damaging moves.",
	},
	twotontonic: {
		name: "Two-Ton Tonic",
		spritenum: -1,
		fling: {
			basePower: 80,
		},
		onModifyDefPriority: 1,
		onModifyDef(def) {
			return this.chainModify(1.5);
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.dex.moves.get(moveSlot.id);
				if (move.category === 'Status' && move.id !== 'mefirst') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		shortDesc: "Holder's Defense is 1.5×, but it can only select damaging moves.",
	},
};
