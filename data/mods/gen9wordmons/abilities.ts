import { Abilities as Base } from '../../abilities';
import { ModdedAbilityData } from "../../../sim/dex-abilities";

export const Abilities: {[k: string]: ModdedAbilityData} = {
	overcharge: {
		onBasePowerPriority: 2,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Laser') {
				this.debug('Overcharge boost');
				return this.chainModify(1 + ((attacker.maxhp - attacker.hp) / attacker.maxhp) * 0.5);
			}
		},
		flags: {},
		name: "Overcharge",
		num: 1,
		shortDesc: "Laser-type moves gain power as HP gets lower, up to 1.5x power.",
	},
	stygian: {
		onBasePowerPriority: 2,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Pyramid') {
				this.debug('Stygian boost');
				return this.chainModify(1 + ((attacker.maxhp - attacker.hp) / attacker.maxhp) * 0.5);
			}
		},
		flags: {},
		name: "Stygian",
		num: 2,
		shortDesc: "Pyramid-type moves gain power as HP gets lower, up to 1.5x power.",
	},
	projection: {
		onBasePowerPriority: 2,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Camera') {
				this.debug('Projection boost');
				return this.chainModify(1 + ((attacker.maxhp - attacker.hp) / attacker.maxhp) * 0.5);
			}
		},
		flags: {},
		name: "Projection",
		num: 3,
		shortDesc: "Camera-type moves gain power as HP gets lower, up to 1.5x power.",
	},
	duality: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Rage') {
				move.type = 'Comfort';
				move.typeChangerBoosted = this.effect;
				return;
			}
			else if (move.type === 'Comfort') {
				move.type = 'Rage';
				move.typeChangerBoosted = this.effect;
				return;
			}
		},
		flags: {},
		name: "Duality",
		num: 4,
		shortDesc: "Comfort-type moves become Rage type. Rage-type moves become Comfort type",
	},
	absorbent: {
		name: "Absorbent",
		onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status' && !this.queue.willMove(target)) {
				this.heal(source.baseMaxhp / 10);
			}
		},
		num: 5,
		shortDesc: "This Pokemon heals 1/10 of its max HP if it moves after its target.",
	},
	feisty: {
		name: "Feisty",
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.level <= pokemon.level) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Feisty boost');
				return this.chainModify([15, 10]);
			}
		},
		num: 6,
		shortDesc: "This Pokemon's attacks have 1.5x power if it has the lowest level on the field.",
	},
	futuretechnology: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Laser') {
				this.debug('Future Technology boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Laser') {
				this.debug('Future Technology boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Future Technology",
		num: 7,
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Laser-type attack.",
	},
};

for (const abilities in Base) {
	const key = abilities as keyof typeof Abilities;
	if (!Abilities[key]) Abilities[key] = {inherit: true, isNonstandard: "Custom"};
}