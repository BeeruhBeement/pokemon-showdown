import { ModdedAbilityData } from "../../../sim/dex-abilities";

export const Abilities: {[k: string]: ModdedAbilityData} = {
	overclocked: {
		onModifyDamage(damage, source, target, move) {
			return this.chainModify([5324, 4096]);
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status' && !source.forceSwitchFlag) {
				this.damage(source.baseMaxhp / 10, source, source, this.dex.items.get('lifeorb'));
			}
		},
		flags: {},
		name: "Overclocked",
		rating: 3.5,
		num: 0,
		shortDesc: "This Pokemon's attacks do 1.3x damage, and it loses 1/10 its max HP after the attack.",
	},
};
