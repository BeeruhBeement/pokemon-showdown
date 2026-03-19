export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	banshee: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (move.flags["sound"]) {
				target.trySetStatus('fz', source);
			}
		},
		flags: {},
		name: "Banshee",
		num: 0,
		shortDesc: "Damaging Sound moves freeze targets.",
	},
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
