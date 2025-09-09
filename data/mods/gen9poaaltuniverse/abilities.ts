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
};
