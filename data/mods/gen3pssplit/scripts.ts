import {Dex} from '../../../sim/dex';

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen3',
	gen: 3,
	init() {
		for (const i in this.data.Moves) {
				let originalCategory = Dex.dexes.base.data.Moves[i].category;
				if (originalCategory !== this.data.Moves[i].category) {
						this.modData('Moves', i).category = originalCategory;
				}
			}
	},
};