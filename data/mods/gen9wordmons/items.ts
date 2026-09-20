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
	campingequipment: {
		name: "Camping Equipment",
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
		onModifyDefPriority: 1,
		onModifyDef(def) {
			return def + 20;
		},
		num: 6,
		shortDesc: "Additive +20 to Defense.",
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
};

for (const moves in Base) {
	const key = moves as keyof typeof Items;
	if (!Items[key]) Items[key] = {inherit: true, isNonstandard: "Custom"};
}