export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	init() {
		const typeMap: {[key: string]: string} = {
			'Normal': 'Fighting',
			'Fighting': 'Flying',
			'Flying': 'Poison',
			'Poison': 'Ground',
			'Ground': 'Rock',
			'Rock': 'Bug',
			'Bug': 'Ghost',
			'Ghost': 'Steel',
			'Steel': 'Fire',
			'Fire': 'Water',
			'Water': 'Grass',
			'Grass': 'Electric',
			'Electric': 'Psychic',
			'Psychic': 'Ice',
			'Ice': 'Dragon',
			'Dragon': 'Dark',
			'Dark': 'Fairy',
			'Fairy': 'Normal',
		};

		for (const i in this.data.Pokedex) {
			const pokemon = this.modData('Pokedex', i);
			if (pokemon.types) {
				pokemon.types = pokemon.types.map((type: string | number) => typeMap[type] || type);
			}
		}

		for (const i in this.data.Moves) {
			const move = this.modData('Moves', i);
			if (move.type && typeMap[move.type]) {
				move.type = typeMap[move.type];
			}
		}
	},
};
