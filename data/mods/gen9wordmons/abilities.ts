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
				this.heal(source.baseMaxhp / 10, source, source);
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
	futuretech: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Laser') {
				this.debug('Future Tech boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Laser') {
				this.debug('Future Tech boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Future Tech",
		num: 7,
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Laser-type attack.",
	},
	elastic: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			this.damage(target.lastDamage / 8, source, target);
		},
		flags: {},
		name: "Elastic",
		num: 8,
		shortDesc: "When hit by an attack, returns 1/8th dmg taken"
	},
	premonition: {
		onSourceModifyDamage(damage, source, target, move) {
			if (!source.hasType(move.type)) {
				return this.chainModify(0.5);
			}
		},
		flags: { breakable: 1 },
		name: "Premonition",
		num: 9,
		shortDesc: "This Pokemon takes 1/2 damage from non-STAB moves"
	},
	rebuild: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			const stats = ["atk", "def", "spa", "spd", "spe"] as const;
			const negativeStats = stats.filter(stat => pokemon.boosts[stat] < 0);

			if (negativeStats.length) {
				const stat = this.sample(negativeStats);
				this.boost({[stat]: 1}, pokemon, pokemon);
			}
		},
		flags: {},
		name: "Rebuild",
		num: 10,
		shortDesc: "Raises a random dropped stat by 1 each turn.",
	},
	heroic: {
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Rage') {
				return this.chainModify(0.5);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'rot') {
				this.add('-activate', pokemon, 'ability: Immunity');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'rot') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Heroic');
			}
			return false;
		},
		flags: { breakable: 1 },
		name: "Heroic",
		num: 11,
		shortDesc: "Power of Rage attacks against this Pokemon is halved. Immune to Rot.",
	},
	candlelight: {
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('candlelight - enhancing accuracy');
			return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Candle Light",
		num: 12,
		shortDesc: "This Pokemon's moves have their accuracy multiplied by 1.3.",
	},
};

for (const abilities in Base) {
	const key = abilities as keyof typeof Abilities;
	if (!Abilities[key]) Abilities[key] = {inherit: true, isNonstandard: "Custom"};
}