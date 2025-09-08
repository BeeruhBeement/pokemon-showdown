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
};
