export const Items: {[k: string]: ModdedItemData} = {
	blackbelt: {
		inherit: true,
		desc: "Holder's Fighting-type attacks have 1.2x power.",
		shortDesc: "Holder's Fighting-type attacks have 1.2x power.",
		onBasePower() {},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, user, target, move) {
			if (move?.type === 'Fighting') {
				return this.chainModify(1.2);
			}
		},
	},
	blackglasses: {
		inherit: true,
		shortDesc: "Holder's Dark-type attacks have 1.2x power.",
		onBasePower() {},
		onModifySpAPriority: 1,
		onModifySpA(spa, user, target, move) {
			if (move?.type === 'Dark') {
				return this.chainModify(1.2);
			}
		},
	},
	charcoal: {
		inherit: true,
		desc: "Holder's Fire-type attacks have 1.2x power.",
		shortDesc: "Holder's Fire-type attacks have 1.2x power.",
		onBasePower() {},
		onModifySpAPriority: 1,
		onModifySpA(spa, user, target, move) {
			if (move?.type === 'Fire') {
				return this.chainModify(1.2);
			}
		},
	},
	dragonfang: {
		inherit: true,
		desc: "Holder's Dragon-type attacks have 1.2x power.",
		shortDesc: "Holder's Dragon-type attacks have 1.2x power.",
		onBasePower() {},
		onModifySpAPriority: 1,
		onModifySpA(spa, user, target, move) {
			if (move?.type === 'Dragon') {
				return this.chainModify(1.2);
			}
		},
	},
	hardstone: {
		inherit: true,
		desc: "Holder's Rock-type attacks have 1.2x power.",
		shortDesc: "Holder's Rock-type attacks have 1.2x power.",
		onBasePower() {},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, user, target, move) {
			if (move?.type === 'Rock') {
				return this.chainModify(1.2);
			}
		},
	},
	magnet: {
		inherit: true,
		desc: "Holder's Electric-type attacks have 1.2x power.",
		shortDesc: "Holder's Electric-type attacks have 1.2x power.",
		onBasePower() {},
		onModifySpAPriority: 1,
		onModifySpA(spa, user, target, move) {
			if (move?.type === 'Electric') {
				return this.chainModify(1.2);
			}
		},
	},
	metalcoat: {
		inherit: true,
		desc: "Holder's Steel-type attacks have 1.2x power.",
		shortDesc: "Holder's Steel-type attacks have 1.2x power.",
		onBasePower() {},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, user, target, move) {
			if (move?.type === 'Steel') {
				return this.chainModify(1.2);
			}
		},
	},
	miracleseed: {
		inherit: true,
		desc: "Holder's Grass-type attacks have 1.2x power.",
		shortDesc: "Holder's Grass-type attacks have 1.2x power.",
		onBasePower() {},
		onModifySpAPriority: 1,
		onModifySpA(spa, user, target, move) {
			if (move?.type === 'Grass') {
				return this.chainModify(1.2);
			}
		},
	},
	mysticwater: {
		inherit: true,
		desc: "Holder's Water-type attacks have 1.2x power.",
		shortDesc: "Holder's Water-type attacks have 1.2x power.",
		onBasePower() {},
		onModifySpAPriority: 1,
		onModifySpA(spa, user, target, move) {
			if (move?.type === 'Water') {
				return this.chainModify(1.2);
			}
		},
	},
	nevermeltice: {
		inherit: true,
		desc: "Holder's Ice-type attacks have 1.2x power.",
		shortDesc: "Holder's Ice-type attacks have 1.2x power.",
		onBasePower() {},
		onModifySpAPriority: 1,
		onModifySpA(spa, user, target, move) {
			if (move?.type === 'Ice') {
				return this.chainModify(1.2);
			}
		},
	},
	poisonbarb: {
		inherit: true,
		desc: "Holder's Poison-type attacks have 1.2x power.",
		shortDesc: "Holder's Poison-type attacks have 1.2x power.",
		onBasePower() {},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, user, target, move) {
			if (move?.type === 'Poison') {
				return this.chainModify(1.2);
			}
		},
	},
	sharpbeak: {
		inherit: true,
		desc: "Holder's Flying-type attacks have 1.2x power.",
		shortDesc: "Holder's Flying-type attacks have 1.2x power.",
		onBasePower() {},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, user, target, move) {
			if (move?.type === 'Flying') {
				return this.chainModify(1.2);
			}
		},
	},
	silkscarf: {
		inherit: true,
		desc: "Holder's Normal-type attacks have 1.2x power.",
		shortDesc: "Holder's Normal-type attacks have 1.2x power.",
		onBasePower() {},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, user, target, move) {
			if (move?.type === 'Normal') {
				return this.chainModify(1.2);
			}
		},
	},
	silverpowder: {
		inherit: true,
		desc: "Holder's Bug-type attacks have 1.2x power.",
		shortDesc: "Holder's Bug-type attacks have 1.2x power.",
		onBasePower() {},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, user, target, move) {
			if (move?.type === 'Bug') {
				return this.chainModify(1.2);
			}
		},
	},
	softsand: {
		inherit: true,
		desc: "Holder's Ground-type attacks have 1.2x power.",
		shortDesc: "Holder's Ground-type attacks have 1.2x power.",
		onBasePower() {},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, user, target, move) {
			if (move?.type === 'Ground') {
				return this.chainModify(1.2);
			}
		},
	},
	spelltag: {
		inherit: true,
		desc: "Holder's Ghost-type attacks have 1.2x power.",
		shortDesc: "Holder's Ghost-type attacks have 1.2x power.",
		onBasePower() {},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, user, target, move) {
			if (move?.type === 'Ghost') {
				return this.chainModify(1.2);
			}
		},
	},
	twistedspoon: {
		inherit: true,
		desc: "Holder's Psychic-type attacks have 1.2x power.",
		shortDesc: "Holder's Psychic-type attacks have 1.2x power.",
		onBasePower() {},
		onModifySpAPriority: 1,
		onModifySpA(spa, user, target, move) {
			if (move?.type === 'Psychic') {
				return this.chainModify(1.2);
			}
		},
	},
	fairyfeather: {
		inherit: true,
		onBasePower() {},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, user, target, move) {
			if (move?.type === 'Fairy') {
				return this.chainModify(1.2);
			}
		},
		gen: 3,
		isNonstandard: null,
	},
	eviolite: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	choicespecs: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	choicescarf: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	assaultvest: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	flameorb: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	toxicorb: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	dawnstone: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	duskstone: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	focussash: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	punchingglove: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	sitrusberry: {
		inherit: true,
		desc: "Restores 1/4 max HP when at 1/2 max HP or less. Single use.",
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 4);
		},
	},
	stick: {
		name: "Stick",
		desc: "If held by a Farfetch’d or Sirfetch’d, its critical hit ratio is raised by 2 stages.",
		fling: {
			basePower: 60,
		},
		spritenum: 475,
		onModifyCritRatio(critRatio, user) {
			if (["farfetchd", "sirfetchd"].includes(this.toID(user.baseSpecies.baseSpecies))) {
				return critRatio + 2;
			}
		},
		itemUser: ["Farfetch\u2019d", "Farfetch\u2019d-Galar", "Sirfetch\u2019d"],
		num: 259,
		gen: 2,
		isNonstandard: null,
	},
	lightball: {
		inherit: true,
		desc: "If held by Pichu, Pikachu, Raichu or Raichu-Alola, attacks have double power.",
		onModifyAtk() {
			return;
		},
		onModifySpA() {
			return;
		},
		onBasePower(basePower, pokemon) {
			if (pokemon.species.name === 'Pichu' || pokemon.species.name === 'Pikachu' || pokemon.species.name === 'Raichu' || pokemon.species.name === 'Raichu-Alola') {
				return this.chainModify(2);
			}
		},
	},
};
