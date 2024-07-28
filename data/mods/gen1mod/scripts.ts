export const Scripts: ModdedBattleScriptsData = {
	gen: 1,
	inherit: 'gen1',
	init() {
		for (const id in this.data.Pokedex) {
			const types = Array.from(new Set(this.data.Pokedex[id].types.map(type => (
				type.replace(/Fairy/g, 'Psychic')
					.replace(/Steel/g, 'Rock')
					.replace(/Dark/g, 'Ghost')
			))));
			this.modData('Pokedex', id).types = types;
		}
		for (const id in this.data.Moves) {
			const move = this.data.Moves[id];
			const type = move.type
			.replace(/Fairy/g, 'Psychic')
			.replace(/Steel/g, 'Rock')
			.replace(/Dark/g, 'Ghost')
			this.modData('Moves', id).type = type;
		}
	},
	pokemon: {
		inherit: true,
		hasType(type) {
			const thisTypes = this.getTypes();
			if (typeof type === 'string') {
				return thisTypes.includes(type
					.replace(/Fairy/g, 'Psychic')
					.replace(/Steel/g, 'Rock')
					.replace(/Dark/g, 'Ghost'));
			}

			for (const typeName of type) {
				if (thisTypes.includes(typeName
					.replace(/Fairy/g, 'Psychic')
					.replace(/Steel/g, 'Rock')
					.replace(/Dark/g, 'Ghost'))
				) {
					return true;
				}
			}
			return false;
		},
	},
};
