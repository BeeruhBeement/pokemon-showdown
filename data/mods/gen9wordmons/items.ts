import { Items as Base } from '../../items';
import { ModdedItemData } from "../../../sim/dex-items";

export const Items: {[k: string]: ModdedItemData} = {
	puritymaul: {
		name: "Purity Maul",
		spritenum: -1,
		fling: {
			basePower: 120,
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.effectState.purity?.includes(moveSlot.id)) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			return this.chainModify(1.4);
		},
		onAfterMove(source, target, move) {
			if (!this.effectState.purity) {
				this.effectState.purity = [];
			}
			if (!this.effectState.purity.includes(move.id)) {
				this.effectState.purity.push(move.id);
			}
		},
		onSwitchOut(pokemon) {
			delete this.effectState.purity;
		},
		num: 1,
		shortDesc: "Holder's Atk is 1.4x, can only use each move once per switchin.",
	},
	purityrifle: {
		name: "Purity Rifle",
		spritenum: -1,
		fling: {
			basePower: 90,
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.effectState.purity?.includes(moveSlot.id)) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			return this.chainModify(1.4);
		},
		onAfterMove(source, target, move) {
			if (!this.effectState.purity) {
				this.effectState.purity = [];
			}
			if (!this.effectState.purity.includes(move.id)) {
				this.effectState.purity.push(move.id);
			}
		},
		onSwitchOut(pokemon) {
			delete this.effectState.purity;
		},
		num: 2,
		shortDesc: "Holder's SpA is 1.4x, can only use each move once per switchin.",
	},
	puritymask: {
		name: "Purity Mask",
		spritenum: -1,
		fling: {
			basePower: 20,
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.effectState.purity?.includes(moveSlot.id)) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onModifySpePriority: 1,
		onModifySpe(spe, pokemon) {
			return this.chainModify(1.4);
		},
		onAfterMove(source, target, move) {
			if (!this.effectState.purity) {
				this.effectState.purity = [];
			}
			if (!this.effectState.purity.includes(move.id)) {
				this.effectState.purity.push(move.id);
			}
		},
		onSwitchOut(pokemon) {
			delete this.effectState.purity;
		},
		num: 3,
		shortDesc: "Holder's Spe is 1.4x, can only use each move once per switchin.",
	},
	radioactivevial: {
		name: "Radioactive Vial",
		spritenum: -1,
		fling: {
			basePower: 30,
			status: 'rad',
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('rad', pokemon);
		},
		num: 4,
		shortDesc: "At the end of every turn, this item attempts to irradiate the holder.",
	},
	campinggear: {
		name: "Camping Gear",
		spritenum: -1,
		fling: {
			basePower: 80,
		},
		num: 5,
		shortDesc: "No competitive use.",
	},
	treebark: {
		name: "Tree Bark",
		spritenum: -1,
		fling: {
			basePower: 40,
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.dex.moves.get(moveSlot.id);
				if (!pokemon.types.includes(move.type)) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onModifyDefPriority: 1,
		onModifyDef(def) {
			return this.chainModify(1.5);
		},
		num: 6,
		shortDesc: "Holder's Def is 1.5x, but it can only select same type moves.",
	},
	foghorn: {
		name: "Foghorn",
		spritenum: -1,
		fling: {
			basePower: 80,
		},
		num: 7,
		shortDesc: "No competitive use.",
	},
	identitycard: {
		name: "Identity Card",
		spritenum: -1,
		fling: {
			basePower: 20,
		},
		num: 8,
		shortDesc: "No competitive use.",
	},
	firstaidkit: {
		name: "First Aid Kit",
		spritenum: -1,
		fling: {
			basePower: 60,
		},
		num: 9,
		shortDesc: "No competitive use.",
	},
	utilitybelt: {
		name: "Utility Belt",
		spritenum: -1,
		fling: {
			basePower: 60,
		},
		num: 10,
		shortDesc: "No competitive use.",
	},
	minerhat: {
		name: "Miner Hat",
		spritenum: -1,
		fling: {
			basePower: 60,
		},
		num: 11,
		shortDesc: "No competitive use.",
	},
	fishhook: {
		name: "Fish Hook",
		spritenum: -1,
		fling: {
			basePower: 60,
		},
		num: 12,
		shortDesc: "No competitive use.",
	},
	breakfast: {
		name: "Breakfast",
		spritenum: -1,
		fling: {
			basePower: 30,
		},
		num: 13,
		shortDesc: "No competitive use.",
	},
	sugar: {
		name: "Breakfast",
		spritenum: -1,
		fling: {
			basePower: 30,
		},
		num: 14,
		shortDesc: "No competitive use.",
	},
	deckofcard: {
		name: "Deck of Cards",
		spritenum: -1,
		fling: {
			basePower: 30,
		},
		num: 15,
		shortDesc: "No competitive use.",
	},
};

for (const moves in Base) {
	const key = moves as keyof typeof Items;
	if (!Items[key]) Items[key] = {inherit: true, isNonstandard: "Custom"};
}