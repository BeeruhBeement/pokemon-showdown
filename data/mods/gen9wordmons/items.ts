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
				const move = this.dex.moves.get(moveSlot.id);
				if (!pokemon.types.includes(move.type)) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			return this.chainModify(1.4);
		},
		num: 1,
		shortDesc: "Holder's Atk is 1.4x, but it can only select same type moves.",
	},
	purityrifle: {
		name: "Purity Rifle",
		spritenum: -1,
		fling: {
			basePower: 90,
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.dex.moves.get(moveSlot.id);
				if (!pokemon.types.includes(move.type)) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			return this.chainModify(1.4);
		},
		num: 2,
		shortDesc: "Holder's SpA is 1.4x, but it can only select same type moves.",
	},
	puritymask: {
		name: "Purity Mask",
		spritenum: -1,
		fling: {
			basePower: 20,
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.dex.moves.get(moveSlot.id);
				if (!pokemon.types.includes(move.type)) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onModifySpePriority: 1,
		onModifySpe(spe, pokemon) {
			return this.chainModify(1.4);
		},
		num: 3,
		shortDesc: "Holder's Spe is 1.4x, but it can only select same type moves.",
	},
};

for (const moves in Base) {
	const key = moves as keyof typeof Items;
	if (!Items[key]) Items[key] = {inherit: true, isNonstandard: "Custom"};
}