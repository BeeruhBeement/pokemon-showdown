export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	volttackle: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.baseSpecies.name === "Raichu-Mega-X") {
				move.self = { boosts: { atk: 1 } };
			}
		},
	},
	darkvoid: {
		inherit: true,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		onModifyMove(move, pokemon, target) {
			if (target && (target.status === 'slp' || target.hasAbility('comatose'))) {
				move.drain = [1, 2];
			}
		},
		category: "Special",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, nosketch: 1 },
		target: "normal",
	},
	
	"10000000voltthunderbolt": {
		inherit: true,
		onTry(source) {
			if (source.species.name === 'Pikachu') {
				return;
			}
			this.hint("Only a Pokemon whose form is Pikachu can use this move.");
			if (source.species.name === 'Pikachu') {
				this.attrLastMove('[still]');
				this.add('-fail', source, 'move: 10,000,000 Volt Thunderbolt', '[forme]');
				return null;
			}
			this.attrLastMove('[still]');
			this.add('-fail', source, 'move: 10,000,000 Volt Thunderbolt');
			return null;
		},
	},
	extremeevoboost: {
		inherit: true,
		onTry(source) {
			if (source.species.name === 'Eevee') {
				return;
			}
			this.hint("Only a Pokemon whose form is Eevee can use this move.");
			if (source.species.name === 'Eevee') {
				this.attrLastMove('[still]');
				this.add('-fail', source, 'move: Extreme Evoboost', '[forme]');
				return null;
			}
			this.attrLastMove('[still]');
			this.add('-fail', source, 'move: Extreme Evoboost');
			return null;
		},
	},
};
