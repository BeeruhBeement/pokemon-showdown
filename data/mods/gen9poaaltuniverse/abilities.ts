import { ModdedAbilityData } from "../../../sim/dex-abilities";

export const Abilities: {[k: string]: ModdedAbilityData} = {
	crypticluminance: {
		// Dark resist in scripts.ts in pokemon
		onModifyMove(move) {
			move.ignoreEvasion = true;
		},
		flags: { breakable: 1 },
		name: "Cryptic Luminance",
		rating: 3,
		num: 0,
		shortDesc: "This Pokémon resists Dark-type attacks and ignores changes to the target's evasiveness.",
	},
	calcitecalving: {
		onDamagingHit(damage, target, source, move) {
			const side = source.isAlly(target) ? source.side.foe : source.side;
			const stealthRock = side.sideConditions['stealthrock'];
			if (move.category === 'Physical' && (!stealthRock)) {
				this.add('-activate', target, 'ability: Calcite Calving');
				side.addSideCondition('stealthrock', target);
			}
		},
		flags: {},
		name: "Calcite Calving",
		rating: 4,
		num: 0,
		shortDesc: "If this Pokemon is hit by a physical attack, Stealth Rock is set on the opposing side.",
	},
	patronize: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Patronize', 'boost');
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
		name: "Patronize",
		rating: 3.5,
		num: 0,
		desc: "On switch-in, this Pokemon lowers the Special Attack of opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Sp. Atk of opponents by 1 stage.",
	},
	moltenhands: {
		onModifyMove(move, pokemon, target) {
			if (move.flags['contact']) move.category = "Special";
		},
		flags: {},
		name: "Molten Hands",
		rating: 3.5,
		num: 0,
		shortDesc: "This Pokemon's contact moves are Special.",
	},
	instability: {
		onModifyMove(move, pokemon) {
			if (move.secondaries) {
				delete move.secondaries;
				// Technically not a secondary effect, but it is negated
				delete move.self;
				if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
			}
		},
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Toxic Chain's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;

			if (this.randomChance(1, 10)) {
				target.trySetStatus('psn', source);
			}
		},
		flags: {},
		name: "Instability",
		rating: 3.5,
		num: 125,
		desc: "This Pokemon's attacks have a 10% chance of badly poisoning, but the secondary effects are removed.",
		shortDesc: "This Pokemon's attacks have a 10% chance of poisoning; nullifies secondary effects.",
	},
	irrelephant: {
		onModifyMove(move, pokemon, target) {
			if (!target || !target.hp) return;
			const curType = target.getTypes();
			target.setType('???');
			move.ignoreImmunity = {};
			for (const type of this.dex.types.all()) {
				if (target.runImmunity(type.name)) {
					move.ignoreImmunity[type.name] = true;
				}
			}
			target.setType(curType);
		},
		flags: {},
		name: "Irrelephant",
		shortDesc: "User ignores all type-based immunities.",
		rating: 4,
		num: 0,
	},
	lostonesweeping: {
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Special') {
				if (this.randomChance(2, 10)) {
					this.boost({ spd: -1 }, target, target);
					return target.addVolatile('trapped', source, move, 'trapper');
				}
			}
		},
		flags: {},
		name: "Lost One's Weeping",
		shortDesc: "20 % chance when hit by a Special Attack to lower the attackers Def. and trap.",
		rating: 4,
		num: 0,
	},
	graupel: {
		onDamagingHit(damage, target, source, move) {
			this.field.setWeather('hail');
		},
		flags: {},
		name: "Graupel",
		rating: 1,
		num: 0,
		shortDesc: "When this Pokemon is hit by an attack, the effect of Hail begins.",
	},
	powerup: {
		flags: {},
		name: "Power Up",
		rating: 2,
		num: 5000,
		onPrepareHit(pokemon, target, move) {
			if (move.type !== 'Electric') {
				const types = pokemon.getTypes();
				if (pokemon.hasType('Electric')) return;

				if (types.length > 1) {
					const primary = types[0];
					const newTypes = [primary, 'Electric'];
					pokemon.setType(newTypes);
					this.add('-start', pokemon, 'typechange', newTypes.join('/'), '[from] ability: Power Up');
					return;
				}

				if (!pokemon.addType('Electric')) return;
				this.add('-start', pokemon, 'typeadd', 'Electric', '[from] ability: Power Up');
			}
			if (move.id === 'powerdown') {
				this.add('-end', pokemon, 'typechange', '[silent]');
				this.add('-end', pokemon, 'typeadd', '[silent]');
			}
		},
		shortDesc: "The user's secondary typing permanently becomes Electric when using an Electric type move.",
	},
	rooted: {
		onDragOutPriority: 1,
		onDragOut(pokemon) {
			this.add('-activate', pokemon, 'ability: Rooted');
			return null;
		},
		flags: { breakable: 1 },
		name: "Rooted",
		rating: 1,
		num: 0,
		shortDesc: "This Pokemon cannot be forced to switch out by another Pokemon's attack or item.",
	},
	zealousflock: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!source.getVolatile('zealousflock')) source.addVolatile('zealousflock', target);
		},
		condition: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'Zealous Flock', '[of] ' + source);
			},
			onResidualOrder: 12,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 16);
			},
		},
		name: "Zealous Flock",
		shortDesc: "If the User is hit by an attack, the attacker loses 1/16 HP per turn until switched out.",
		rating: 4,
		num: 0,
	},
};
