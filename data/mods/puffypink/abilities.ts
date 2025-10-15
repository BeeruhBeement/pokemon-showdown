export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	ironbarbs: {
		inherit: true,
		gen: 3,
		onDamagingHit(damage, target, source, move) {
			if (damage && move.flags['contact']) {
				this.damage(source.baseMaxhp / 16, source, target);
			}
		},
		desc: "Pokemon making contact with this Pokemon lose 1/16 of their maximum HP, rounded down. This effect does not happen if this Pokemon did not lose HP from the attack.",
		shortDesc: "Pokemon making contact with this Pokemon lose 1/16 of their max HP.",
	},
}