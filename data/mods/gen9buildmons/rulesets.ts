export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	itemclause: {
		inherit: true,
		onBegin() {
			this.add('rule', `Item Clause: Limit ${this.ruleTable.valueRules.get('itemclause') || 1} of each item`);

			for (const pokemon of this.getAllPokemon()) {
				/*if (pokemon.ability === this.toID(pokemon.species.abilities['S'])) {
					continue;
				}*/
				pokemon.ability = this.toID(pokemon.species.abilities.skill);

				const innateCount = Math.min(
					6,
					Math.max(0, Math.floor((pokemon.level - 40) / 10))
				);
				pokemon.m.innates = [];
				for (let i = 0; i < innateCount; i++) {
					const ability = pokemon.species.abilities[i as 0 | 1 | 2 | 3 | 4 | 5];
					if (ability) {
						pokemon.m.innates.push(this.toID(ability));
					}
				}
			}
		},
		onBeforeSwitchIn(pokemon) {
			if (pokemon.m.innates) {
				for (const innate of pokemon.m.innates) {
					if (pokemon.hasAbility(innate)) continue;
					const effect = 'ability:' + this.toID(innate);
					pokemon.volatiles[effect] = this.initEffectState({ id: effect, target: pokemon });
				}
			}
		},
		onSwitchOut(pokemon) {
			for (const innate of Object.keys(pokemon.volatiles).filter(i => i.startsWith('ability:'))) {
				pokemon.removeVolatile(innate);
			}
		},
		onFaint(pokemon) {
			for (const innate of Object.keys(pokemon.volatiles).filter(i => i.startsWith('ability:'))) {
				const innateEffect = this.dex.conditions.get(innate) as Effect;
				this.singleEvent('End', innateEffect, null, pokemon);
			}
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
				if (item) itemTable.add(item);
				for (const itemid of set.moves) {
					const item = this.toID(itemid);
					if (item) itemTable.add(item);
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
