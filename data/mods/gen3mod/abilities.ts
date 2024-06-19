export const Abilities: {[k: string]: ModdedAbilityData} = {
	hustle: {
		inherit: true,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			const physicalTypes = ['Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Fairy'];
			if (physicalTypes.includes(move.type) && typeof accuracy === 'number') {
				return this.chainModify([3277, 4096]);
			}
		},
	},
	toughclaws: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([11, 10]);
			}
		},
		shortDesc: "This Pokemon's contact moves have their power multiplied by 1.1.",
	},
};
