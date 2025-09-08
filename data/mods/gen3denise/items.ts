import { ModdedItemData } from "../../../sim/dex-items";

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
		onModifyAtkPriority: 1,
		onModifyAtk(spa, user, target, move) {
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
		onModifyAtkPriority: 1,
		onModifyAtk(spa, user, target, move) {
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
		onModifySpAPriority: 1,
		onModifySpA(atk, user, target, move) {
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
		onModifySpAPriority: 1,
		onModifySpA(atk, user, target, move) {
			if (move?.type === 'Fairy') {
				return this.chainModify(1.2);
			}
		},
		gen: 3,
	},
	metronome: {
		inherit: true,
		desc: "Holder's Sound-type attacks have 1.2x power.",
		shortDesc: "Holder's Sound-type attacks have 1.2x power.",
		onBasePower() {},
		onModifySpAPriority: 1,
		onModifySpA(atk, user, target, move) {
			if (move?.type === 'Sound') {
				return this.chainModify(1.2);
			}
		},
		gen: 3,
	},

	choicespecs: {
		inherit: true,
		gen: 3,
	},
	choicescarf: {
		inherit: true,
		gen: 3,
	},
	assaultvest: {
		inherit: true,
		gen: 3,
	},
	flameorb: {
		inherit: true,
		gen: 3,
	},
	toxicorb: {
		inherit: true,
		gen: 3,
	},
	rockyhelmet: {
		inherit: true,
		gen: 3,
	},
	dawnstone: {
		inherit: true,
		gen: 3,
	},
	duskstone: {
		inherit: true,
		gen: 3,
	},
	focussash: {
		inherit: true,
		gen: 3,
	},
	heatrock: {
		inherit: true,
		gen: 3,
	},
	damprock: {
		inherit: true,
		gen: 3,
	},
	smoothrock: {
		inherit: true,
		gen: 3,
	},
	icyrock: {
		inherit: true,
		gen: 3,
	},
	sitrusberry: {
		inherit: true,
		desc: "Restores 1/4 max HP when at 1/2 max HP or less. Single use.",
		shortDesc: "Restores 1/4 max HP when at 1/2 max HP or less. Single use.",
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 4);
		},
	},
	stick: {
		inherit: true,
		desc: "If held by Farfetch’d or Sirfetch'd, critical ratio is raised by 5 stages.",
		shortDesc: "If held by Farfetch’d or Sirfetch'd, critical ratio is raised by 5 stages.",
		onModifyCritRatio(critRatio, user) {
			if (["farfetchd", "sirfetchd"].includes(this.toID(user.baseSpecies.baseSpecies))) {
				return critRatio + 5;
			}
		},
		itemUser: ["Farfetch\u2019d", "Farfetch\u2019d-Galar", "Sirfetch\u2019d"],
	},
	lightball: {
		inherit: true,
		desc: "If held by Pichu, Pikachu, Raichu or Raichu-Alola, attacks have double power.",
		shortDesc: "If held by Pichu, Pikachu, Raichu or Raichu-Alola, attacks have double power.",
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
		itemUser: ["Pichu", "Pikachu", "Raichu", "Raichu-Alola"],
	},
	aguavberry: {
		inherit: true,
		desc: "Restores 1/2 max HP when at 1/4 max HP or less. Single use.",
		shortDesc: "Restores 1/2 max HP when at 1/4 max HP or less.",
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('gluttony') && pokemon.abilityState.gluttony)) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon, null, this.effect, pokemon.baseMaxhp / 2)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
		},
	},
	watmelberry: {
		inherit: true,
		shortDesc: "Halves damage taken from a supereffective attack. Single use.",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},

	moonrock: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},

	bugmemory: {
		inherit: true,
		gen: 3,
	},
	darkmemory: {
		inherit: true,
		gen: 3,
	},
	dragonmemory: {
		inherit: true,
		gen: 3,
	},
	electricmemory: {
		inherit: true,
		gen: 3,
	},
	fairymemory: {
		inherit: true,
		gen: 3,
	},
	fightingmemory: {
		inherit: true,
		gen: 3,
	},
	firememory: {
		inherit: true,
		gen: 3,
	},
	flyingmemory: {
		inherit: true,
		gen: 3,
	},
	ghostmemory: {
		inherit: true,
		gen: 3,
	},
	grassmemory: {
		inherit: true,
		gen: 3,
	},
	groundmemory: {
		inherit: true,
		gen: 3,
	},
	icememory: {
		inherit: true,
		gen: 3,
	},
	poisonmemory: {
		inherit: true,
		gen: 3,
	},
	psychicmemory: {
		inherit: true,
		gen: 3,
	},
	rockmemory: {
		inherit: true,
		gen: 3,
	},
	soundmemory: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	steelmemory: {
		inherit: true,
		gen: 3,
	},
	watermemory: {
		inherit: true,
		gen: 3,
	},
	
	venusaurite: {
		inherit: true,
		gen: 3,
	},
	charizarditex: {
		inherit: true,
		gen: 3,
	},
	charizarditey: {
		inherit: true,
		gen: 3,
	},
	blastoisinite: {
		inherit: true,
		gen: 3,
	},
	beedrillite: {
		inherit: true,
		gen: 3,
	},
	pidgeotite: {
		inherit: true,
		gen: 3,
	},
	alakazite: {
		inherit: true,
		gen: 3,
	},
	slowbronite: {
		inherit: true,
		gen: 3,
	},
	gengarite: {
		inherit: true,
		gen: 3,
	},
	kangaskhanite: {
		inherit: true,
		gen: 3,
	},
	pinsirite: {
		inherit: true,
		gen: 3,
	},
	gyaradosite: {
		inherit: true,
		gen: 3,
	},
	aerodactylite: {
		inherit: true,
		gen: 3,
	},
	mewtwonitex: {
		inherit: true,
		gen: 3,
	},
	mewtwonitey: {
		inherit: true,
		gen: 3,
	},
	ampharosite: {
		inherit: true,
		gen: 3,
	},
	steelixite: {
		inherit: true,
		gen: 3,
	},
	scizorite: {
		inherit: true,
		gen: 3,
	},
	heracronite: {
		inherit: true,
		gen: 3,
	},
	houndoominite: {
		inherit: true,
		gen: 3,
	},
	tyranitarite: {
		inherit: true,
		gen: 3,
	},
	sceptilite: {
		inherit: true,
		gen: 3,
	},
	blazikenite: {
		inherit: true,
		gen: 3,
	},
	swampertite: {
		inherit: true,
		gen: 3,
	},
	gardevoirite: {
		inherit: true,
		gen: 3,
	},
	sablenite: {
		inherit: true,
		gen: 3,
	},
	mawilite: {
		inherit: true,
		gen: 3,
	},
	aggronite: {
		inherit: true,
		gen: 3,
	},
	medichamite: {
		inherit: true,
		gen: 3,
	},
	manectite: {
		inherit: true,
		gen: 3,
	},
	altarianite: {
		inherit: true,
		gen: 3,
	},
	sharpedonite: {
		inherit: true,
		gen: 3,
	},
	cameruptite: {
		inherit: true,
		gen: 3,
	},
	banettite: {
		inherit: true,
		gen: 3,
	},
	absolite: {
		inherit: true,
		gen: 3,
	},
	glalitite: {
		inherit: true,
		gen: 3,
	},
	salamencite: {
		inherit: true,
		gen: 3,
	},
	metagrossite: {
		inherit: true,
		gen: 3,
	},
	latiasite: {
		inherit: true,
		gen: 3,
	},
	latiosite: {
		inherit: true,
		gen: 3,
	},
	lucarionite: {
		inherit: true,
		gen: 3,
	},
	abomasite: {
		inherit: true,
		gen: 3,
	},
	galladite: {
		inherit: true,
		gen: 3,
	},
};
