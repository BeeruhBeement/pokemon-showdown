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
	punchingglove: {
		inherit: true,
		gen: 3,
	},
	mirrorherb: {
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
	moonstone: {
		inherit: true,
		desc: "Evolves Nidorina into Nidoqueen, Nidorino into Nidoking, Clefairy into Clefable, Jigglypuff into Wigglytuff, Skitty into Delcatty, and Munna into Musharna when used. Holder's use of Night lasts 8 turns instead of 5.",
		shortDesc: "Holder's use of Night lasts 8 turns instead of 5.",
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
	widelens: {
		inherit: true,
		gen: 3,
		shortDesc: "The accuracy of attacks by the holder is 1.2x.",
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy === 'number') {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	razzberry: {
		name: "Razz Berry",
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
	pinsirite: {
		inherit: true,
		gen: 3,
	},
	aerodactylite: {
		inherit: true,
		gen: 3,
	},
	swampertite: {
		inherit: true,
		gen: 3,
	},
	lucarionite: {
		inherit: true,
		gen: 3,
	},
	
	normaliumz: {
		inherit: true,
		gen: 3,
	},
	fightiniumz: {
		inherit: true,
		gen: 3,
	},
	flyiniumz: {
		inherit: true,
		gen: 3,
	},
	poisoniumz: {
		inherit: true,
		gen: 3,
	},
	groundiumz: {
		inherit: true,
		gen: 3,
	},
	rockiumz: {
		inherit: true,
		gen: 3,
	},
	buginiumz: {
		inherit: true,
		gen: 3,
	},
	ghostiumz: {
		inherit: true,
		gen: 3,
	},
	steeliumz: {
		inherit: true,
		gen: 3,
	},
	firiumz: {
		inherit: true,
		gen: 3,
	},
	wateriumz: {
		inherit: true,
		gen: 3,
	},
	grassiumz: {
		inherit: true,
		gen: 3,
	},
	electriumz: {
		inherit: true,
		gen: 3,
	},
	psychiumz: {
		inherit: true,
		gen: 3,
	},
	iciumz: {
		inherit: true,
		gen: 3,
	},
	dragoniumz: {
		inherit: true,
		gen: 3,
	},
	darkiniumz: {
		inherit: true,
		gen: 3,
	},
	fairiumz: {
		inherit: true,
		gen: 3,
	},
	soundiumz: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	pikaniumz: {
		inherit: true,
		gen: 3,
	},
	pikashuniumz: {
		inherit: true,
		gen: 3,
	},
	aloraichiumz: {
		inherit: true,
		gen: 3,
	},
	snorliumz: {
		inherit: true,
		gen: 3,
		zMoveFrom: "Hyper Beam",
		shortDesc: "If held by a Snorlax with Hyper Beam, it can use Pulverizing Pancake.",
	},
	mewniumz: {
		inherit: true,
		gen: 3,
	},
	decidiumz: {
		inherit: true,
		gen: 3,
	},
	lycaniumz: {
		inherit: true,
		gen: 3,
		zMoveFrom: "Rock Crunch",
		shortDesc: "If held by a Lycanroc forme with Rock Crunch, it can use Splintered Stormshards.",
	},
	mimikiumz: {
		inherit: true,
		gen: 3,
		zMoveFrom: "Dazzling Gleam",
		shortDesc: "If held by a Mimikyu with Dazzling Gleam, it can use Let's Snuggle Forever.",
	},
	tapuniumz: {
		inherit: true,
		gen: 3,
	},
};
