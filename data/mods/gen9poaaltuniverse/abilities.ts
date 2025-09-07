import { ModdedAbilityData } from "../../../sim/dex-abilities";

export const Abilities: {[k: string]: ModdedAbilityData} = {
	crypticluminance: {
		onEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Dark' && target?.ability === 'crypticluminance') {
				return 2;
			}
		},
		onModifyMove(move) {
			move.ignoreEvasion = true;
		},
		flags: { breakable: 1 },
		name: "Cryptic Luminance",
		rating: 2,
		num: 0,
		shortDesc: "This Pokémon resists Dark-type attacks and ignores changes to the target's evasiveness.",
	},
};
