import { ModdedMoveData } from "../../../sim/dex-moves";

export const Moves: {[k: string]: ModdedMoveData} = {
	knockoff: {
		inherit: true,
		desc: "If the target is holding an item, this move's power is multiplied by 1.5.",
		shortDesc: "1.5x damage if foe holds an item.",
		basePower: 60,
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) { return },
	},
	deepfreeze: {
		inherit: true,
		isNonstandard: null,
	},
	slash: {
		inherit: true,
		desc: "Has a 30% chance to bleed the target and a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio. 30% chance to bleed.",
		secondary: {
			chance: 30,
			status: 'bld',
		},
	},
	watergun: {
		inherit: true,
		shortDesc: "30% chance to wet.",
		secondary: {
			chance: 30,
			status: 'wet',
		},
	},
	curse: {
		inherit: true,
		desc: "Applies a status based curse to every statused Pokemon on the field.",
		shortDesc: "Applies a status based curse to every statused Pokemon on the field.",
		onModifyMove(move, source, target) { return },
		onTryHit(target, source, move) {
			if (move.volatileStatus && target.volatiles['curse']) {
				return false;
			}
		},
		onHit(target, source) { return },
		condition: {
			onStart(pokemon, source) {
				switch (pokemon.status) {
					case 'brn':
						// implement
						this.add('-start', pokemon, 'Curse of Ignition', `[of] ${source}`);
						break;
					case 'par':
						this.add('-start', pokemon, 'Curse', `[of] ${source}`);
						break;
					case 'frz':
						this.add('-start', pokemon, 'Curse', `[of] ${source}`);
						break;
					case 'psn':
						this.add('-start', pokemon, 'Curse of Blight', `[of] ${source}`);
						break;	
					case 'tox':
						this.add('-start', pokemon, 'Curse', `[of] ${source}`);
						break;
					case 'slp':
						this.add('-start', pokemon, 'Curse', `[of] ${source}`);
						break;
					case 'bld':
						this.add('-start', pokemon, 'Curse of Deathwish', `[of] ${source}`);
						break;
					case 'wet':
						this.add('-start', pokemon, 'Curse', `[of] ${source}`);
						break;
					case 'ptr':
						// implement
						this.add('-start', pokemon, 'Curse of Crumbling', `[of] ${source}`);
						break;
				}
			},
			onResidualOrder: 12,
			onResidual(pokemon) {
				switch (pokemon.status) {
					case 'psn':
						this.damage(pokemon.baseMaxhp / 5);
						break;
					case 'bld':
						if (pokemon.hp > pokemon.maxhp / 3) {
							this.damage(pokemon.hp - pokemon.maxhp / 3);
						}
						break;
				}
			},
			onModifyPriority(priority, pokemon, target, move) {
				/*if (pokemon.status === 'brn') {
					return priority + 1;
				}*/
			},
			onModifyMove(move, source, target) {
				if (source.status === 'psn') {
					if (move.drain) {
						move.drain = [Math.floor(move.drain[0] * 1.25), move.drain[1]];
					} 
					else if (move.category !== 'Status') {
						move.drain = [1, 4];
					}
				}
			},
			onModifyDamage(damage, source, target, move) {
				if (source.status === 'bld') {
					return this.chainModify(1.25);
				}
			},
		},
		secondary: null,
		target: "all",
	},
	
	familiar: {
		inherit: true,
		condition: {
			duration: 4,
			onStart(target) {
				this.add('-start', target, 'move: Familiar');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles['familiar'].sourceSlot);
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to attack');
					return;
				}
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('familiar')), -6, 6);
				this.damage(pokemon.baseMaxhp * (2 ** typeMod) / 10, pokemon, target);
			},
			onEnd(target) {
				this.add('-end', target, 'move: Familiar');
			},
		},
		isNonstandard: null,
	},
};