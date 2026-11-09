export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	tinyclause: {
		effectType: 'ValidatorRule',
		name: 'Tiny Clause',
		desc: 'Bans Tiny Pokemon.',
		onValidateSet(set) {
			if (set.tiny) return [`${set.species} is using its Tiny form, which is banned by Tiny Clause.`];
		},
	},
	nightmareclause: {
		effectType: 'ValidatorRule',
		name: 'Nightmare Clause',
		desc: 'Bans Nightmare Pokemon.',
		onValidateSet(set) {
			if (set.nightmare) return [`${set.species} is using its Nightmare form, which is banned by Nightmare Clause.`];
		},
	},
	pintamantclause: {
		effectType: 'ValidatorRule',
		name: 'Pintamant Clause',
		desc: 'Pintamant can only be tiny.',
		onValidateSet(set) {
			if (set.species === 'pintamant' && !set.tiny) return [`${set.species} can only ever be found in Tiny Form.`];
		},
	},
};
