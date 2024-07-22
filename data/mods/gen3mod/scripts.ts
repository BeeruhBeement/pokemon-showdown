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
	actions: {
		inherit: true,
		modifyDamage(baseDamage, pokemon, target, move) {
			const isCrit = target.getMoveHitData(move).crit;
			if (isCrit) {
				baseDamage = this.battle.modify(baseDamage, move.critModifier || 1.5);
			}
		},
	},
};
