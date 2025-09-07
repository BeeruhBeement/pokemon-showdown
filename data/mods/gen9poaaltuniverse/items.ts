// @ts-nocheck
import { Utils } from '../../../lib';
import { Items as Base } from '../../items';
import { ModdedItemDataTable } from '../../../sim/dex-items';

export const Items: ModdedItemDataTable = {
	boomerang: {
		name: "Boomerang",
		desc: "Fling hits twice. Cannot be lost.",
		spritenum: -3,
		onTakeItem(item, pokemon, source) {
			if ((source && source !== pokemon) || (this.activeMove && this.activeMove.id === 'knockoff')) {
				return false;
			}
		},
		fling: {
			basePower: 55,
		},
		num: 0,
	},
	vigorherb: {
		name: "Vigor Herb",
		desc: "Holder's recharge turn is skipped. Single use.",
		onUpdate(pokemon) {
			if (pokemon.volatiles["mustrecharge"] && pokemon.useItem()) {
				pokemon.removeVolatile("mustrecharge");
				this.add("cant", pokemon, "recharge");
				return;
			}
		},
		spritenum: -3,
		num: 0,
	},
	paddedhelmet: {
		name: "Padded Helmet",
		desc: "Holder takes half the recoil damage.",
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.recoil) move.recoil[1] = move.recoil[1] * 2;
		},
		num: 0,
		spritenum: -3,
	},
	ejectbandage: {
		name: "Eject Bandage",
		shortDesc: "Holder heals 33% on switch out. Single use.",
		spritenum: -3,
		onSwitchOut(source) {
			if (source.hp < source.maxhp) {
				source.heal(source.maxhp / 3);
				source.useItem();
			}
		},
		num: 0,
	},
	energydrink: {
		name: "Energy Drink",
		desc: "The holder was very tired and thus downed 17 cans of Red Bull, preventing it from falling asleep for the next 9 days.",
		shortDesc: "This Pokemon cannot fall asleep.",
		spritenum: -3,
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'item: Energy Drink');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-activate', target, 'item: Energy Drink');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-activate', target, 'item: Energy Drink');
				return null;
			}
		},
		num: 0,
	},
	managel: { // Can't figure out how to make it not clearBoosts(), so modifying moves instead 
		name: "Mana Gel",
		shortDesc: "The holder cannot have its stat changes cleared or stolen. Psych Up will fail when used against the holder.",
		spritenum: -3,
		onFoeModifyMove(move, source, target) {
			if (move.stealsBoosts) move.stealsBoosts = false;
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'psychup') return false;
		},
		num: 0,
	},
	buddylantern: {
		name: "Buddy Lantern",
		shortDesc: "Holder deals 0.125x damage to allies.",
		spritenum: -3,
		onModifyDamage(damage, source, target, move) {
			if (target.isAlly(source)) {
				this.debug('Buddy Lantern neutralize');
				return this.chainModify(0.125);
			}
		},
		num: 0,
	},
	doubledip: {
		name: "Double Dip",
		shortDesc: "If move misses, consumes item and uses move again.",
		spritenum: -3,
		fling: {
			basePower: 80,
		},
		// Effect immplemented in scripts under hitStepAccuracy
		num: 0,
	},
	brokenhourglass: {
		name: "Broken Hourglass",
		shortDesc: "Future moves land instantly at 1.3x power. Single use.",
		spritenum: -3,
		onModifyMovePriority: 1,
		onModifyMove(move, pokemon, target) {
			if (move.flags.futuremove) {
				move.ignoreImmunity = false;
				move.onTry = undefined;
			}
			if (move.id === 'wish') {
				move.slotCondition = undefined;
				move.condition = {};
			}
		},
		onTryMovePriority: -1,
		onTryMove(source, target, move) {
			if (move.id === 'wish'  && source.hp != source.baseMaxhp && source.useItem()) {
				this.heal(source.baseMaxhp *1.3/2, source, source)
			}
			if (move.id === 'wish' && source.hp === source.baseMaxhp) {
				this.add('-fail', source, 'move: Wish');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onBasePower(basePower, source, target, move) {
			if (move.flags.futuremove && move.category != 'Status' && source.useItem()) {
				return this.chainModify(1.3)
			}
		},
		fling: {
			basePower: 30,
			effect(pokemon) {
				let activate = false;
				const boosts: SparseBoostsTable = {};
				let i: BoostID;
				for (i in pokemon.boosts) {
						activate = true;
						boosts[i] = 0;
				}
				if (activate && !pokemon.item('managel')) {
					pokemon.setBoost(boosts);
					this.add('-clearboost', pokemon, '[silent]');
				}
			},
		},
		num: 0,
	},
	anchor: {
		name: "Anchor",
		spritenum: -3,
		shortDesc: "Holder's Spe is 0.5x, cannot be forced to switched out. Dhelmise: 1.5x Atk.",
		fling: {
			basePower: 130,
		},
		onFoeModifyMove(move, pokemon, target) {
			if (move.forceSwitch) move.forceSwitch = false;
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Dhelmise' || pokemon.m.fusion === 'Dhelmise') {
				return this.chainModify(1.5);
			}
		},
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
		num: 0,
		itemUser: ['Dhelmise'],
	},
	fieldcleats: { // Effect coded into terrains
		name: "Field Cleats",
		spritenum: -3,
		shortDesc: "Holder's moves are unaffected by terrains.",
		fling: {
			basePower: 80,
		},
		num: 0,
	},
};
