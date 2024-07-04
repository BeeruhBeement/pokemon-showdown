export const Scripts: ModdedBattleScriptsData = {
	gen: 3,
	inherit: 'gen3',
	init() {

		for (const species in this.data.Pokedex) {
			delete this.data.Pokedex[species].abilities['H'];
		}
	}
};
