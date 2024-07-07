export const Scripts: ModdedBattleScriptsData = {
	gen: 3,
	inherit: 'gen3',
	init() {
		const specialTypes = ['Fire', 'Water', 'Grass', 'Ice', 'Electric', 'Ghost', 'Psychic', 'Fairy'];
		let newCategory = '';
		for (const i in this.data.Moves) {
			if (!this.data.Moves[i]) console.log(i);
			if (this.data.Moves[i].category === 'Status') continue;
			newCategory = specialTypes.includes(this.data.Moves[i].type) ? 'Special' : 'Physical';
			if (newCategory !== this.data.Moves[i].category) {
				this.modData('Moves', i).category = newCategory;
			}
		}
		for (const species in this.data.Pokedex) {
			delete this.data.Pokedex[species].abilities['H'];
		}
	},
};
