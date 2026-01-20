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
		category: "Special",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, nosketch: 1 },
		drain: [1, 2],
		target: "normal",
		status: "",
		desc: "User recovers 50% of damage dealt, doubled power on sleeping foes.",
		shortDesc: "User recovers 50% of damage dealt, doubled power on sleeping foes.",
	},
	
	"10000000voltthunderbolt": {
		inherit: true,
		onTry(source, target, move) {
			if ((source.species.name === 'Pikachu' || source.baseSpecies.name === "Pikachu-Mega")|| move.hasBounced) {
				return;
			}
			this.add('-fail', source, 'move: 10,000,000 Volt Thunderbolt');
			this.hint("Only a Pokemon whose form is Pikachu can use this move.");
			return null;
		},
		isZ: false,
		noPPBoosts: true,
	},
	extremeevoboost: {
		inherit: true,
		onTry(source, target, move) {
			if ((source.species.name === 'Eevee' || source.baseSpecies.name === "Eevee-Mega") || move.hasBounced) {
				return;
			}
			this.add('-fail', source, 'move: Extreme Evoboost');
			this.hint("Only a Pokemon whose form is Eevee can use this move.");
			return null;
		},
		isZ: false,
		noPPBoosts: true,
	},
};
