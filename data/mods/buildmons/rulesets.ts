export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	itemclause: {
		inherit: true,
		onBegin() {
			this.add('rule', `Item Clause: Limit ${this.ruleTable.valueRules.get('itemclause') || 1} of each item`);
		},
		onValidateRule(value) {
			const num = Number(value);
			if (num < 1 || num > this.ruleTable.maxTeamSize) {
				throw new Error(`Item Clause must be between 1 and ${this.ruleTable.maxTeamSize}.`);
			}
			return value;
		},
		onValidateTeam(team) {
			const itemTable = new this.dex.Multiset<string>();
			for (const set of team) {
				const item = this.toID(set.item);
				itemTable.add(item);
				for (const itemid of set.moves) {
					const item = this.toID(itemid);
					itemTable.add(item);
				}
				if (!item) continue;
			}
			const itemLimit = Number(this.ruleTable.valueRules.get('itemclause') || 1);
			for (const [itemid, num] of itemTable) {
				if (num <= itemLimit) continue;
				return [
					`You are limited to ${itemLimit} of each item and move by Item Clause.`,
				];
			}
		},
	},
};
