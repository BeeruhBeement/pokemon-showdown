export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	corrosiveaura: {
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			const move = this.dex.getActiveMove('smog');
			const target = pokemon.foes()[0];
			if (target && !target.fainted) {
				this.actions.useMove(move, pokemon, { target });
			}
		},
		flags: {},
		name: "Corrosive Aura",
		num: 0,
		shortDesc: "Uses Smog at the end of each turn.",
	},
};
