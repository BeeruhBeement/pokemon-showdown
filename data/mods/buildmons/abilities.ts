export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	battlearmor: {
		inherit: true,
		shortDesc: "This Pokemon cannot be hit for critical or super effective damage.",
	},
	klutz: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.chainModify(1.5);
		},
		shortDesc: "This Pokemon's held item has no effect but Attack is 1.5x.",
	},
};
