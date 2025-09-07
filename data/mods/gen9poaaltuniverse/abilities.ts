import { ModdedAbilityData } from "../../../sim/dex-abilities";

export const Abilities: {[k: string]: ModdedAbilityData} = {
	crypticluminance: {
		// Dark resist in scripts.ts in pokemon
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
