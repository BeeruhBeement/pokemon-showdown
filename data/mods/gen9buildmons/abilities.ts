import { Battle } from '../../../sim';

export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	// furret
	// skill
	stuffedguardian: {
		onAfterTerastallization(pokemon) {
			if (pokemon.hp > pokemon.maxhp / 4) this.directDamage(pokemon.maxhp / 4);
			else this.directDamage(pokemon.hp - 1);
			pokemon.addVolatile('substitute');
		},
		onStart(pokemon) {
			pokemon.canTerastallize = pokemon.teraType;
		},
		flags: {},
		name: "Stuffed Guardian",
		desc: "On Activation sets up Substitute for 1/4th of the user's Max HP. If the user has less than 1/4th of its max HP leaves it at 1 HP.",
		shortDesc: "On Activation sets up Substitute for 1/4th of the user's max HP.",
	},
	// tree 1
	andever: {
		onStart(pokemon) {
			if (pokemon.hp > pokemon.maxhp / 4) this.directDamage(pokemon.maxhp / 4);
			else this.directDamage(pokemon.hp - 1);
			pokemon.addVolatile('substitute');
		},
		flags: {},
		name: "And Ever",
		desc: "On switch-in sets up Substitute for 1/4th of the user's max HP. If the user has less than 1/4th of its max HP leaves it at 1 HP.",
		shortDesc: "On switch-in sets up Substitute for 1/4th of the user's max HP.",
		rating: 2,
	},
	itneverends: {
		onAnyFaint() {
			this.heal(30, this.effectState.target);
		},
		flags: {},
		name: "It Never Ends",
		shortDesc: "When any Pokemon faints, heal 30 HP.",
		rating: 1,
	},
	emotionalsupport: {
		flags: {},
		name: "Emotional Support",
		shortDesc: "Substitute breaking counts for on faint Perks.",
		rating: 1,
	},
	// tree 2
	prepping: {
		onSourceDamagingHit(damage, target, source, move) {
			if (move?.effectType === 'Move' && target.getMoveHitData(move).crit) {
				this.boost({ atk: 5 }, source);
			}
		},
		flags: {},
		name: "Prepping",
		shortDesc: "+5% Atk Boost when landing a Critical Hit.",
		rating: 1,
	},
	safespot: {
		onBasePower(relayVar, source, target, move) {
			if (source.volatiles['substitute']) return this.chainModify(1.05);
		},
		flags: {},
		name: "Safespot",
		shortDesc: "+5% Base Power of moves while behind Substitute.",
		rating: 1,
	},
	// tree 3
	hamsterwheel: {
		onModifySpe(spe) {
			return this.chainModify(1.15);
		},
		flags: {},
		name: "Hamster Wheel",
		shortDesc: "+15% Speed.",
		rating: 1,
	},

	// granbull
	// skill
	wildhunt: {
		onStart(pokemon) {
			pokemon.canTerastallize = null;
		},
		onAnyFaint(pokemon) {
			pokemon.canTerastallize = pokemon.teraType;
		},
		onAfterTerastallization(pokemon) {
			pokemon.addVolatile('wildhunt');
		},
		condition: {
			duration: 1,
			noCopy: true,
			onStart(target) {
				this.add('-start', target, 'Wild Hunt');
			},
			onEnd(target) {
				this.add('-end', target, 'Wild Hunt');
			},
			onSourceDamagingHit(damage, target, source, move) {
				if (!source?.hp) return;
				const healAmount = Math.max(1, Math.trunc(target.lastDamage / 3));
				const overheal = Math.max(0, healAmount - (source.maxhp - source.hp));
				this.heal(healAmount, source, source, "drain");
				if (!overheal) return;

				const oldShield = source.m.buildmonsShield || 0;
				const newShield = Math.min(oldShield + overheal, source.maxhp);
				source.m.buildmonsShield = newShield;
				this.add('-end', source, `Shield: ${Math.floor(oldShield)}`);
				this.add('-start', source, `Shield: ${Math.floor(newShield)}`, '[silent]');
			},
			onModifyDamage(relayVar, source, target, move) {
				if (move.type === "Fairy" || (move.type === "Fighting" && source.hasAbility('packapunch'))) {
					return this.chainModify(1.2);
				}
			},
			onResidualOrder: 1,
			onResidual(pokemon) {
				this.damage(pokemon.maxhp / 4, pokemon);
			},
		},
		flags: {},
		name: "Wild Hunt",
		desc: "Can be activated once any Pokemon on the field Faints while this Pokemon is active. Once activated for the turn moves gain 1/3 drain and if this causes to heal over 100% shield is granted for that amount, Fairy-type moves are boosted by 20%, but at the end of the turn this Pokemon will take 25% of its max HP in damage.",
		shortDesc: "Can activate after any Faint: boost Fairy 1.2x, moves gain drain, take dmg on residual.",
	},
	// tree 1
	physres: {
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === "Physical") {
				return this.chainModify(0.95);
			}
		},
		flags: {},
		name: "Phys Res",
		shortDesc: "Physical damage taken is reduced by 5%.",
		rating: 1,
	},
	spreaddmg: {
		onModifyDamage(relayVar, source, target, move) {
			if (move.spreadHit) {
				return this.chainModify(1.1);
			}
		},
		flags: {},
		name: "Spread DMG",
		shortDesc: "Spread moves deal 10% more damage.",
		rating: 1,
	},
	bigmaws: {
		onModifyMove(move, pokemon, target) {
			if (move.flags.bite) move.target = 'allAdjacentFoes';
		},
		flags: {},
		name: "Big Maws",
		shortDesc: "Biting moves become spread. (All adjcent foes)",
		rating: 1,
	},
	glitterbomb: {
		onSourceDamagingHit(damage, target, source, move) {
			if (move.type === "Fairy") {
				target.addVolatile("glitterbomb");
			}
		},
		condition: {
			duration: 2,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Glitter Bomb');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Glitter Bomb');
			},
			onModifyDamage(relayVar, source, target, move) {
				if (move && this.effectState.target.getMoveHitData(move).typeMod > 0) {
					return this.chainModify(1.1);
				}
			},
		},
		flags: {},
		name: "Glitter Bomb",
		desc: "Fairy moves apply Glitter Bomb on foes, increasing super-effective dmg taken by 1.1x for 2 turns.",
		shortDesc: "Fairy moves apply Glitter Bomb on foes.",
		rating: 1,
	},
	entombingjaws: {
		onSourceDamagingHit(damage, target, source, move) {
			if (move.flags.bite && !target.isAlly(source)) {
				target.trySetStatus("ptr");
			}
		},
		flags: {},
		name: "Entombing Jaws",
		shortDesc: "Biting moves apply Petrify if target is foe.",
		rating: 3,
	},
	// tree 2
	swapptr: {
		onAnyTryAddVolatile(status, target, source, sourceEffect) {
			if (source !== this.effectState.target || target === source) return;
			if (status.id === 'flinch' || status.id.includes("down")) {
				target.trySetStatus('ptr');
				return null;
			}
		},
		flags: {},
		name: "Swap PTR",
		shortDesc: "Swap Flinch/Stat Down effects for Petrify status.",
		rating: 1,
	},
	vigor: {
		onStart(pokemon) {
			const appliedBoosts = pokemon.m.buildmonsMaxHPBoosts || (pokemon.m.buildmonsMaxHPBoosts = {});
			if (appliedBoosts.vigor) return;
			const oldMaxHP = pokemon.maxhp;
			pokemon.maxhp *= 1.2;
			pokemon.sethp(pokemon.hp + (pokemon.maxhp - oldMaxHP));
			appliedBoosts.vigor = true;
		},
		flags: {},
		name: "Vigor",
		shortDesc: "+20% Max HP",
		rating: 1,
	},
	whiletheyredown: {
		onAnyAfterMoveSecondary(target, source, move) {
			const user = this.effectState.target;
			if (!source || source === target || !target.hp || !move.totalDamage || !user.hp || !user.isActive ||
				target.isAlly(user)) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit && !move.smartTarget ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp * 5 <= target.maxhp * 2 && (target.hp + damage) * 5 > target.maxhp * 2) {
				this.actions.useMove('lowkick', user, { target });
			}
		},
		flags: {},
		name: "While They're Down",
		desc: "When a foe is brought to 40% HP or less by damage, uses Low Kick on them.",
		shortDesc: "Uses Low Kick when a foe is brought to 40% HP or less.",
		rating: 1,
	},
	gildedshackles: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Steel') {
				move.type = 'Fairy';
				move.typeChangerBoosted = this.effect;
			}
		},
		onModifyDamage(relayVar, source, target, move) {
			if (!source.set.shiny) {
				this.chainModify(1.15);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.set.shiny) {
				if (pokemon.volatiles['spedown']) pokemon.removeVolatile('spedown');
				return;
			}
			if (!pokemon.volatiles['spedown']) pokemon.addVolatile('spedown', pokemon, this.effect);
			if (pokemon.volatiles['spedown']) pokemon.volatiles['spedown'].duration = 1;
		},
		onResidual(pokemon) {
			if (pokemon.set.shiny) this.heal(pokemon.maxhp / 10, pokemon);
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.set.shiny) {
				return this.chainModify(0.95);
			}
		},
		flags: {},
		name: "Gilded Shackles",
		desc: "Steel-type moves are Fairy-type. If this Pokemon isn't Shiny it deals 15% more damage and has Spe Down. If this Pokemon is Shiny it heals 5% on Residual and takes 5% less damage. Additionally become immune to Spe Down while Shiny.",
		shortDesc: "Steel-type moves are Fairy-type. + Additional effects.",
		rating: 1,
	},
	rocksplosion: {
		onModifyDamage(relayVar, source, target, move) {
			if (target.status === 'ptr') {
				target.cureStatus();
				return this.chainModify(1.2);
			}
		},
		flags: {},
		name: "Rocksplosion",
		desc: "Hitting a Petrified target deals 20% more damage and cures their status.",
		shortDesc: "Hitting a PTR target deals 20% more damage and cures their status.",
		rating: 2,
	},
	// tree 3
	packapunch: {
		onModifyDamage(relayVar, source, target, move) {
			if (move.type === "Fighting") {
				return this.chainModify(1.1);
			}
		},
		flags: {},
		name: "Pack-a-Punch",
		desc: "Boosts Fighting moves damage by 1.1x. They also gain the damage boost from Wild Hunt.",
		shortDesc: "Boosts Fighting moves damage by 1.1x.",
		rating: 1,
	},
	lickwounds: {
		onAnyDamage(damage, target, source, effect) {
			const user = this.effectState.target;
			if (effect.effectType === 'Move' && (effect as Move).flags['bite'] &&
				source === user && target.isAlly(user)) {
				this.heal(damage, target, user, effect);
				return 0;
			}
		},
		onResidual(pokemon) {
			this.heal(pokemon.maxhp / 20, pokemon);
		},
		flags: {},
		name: "Lick Wounds",
		desc: "Biting moves heal instead of damaging if target is ally. 5% heal on Residual.",
		shortDesc: "Biting moves heal if target is ally. 5% heal on Residual.",
		rating: 1,
	},
	beararms: {
		onModifyAtk(atk, pokemon) {
			return this.chainModify(1.1);
		},
		flags: {},
		name: "Bear Arms",
		shortDesc: "10% more Attack.",
		rating: 1,
	},
	shieldedfavor: {
		onAfterTerastallization(pokemon) {
			pokemon.m.buildmonsShield = Math.min((pokemon.m.buildmonsShield || 0) + pokemon.maxhp / 10, pokemon.maxhp);
		},
		flags: {},
		name: "Shielded Favor",
		shortDesc: "Gain 10% shield when activating Skill.",
		rating: 1,
	},

	// crustle
	// skill
	craggybulwark: {
		flags: {},
		name: "Craggy Bulwark",
		shortDesc: "Placeholder.",
	},
	// tree 1
	rebar: {
		onModifyDef() {
			return this.chainModify(1.075);
		},
		onModifySpD() {
			return this.chainModify(1.075);
		},
		flags: {},
		name: "Rebar",
		shortDesc: "Boosts Defense and Special Defense by 7.5%.",
		rating: 1,
	},
	goodeatings: {
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const noheals = ['drain', 'leechseed'];
			if (!noheals.includes(effect.id)) {
				return this.chainModify([12, 10]);
			}
		},
		flags: {},
		name: "Good Eatings",
		shortDesc: "Increases healing effectiveness by 1.2x.",
		rating: 1,
	},
	foodstorage: {
		onUpdate(pokemon) {
			pokemon.addVolatile('foodstorage');
		},
		condition: {
			onTryHeal(relayVar, target, source, effect) {
				const noheals = ['drain', 'leechseed'];
				let mod = this.effectState.foodstorageStacks + 10;
				if (!noheals.includes(effect.id)) {
					this.effectState.healedThisTurn = true;
					this.effectState.target.removeVolatile('foodstorage');
					return this.chainModify([mod, 10]);
				}
			},
			onStart(pokemon) {
				this.effectState.foodstorageStacks = 0;
				this.add('-start', pokemon, `foodstorage: ${this.effectState.foodstorageStacks}x`, '[silent]');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, `foodstorage: ${this.effectState.foodstorageStacks}x`, '[silent]');
				this.effectState.foodstorageStacks = 0;
			},
			onResidual(pokemon) {
				if (this.effectState.healedThisTurn === true) return;
				pokemon.addVolatile('foodstorage');
			},
			onRestart(pokemon) {
				this.add('-end', pokemon, `foodstorage: ${this.effectState.foodstorageStacks}x`, '[silent]');
				this.effectState.foodstorageStacks++;
				this.add('-start', pokemon, `foodstorage: ${this.effectState.foodstorageStacks}x`, '[silent]');
			},
		},
		flags: {},
		name: "Food Storage",
		desc: "Every turn spent without healing gain a Food Storage stack, increasing healing effectiveness by 10% for each.",
		shortDesc: "Every turn spent without healing gain a Food Storage stack.",
		rating: 1,
	},
	rampart: {
		onUpdate(pokemon) {
			pokemon.addVolatile('rampart');
		},
		condition: {
			onTryHeal(relayVar, target, source, effect) {
				const noheals = ['drain', 'leechseed'];
				if (!noheals.includes(effect.id)) {
					this.effectState.healedThisTurn = true;
					this.effectState.target.removeVolatile('rampart');
				}
			},
			onStart(pokemon) {
				this.effectState.rampartStacks = 0;
				this.add('-start', pokemon, `Rampart: ${this.effectState.rampartStacks}x`, '[silent]');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, `Rampart: ${this.effectState.rampartStacks}x`, '[silent]');
				this.effectState.rampartStacks = 0;
			},
			onResidual(pokemon) {
				if (this.effectState.healedThisTurn === true) return;
				pokemon.addVolatile('rampart');
			},
			onRestart(pokemon) {
				if (this.effectState.rampartStacks < 3) {
					this.add('-end', pokemon, `Rampart: ${this.effectState.rampartStacks}x`, '[silent]');
					this.effectState.rampartStacks++;
					this.add('-start', pokemon, `Rampart: ${this.effectState.rampartStacks}x`, '[silent]');
				}
			},
		},
		flags: {},
		name: "Rampart",
		desc: "Every turn spent without healing gain a Rampart stack, up to 3, reduring your damage taken by 8% for each stack.",
		shortDesc: "Every turn spent without healing gain a Rampart stack.",
		rating: 1,
	},
	mysteriousrockinn: {
		onModifyDef(relayVar, target, source, move) {
			let mod = (target.maxhp - target.hp) / target.maxhp + 1;
			return this.chainModify(mod)
		},
		onModifySpD(relayVar, target, source, move) {
			let mod = (target.maxhp - target.hp) / target.maxhp + 1;
			return this.chainModify(mod)
		},
		flags: {},
		name: "Mysterious Rock Inn",
		shortDesc: "Defenses boosted by half of missing HP %.",
		rating: 2,
	},
	monolith: {
		flags: {},
		name: "Monolith",
		shortDesc: "Placeholder.",
		rating: 1,
	},
	// tree 2
	shrapnel: {
		onSourceDamagingHit(damage, target, source, move) {
			if (move.type === 'Rock') {
				this.damage(source.getStat('atk') * move.basePower / 2000, target, source);
			}
		},
		flags: {},
		name: "Shrapnel",
		desc: "Rock moves deal additional chip damage that is equals to the Attack multiplied by move Base Power and divided by 2000, rounded down.",
		shortDesc: "Rock moves deal additional damage.",
		rating: 1,
	},
	rockpower: {
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.activeTurns === 1 && move.type === 'Rock') return this.chainModify(1.15);
		},
		flags: {},
		name: "Rock Power",
		shortDesc: "Rock moves have 15% more Base Power on 1st turn out.",
		rating: 1,
	},
	switchout: {
		onEmergencyExit(originalHp, target) {
			if (!target.volatiles['recharge'] || !target.volatiles['taunt']) return;
			if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.switchFlag = false;
				}
			}
			this.damage(target.hp / 4, target, target);
			target.switchFlag = true;
			this.add('-activate', target, 'ability: Switch Out');
		},
		flags: {},
		name: "Switch Out",
		shortDesc: "If Recharge and Taunt are both active the Pokemon loses 1/4th current HP and switches.",
		rating: 1,
	},
	kickstart: {
		onModifyWeight(weighthg, pokemon) {
			if (pokemon.activeTurns <= 1) return weighthg + 20;
		},
		flags: {},
		name: "Kick-Start",
		shortDesc: "+2 Base PP on the first turn out.",
		rating: 2,
	},
	// tree 3

	// beheeyem
	// skill
	wormhole: {
		onAfterTerastallization(pokemon) {
			pokemon.addVolatile('wormhole');
		},
		onStart(pokemon) {
			pokemon.canTerastallize = null;
		},
		onUpdate(pokemon) {
			if (pokemon.activeTurns === 2) pokemon.canTerastallize = pokemon.teraType;
		},
		condition: {
			duration: 2,
			noCopy: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Wormhole', '[silent]');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Wormhole', '[silent]');
			},
			onInvulnerability(target, source, move) {
				if (this.effectState.duration === 2) {
					return false;
				} else {
					return true;
				}
			},
			onBasePower(relayVar, source, target, move) {
				return this.chainModify(1.3);
			},
			onBeforeMove(pokemon) {
				if (this.effectState.duration === 2) {
					return false;
				}
			},
		},
		flags: {},
		name: "Wormhole",
		desc: "After being active for 2 turns this Ability can be activated. When activated the Pokemon does not act for the turn and avoids all attacks, it also gains 1.3x power on its moves on the turn after.",
		shortDesc: "After being active for 2 turns can activate: semi invulnerable and 1.3x power next turn.",
	},
	// tree 1
	probing: {
		onModifyDamage(relayVar, source, target, move) {
			if (target.status === 'frz' || target.status === 'rad') {
				return this.chainModify(1.1);
			}
		},
		flags: {},
		name: "Probing",
		shortDesc: "Increases damage dealt to frozen or irradiated targets by 10%.",
		rating: 1,
	},
	spacemodulator: {
		onAnyTryAddVolatile(status, target, source, sourceEffect) {
			if (source !== this.effectState.target || target === source) return;
			if (status.id === 'confusion') {
				target.trySetStatus('rad');
				return null;
			}
		},
		flags: {},
		name: "Space Modulator",
		shortDesc: "Swaps confusion with Radiation.",
		rating: 1,
	},
	dnadecompiler: {
		onAnyAfterSetStatus(status, target, source, effect) {
			if (source !== this.effectState.target || target === source) return;
			if (status.id === 'rad') {
				target.addVolatile('spddown');
			}
		},
		flags: {},
		name: "DNA Decompiler",
		shortDesc: "Irradiating a target applies SpD Down.",
		rating: 1,
	},
	loophole: {
		onAnyDamage(damage, target, source, effect) {
			if (target === this.effectState.target) this.heal(target.maxhp / 20, target, target);
		},
		flags: {},
		name: "Loophole",
		shortDesc: "Heals 5% after taking any damage.",
		rating: 1,
	},
	nuclearoption: {
		onFaint(pokemon) {
			for (const target of pokemon.foes()) {
				target.trySetStatus('rad', pokemon);
			}
		},
		flags: {},
		name: "Nuclear Option",
		shortDesc: "On faint irradiates all foes.",
		rating: 1,
	},
	hyperspaceleap: {
		onAfterTerastallization(pokemon) {
			this.runEvent('Faint', pokemon);
		},
		flags: {},
		name: "Hyperspace Leap",
		shortDesc: "Activating Wormhole counts for On Faint effects.",
		rating: 1,
	},
	// tree 2
	surveillancedrone: {
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Ground') {
				return this.chainModify(0.8);
			}
		},
		flags: {},
		name: "Surveillance Drone",
		shortDesc: "Weakens Ground type damage taken by 20%.",
		rating: 1,
	},
	laserproficency: {
		onBasePower(relayVar, source, target, move) {
			if (move.name.includes('Beam')) return this.chainModify(1.1);
		},
		flags: {},
		name: "Laser Proficency",
		desc: 'Boost the Base Power of moves that contain "Beam" in their name by 10%.',
		shortDesc: 'Boost the Base Power of "Beam" moves by 10%.',
		rating: 1,
	},
	pewpewpew: {
		onModifyMove(move, pokemon, target) {
			if (move.name.includes('Beam')) move.flags.bullet = 1;
		},
		flags: {},
		name: "Pew Pew Pew",
		desc: 'Moves that have "Beam" in their name have the bullet flag added.',
		shortDesc: '"Beam" moves have the bullet flag added.',
		rating: 1,
	},
	voidlight: {
		onAfterTerastallization(pokemon) {
			this.heal(pokemon.maxhp / 4, pokemon);
		},
		flags: {},
		name: "Voidlight",
		shortDesc: "On Skill activation heal for 1/4th of max HP.",
		rating: 1,
	},
	tractorbeam: {
		onStart(pokemon) {
			pokemon.addVolatile('tractorbeam');
		},
		condition: {
			onStart(pokemon) {
				this.effectState.lastMove = '';
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasAbility('tractorbeam')) {
					pokemon.removeVolatile('tractorbeam');
					return;
				}
				if (move.callsMove || move.name.includes("Beam")) return;
				if (this.effectState.lastMove === move.id && pokemon.moveLastTurnResult) {
					this.effectState.numConsecutive++;
				} else if (pokemon.volatiles['twoturnmove']) {
					if (this.effectState.lastMove !== move.id) {
						this.effectState.numConsecutive = 1;
					} else {
						this.effectState.numConsecutive++;
					}
				} else {
					this.effectState.numConsecutive = 0;
				}
				this.effectState.lastMove = move.id;
			},
			onSourceDamagingHit(damage, target, source, move) {
				if (this.effectState.numConsecutive >= 2) {
					target.addVolatile('partiallytrapped', source);
					this.effectState.numConsecutive = 0;
				}
			},
		},
		flags: {},
		name: "Tractor Beam",
		desc: "Using a Beam move twice consecutively applies Partially Trapped to target.",
		shortDesc: "Using 2 Beam moves consecutively applies Partially Trapped to target.",
		rating: 1,
	},
	// tree 3
	enginecoolant: {
		onModifyWeight(weighthg) {
			if (this.effectState.target.status === 'frz') return weighthg + 20;
		},
		flags: {},
		name: "Engine Coolant",
		shortDesc: "While Frozen base PP is increased by 2.",
		rating: 1,
	},
	binarysignal: {
		flags: {},
		name: "Binary Signal",
		shortDesc: "Placeholder.",
		rating: 1,
	},
	servitordrone: {
		onAfterTerastallization(pokemon) {
			pokemon.addVolatile('servitordrone');
		},
		condition: {
			noCopy: true,
			duration: 4,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Servitor Drone', '[silent]');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Servitor Drone', '[silent]');
			},
			onResidual(pokemon) {
				pokemon.adjacentFoes().forEach(foe => {
					let critChance = this.runEvent('ModifyCritRatio', pokemon, foe, this.effect as ActiveMove, 10);
					critChance = this.clampIntRange(critChance, 0, 100);
					let crit = 1;
					if (pokemon.hasAbility('Cold Steel') && this.randomChance(critChance, 100)) {
						crit = 1.5;
						foe.trySetStatus('frz');
					}
					this.damage(foe.maxhp * crit / 40 * 3, foe, pokemon);
				});
			},
		},
		flags: {},
		name: "Servitor Drone",
		desc: "On Skill activation gain a Servitor Drone deal 7.5% damage to adjacent foes on Residual. The drone persists for 4 turns.",
		shortDesc: "On Skill activation gain a Drone deal 7.5% damage to adjacent foes.",
		rating: 1,
	},
	coldsteel: {
		flags: {},
		name: "Cold Steel",
		desc: "The Servitor Drone gains a 10% chance to crit, freezing targets and dealing 50% more damage. This crit chance can be boosted by other effects.",
		shortDesc: "Servitor Drone gains a 10% chance to crit for frz and 1.5x dmg.",
		rating: 1,
	},
	cybernetics: {
		onUpdate(pokemon) {
			if (!pokemon.isStarted) return;
			if (pokemon.hasType('Steel')) return false;
			if (!pokemon.addType('Steel')) return false;
			this.add('-start', pokemon, 'typeadd', 'Steel', '[from] ability: Cybernetics');
		},
		onModifyDamage() {
			this.chainModify(1.1);
		},
		flags: {},
		name: "Cybernetics",
		shortDesc: "Adds the Steel type to the Pokemon. Boosts damage by 10%.",
		rating: 2,
	},
	servoarm: {
		onUpdate(pokemon) {
			pokemon.addVolatile('servoarm');
		},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Servo Arm', '[silent]');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Servo Arm', '[silent]');
			},
			onModifyAtk(atk, pokemon) {
				return atk + pokemon.getStat('spa') / 10 * 4;
			},
			onAfterMoveSecondarySelf(source, target, activeMove) {
				if (activeMove.id === 'metalclaw') return;
				const move = this.dex.getActiveMove('metalclaw');
				move.flags.contact = undefined;
				if (target && !target.fainted) this.actions.useMove(move, source, { target });
			},
		},
		flags: {},
		name: "Servo Arm",
		desc: "Attack is boosted by 40% of SpA, including stat changes. Every attack is followed by using Metal Claw with the contact flag removed. Doesn't activate on Metal Claw.",
		shortDesc: "Attack is boosted by 40% of SpA. Follows every attack with Metal Claw.",
		rating: 1,
	},
	
	//accelgor
	//skill
	rapture: {
		onAfterTerastallization(pokemon) {
			this.damage(pokemon.hp / 2);
			for (const ally of pokemon.allies()) {
				ally.addVolatile('haste');
			}
		},
		onSwitchIn(pokemon) {
			pokemon.canTerastallize = null;
		},
		onUpdate(pokemon) {
			if (pokemon.hp >= 60) pokemon.canTerastallize = pokemon.teraType;
		},
		flags: {},
		name: "Rapture",
		desc: "Can be activated while your HP is greater than or equals to 60. On activation lose 1/2 of your current HP and grant your allies Haste.",
		shortDesc: "On activation lose 1/2 HP to grant allies Haste.",
	},
	// tree 1
	evasion: {
		onStart(pokemon) {
			if (pokemon.moveSlots.some(move => move.id === 'evade')) return;
			pokemon.moveSlots.push({
				move: 'evade' as ID,
				pp: 5,
				maxpp: 5,
				id: 'evade' as ID,
				disabled: false,
				used: false,
			});
		},
		flags: { breakable: 1 },
		name: "Evasion",
		desc: "Evade is added to moves. Evade costs 5 PP, dodges all moves for the turn, and cannot be used on consecutive turns.",
		shortDesc: "Evade is added to moves.",
		rating: 1,
	},
	swiftmend: {
		onDamagingHit(damage, target, source, move) {
			this.effectState.hit = true;
		},
		onResidual(target, source, effect) {
			if (!this.effectState.hit) {
				this.heal((target.baseMaxhp - target.hp) / 6);
			}
			this.effectState.hit = false;
		},
		flags: {},
		name: "Swift Mend",
		shortDesc: "Heal 1/6th of missing HP on turns when not taken any damage for the turn.",
		rating: 1,
	},
	protectivewraps: {
		onModifyDefPriority: 1,
		onModifyDef(def, target, source, move) {
			if (target.getStat('def') > target.getStat('spd')) return;
			return target.getStat('spd');
		},
		onModifySpDPriority: 2,
		onModifySpD(spd) {
			return this.chainModify(1.1);
		},
		flags: {},
		name: "Protective Wraps",
		shortDesc: "Def matches SpD unless it is already higher. SpD * 1.1x.",
		rating: 1,
	},
	river: {
		onDamagingHit(damage, target, source, move) {
			if (this.randomChance(1, 2)) {
				source.trySetStatus('wet', target);
			}
		},
		flags: {},
		name: "River",
		shortDesc: "50% chance a Pokemon attacking this Pokemon will be wet.",
		rating: 1,
	},
	//tree 2
	blooddrenched: {
		onModifySpA(spa, pokemon) {
			if (pokemon.status === 'bld') {
				return this.chainModify(1.12);
			}
		},
		flags: {},
		name: "Blooddrenched",
		shortDesc: "While Bleeding gain 12% more Special Attack.",
		rating: 1,
	},
	bloodyshroud: {
		onSourceModifyDamage(damage, source, target, move) {
			const statuses = ['brn', 'frz', 'par'];
			const hasStatusSecondary = statuses.includes(move.secondary?.status || '') ||
				move.secondaries?.some(secondary => statuses.includes(secondary.status || ''));
			if (hasStatusSecondary) {
				return this.chainModify(0.9);
			}
		},
		onModifyAccuracyPriority: 10,
		onModifyAccuracy(accuracy, target, source, move) {
			const statuses = ['brn', 'frz', 'par'];
			const hasStatus = move.status && statuses.includes(move.status);
			if (move.category === 'Status' && typeof accuracy === 'number' && hasStatus) {
				return 50;
			}
		},
		flags: { breakable: 1 },
		name: "Bloody Shroud",
		desc: "Moves with a chance to BRN/FRZ/PAR deal 10% less damage to this Pokémon. Additionally Status moves that apply those statuses have 50% accuracy when used against this Pokemon.",
		shortDesc: "Moves with a chance to BRN/FRZ/PAR deal 10% less damage to this Pokémon.",
		rating: 1,
	},
	corrosiveaura: {
		onDamagingHit(damage, target, source, move) {
			this.effectState.hit = true;
		},
		onResidual(target, source, effect) {
			if (!this.effectState.hit) {
				target.adjacentFoes().forEach(foe => {
					foe.trySetStatus('cor', target);
				});
			}
			this.effectState.hit = false;
		},
		flags: {},
		name: "Corrosive Aura",
		shortDesc: "If you haven't taken damage for the turn, all adjacent foes become corroded.",
		rating: 1,
	},
	consume: {
		onSourceModifyDamage(damage, source, target, move) {
			const types = ['Bug', 'Fighting'];
			if (target.status && types.includes(move.type)) {
				target.cureStatus();
				const judgementStacks = target.m.judgementStacks || 0;
				target.removeVolatile('judgement');
				return this.chainModify(1.1 + judgementStacks * 0.02);
			}
		},
		flags: {},
		name: "Consume",
		shortDesc: "Bug/Fighting moves consume Status on target to deal 10% more damage.",
		rating: 1,
	},
	judgement: {
		onSourceDamagingHit(damage, target, source, move) {
			const types = ['Bug', 'Fighting'];
			if (target.status === 'cor' && !types.includes(move.type)) {
				target.addVolatile('judgement');
			}
		},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-start', pokemon, `Judgement: ${pokemon.m.judgementStacks}x`, '[silent]');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, `Judgement: ${pokemon.m.judgementStacks}x`, '[silent]');
			},
			onRestart(target, source, sourceEffect) {
				this.add('-end', target, `Judgement: ${target.m.judgementStacks}x`, '[silent]');
				target.m.judgementStacks++;
				if (target.m.judgementStacks > 10) target.m.judgementStacks = 10;
				this.add('-start', target, `Judgement: ${target.m.judgementStacks}x`, '[silent]');
			},
		},
		flags: {},
		name: "Judgement",
		desc: "Hitting Corroded enemy with non Bug/Fighting increases Consume damage on that target by 2%, up to 20%.",
		shortDesc: "Hitting Corroded enemy with non Bug/Fighting increases Consume dmg by 2%.",
		rating: 1,
	},
	divinity: {
		onModifyDef(def, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.3);
			}
		},
		onModifySpD(def, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.3);
			}
		},
		onResidual(pokemon) {
			if (pokemon.status) {
				let heal = pokemon.status === 'bld' ? 10 : 20
				this.heal(pokemon.maxhp / heal, pokemon, pokemon);
			}
		},
		onSourceDamagingHit(damage, target, source, move) {
			if (source.status) {
				this.heal(target.lastDamage / 10, source, source, "drain");
			}
		},
		flags: {},
		name: "Blooddrenched",
		desc: "While statused, 30% more Def/SpD, heal 1/20th on Residual (1/10th if bleeding), gain 10% lifesteal.",
		shortDesc: "While statused, 30% more Def/SpD, heal 1/20th on Residual, gain 10% lifesteal.",
		rating: 2,
	},
	//tree 3
	purity: {
		onSourceDamagingHit(damage, target, source, move) {
			target.addVolatile('purity');
		},
		onSwitchOut(pokemon) {
			const move = this.dex.getActiveMove('bugbuzz');
			move.basePower = 20;
			
			for (const foe of pokemon.foes()) {
				if (!foe.volatiles['purity']) continue;

				const damage = this.actions.getDamage(pokemon, foe, move);
				if (typeof damage === 'number') {
					this.damage(damage, foe, pokemon, move);
				}
			}
		},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-start', pokemon, `Purity`, '[silent]');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, `Purity`, '[silent]');
			},
		},
		flags: {},
		name: "Purity",
		desc: "Hitting an enemy applies Purity. Switching out deals damage equivalent to a 20 Base Power copy of Bug Buzz to enemies with Purity.",
		shortDesc: "Hitting an enemy applies Purity. Switching out deals dmg to enemies with it.",
		rating: 1,
	},
	tobeleftalone: {
		onStart(pokemon) {
			if (pokemon.m.toBeLeftAloneStacks === undefined) pokemon.m.toBeLeftAloneStacks = 0;
			this.add('-start', pokemon, `To Be Left Alone: ${pokemon.m.toBeLeftAloneStacks}x`, '[silent]');
		},
		onSwitchOut(pokemon) {
			if (pokemon.m.toBeLeftAloneStacks < 5) pokemon.m.toBeLeftAloneStacks++;
		},
		onUpdate(pokemon) {
			if (pokemon.m.toBeLeftAloneStacks > 5) pokemon.m.toBeLeftAloneStacks = 5;
		},
		onSourceWeatherModifyDamage(damage, source, target, move) {
			if (target.status) {
				return this.chainModify(1 + source.m.toBeLeftAloneStacks * 0.1);
			}
		},
		flags: {},
		name: "To Be Left Alone",
		shortDesc: "Switching out grants permanent +10% dmg to statused targets, up to 50%.",
		rating: 1,
	},

	//durant
	//skill
	pincermaneuver: {
		onAfterTerastallization(pokemon) {
			pokemon.addVolatile('pincermaneuver');
		},
		onSwitchIn(pokemon) {
			pokemon.canTerastallize = pokemon.teraType;
		},
		condition: {
			duration: 1,
			noCopy: true,
			durationCallback(source, effect) {
				if (source?.hasAbility('servomechswarm')) {
					return 2;
				}
				return 1;
			},
			onStart(pokemon) {
				this.add('-start', pokemon, 'Pincer Maneuver', '[silent]');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Pincer Maneuver', '[silent]');
			},
			onModifyDamage(damage, source, target, move) {
				return this.chainModify([12, 10]);
			},
		},
		flags: {},
		name: "Pincer Maneuver",
		desc: "Can be activated once per switch-in. On activation summon 2 Worker Ants, attacks deals 20% more damage for that turn.",
		shortDesc: "On activation summon 2 Worker Ants to boost damage.",
	},
	// tree 1
	galvanizedsteel: {
		onUpdate(pokemon) {
			if (pokemon.status === 'cor') {
				this.add('-activate', pokemon, 'ability: Galvanized Steel');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'cor') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Galvanized Steel');
			}
			return false;
		},
		flags: { breakable: 1 },
		name: "Galvanized Steel",
		shortDesc: "Immune to corrosion status.",
		rating: 1,
	},
	blacksmithing: {
		onModifyDamage(relayVar, source, target, move) {
			if (move.type === 'Steel') {
				this.chainModify(1.1);
			}
		},
		flags: {},
		name: "Blacksmithing",
		shortDesc: "Boosts Steel-type moves' damage by 1.1x.",
		rating: 1,
	},
	auxiliaryoptics: {
		onInvulnerabilityPriority: 1,
		onInvulnerability(target, source, move) {
			if (move && source.volatiles['pincermaneuver']) return 0;
		},
		onAccuracy(accuracy, target, source, move) {
			if (move && source.volatiles['pincermaneuver']) {
				return true;
			}
			return accuracy;
		},
		flags: {},
		name: "Auxiliary Optics",
		shortDesc: "During Pincer Manuver moves can't miss.",
		rating: 1,
	},
	repaircrew: {
		onResidualOrder: 1,
		onResidual(pokemon) {
			if (!pokemon.volatiles['pincermaneuver']) return;
			pokemon.side.activeTeam().forEach(ally => {
				if (ally.types.includes('Steel')) this.heal(ally.maxhp / 20 * 3);
			});
		},
		flags: {},
		name: "Repair Crew",
		shortDesc: "On Residual during Pincer Maneuver: Steel-types on user's side heal 15%.",
		rating: 1,
	},
	reservecannon: {
		onResidualOrder: 1,
		onResidual(pokemon) {
			if (pokemon.volatiles['pincermaneuver']) {
				const frontTarget = pokemon.side.foe.active[pokemon.side.foe.active.length - pokemon.position - 1];
				const target = frontTarget && frontTarget.hp ? frontTarget : this.sample(pokemon.foes());
				const move = this.dex.getActiveMove('spikecannon');
				if (target) this.actions.useMove(move, pokemon, { target });
			}
		},
		flags: {},
		name: "Reserve Cannon",
		desc: "On Residual during Pincer Maneuver: use Spike Cannon on foe in front, or on random foe if there is no foe in front.",
		shortDesc: "On Residual during Pincer Maneuver: use Spike Cannon on foe in front.",
		rating: 1,
	},
	servomechswarm: {
		onModifySpe(spe, pokemon) {
			return this.chainModify(1.1);
		},
		flags: {},
		name: "Servomech Swarm",
		shortDesc: "Pincer Maneuver lasts one additional turn. Speed is boosted by 1.1x.",
		rating: 3,
	},
	// tree 2
	welding: {
		onResidual(pokemon) {
			pokemon.side.activeTeam().forEach(ally => {
				if (ally.types.includes('Steel')) this.heal(ally.maxhp / 20);
			});
		},
		onModifySpD(spe, pokemon) {
			return this.chainModify(1.15);
		},
		flags: {},
		name: "Welding",
		shortDesc: "Heals Steel-type allies for 5% at the end of each turn. Boosts own SpD 1.15x.",
		rating: 1,
	},
	thermalpaste: {
		onModifyWeight(weighthg) {
			return weighthg + 10;
		},
		flags: {},
		name: "Thermal Paste",
		shortDesc: "Increases base PP by 1.",
		rating: 2,
	},
	thermite: {
		onUpdate(pokemon) {
			if (!pokemon.isStarted) return;
			if (pokemon.hasType('Fire')) return false;
			if (!pokemon.addType('Fire')) return false;
			this.add('-start', pokemon, 'typeadd', 'Fire', '[from] ability: Thermite');
		},
		onModifyDamage(relayVar, source, target, move) {
			if (target.status === 'brn') this.chainModify(1075, 1000);
		},
		flags: {},
		name: "Thermite",
		shortDesc: "Adds Fire to types. Moves deal 7.5% more damage to burned targets.",
		rating: 1,
	},
	fireants: {
		onSourceDamagingHit(damage, target, source, move) {
			if (source.volatiles['pincermaneuver']) {
				target.trySetStatus('brn', source);
			}
		},
		flags: {},
		name: "Fire Ants",
		shortDesc: "Attacks during Pincer Maneuver burn targets.",
		rating: 1,
	},
	// tree 3
	mandibles: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bite']) {
				return this.chainModify(1.1);
			}
		},
		flags: {},
		name: "Mandibles",
		shortDesc: "This Pokemon's bite-based attacks have their power multiplied by 1.1.",
		rating: 1,
	},
	anthill: {
		onSourceModifyDamage(damage, source, target, move) {
			this.debug('Anthill weaken');
			return this.chainModify(0.92);
		},
		flags: { breakable: 1 },
		name: "Anthill",
		shortDesc: "Damage taken from attacks is reduced by 8%.",
		rating: 1,
	},
	delegate: {
		onDamage(damage, target, source, effect) {
			if (!target.hp || !target.volatiles['pincermaneuver']) return;
			if (effect.effectType === 'Move') {
				this.effectState.damage = (this.effectState.damage ?? 0) + damage;
				return 0;
			}
		},
		onResidualOrder: 1,
		onResidual(pokemon) {
			if (!this.effectState.damage || this.effectState.damage === 0) return;
			if (this.effectState.damage > 0) this.damage(this.effectState.damage, pokemon);
			this.effectState.damage = 0;
		},
		flags: { breakable: 1 },
		name: "Delegate",
		shortDesc: "Attack damage taken during Pincer Maneuver happens at the end of the turn.",
		rating: 2,
	},
	soldierants: {
		onAnyModifyDamage(damage, source, target, move) {
			if (source.side.activeTeam().includes(target)) {
				this.debug('Anthill weaken');
				return this.chainModify(0.9);
			}
		},
		flags: { breakable: 1 },
		name: "Soldier Ants",
		shortDesc: "Damage taken by allies during Pincer Maneuver is reduced by 10%.",
		rating: 1,
	},

	// noivern
	// skill
	sonar: {
		onAfterTerastallization(pokemon) {
			this.add('-ability', pokemon, 'Sonar');
			pokemon.adjacentFoes().forEach(foe => {
				foe.addVolatile('spddown');
			});
		},
		onStart(pokemon) {
			this.effectState.stacks = 0;
			pokemon.canTerastallize = null;
		},
		onEnd(pokemon) {
			this.effectState.stacks = 0;
		},
		onUpdate(pokemon) {
			if (!pokemon.isStarted) return;
			if (this.effectState.stacks >= 3) pokemon.canTerastallize = pokemon.teraType;
			this.add('-start', pokemon, `Sonar: ${this.effectState.stacks}x`, '[silent]');
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (move.flags.sound || (source.hasAbility('') && (move.type === "Dragon" || move.type === "Flying"))) {
				this.add('-end', source, `Sonar: ${this.effectState.stacks}x`, '[silent]');
				this.effectState.stacks++;
			}
		},
		flags: {},
		name: "Sonar",
		desc: "Whenever this Pokemon uses a sound move it builds stacks, if it has 3 stacks it can spend all its stacks to activate this Ability and apply SpD down on all adjacent foes.",
		shortDesc: "Sound moves build Stacks, at 3 stacks SpD down on all adj foes.",
	},
	// tree 1
	dampener: {
		onModifyDamage(relayVar, source, target, move) {
			if (target.isAlly(source)) return this.chainModify(0.6);
		},
		flags: {},
		name: "Dampener",
		shortDesc: "Moves deal 60% less damage to allies.",
		rating: 1,
	},
	slipstream: {
		onResidual(pokemon) {
			if (pokemon.position !== 1) this.heal(pokemon.maxhp / 10, pokemon);
		},
		flags: {},
		name: "Slipstream",
		shortDesc: "This Pokemon recovers 10% HP per turn when it is not in the center.",
		rating: 1,
	},
	poweroffriendship: {
		onModifySpA(spa, pokemon) {
			const allies = pokemon.adjacentAllies().length;
			return this.chainModify([100 + 5 * allies, 100]);
		},
		flags: {},
		name: "Power of Friendship",
		shortDesc: "+5% SpA for each adjacent ally.",
		rating: 1,
	},
	harmony: {
		onSourceDamagingHit(damage, target, source, move) {
			if (move.flags.sound && target.isAlly(source)) {
				this.boost({ spa: 5 }, target);
			}
		},
		flags: {},
		name: "Harmony",
		shortDesc: "Allies hit by sound moves get a 5% SpA boost.",
		rating: 1,
	},
	centerpiece: {
		onBasePower(relayVar, source, target, move) {
			if (source.position === 1) return this.chainModify(1.1);
		},
		flags: {},
		name: "Centerpiece",
		shortDesc: "Moves gain 10% Base Power when this Pokemon is in the center.",
		rating: 1,
	},
	sonicshock: {
		onSourceDamagingHit(damage, target, source, move) {
			if (move.flags.sound && !target.isAlly(source)) {
				if (this.randomChance(3, 20)) {
					target.trySetStatus('par', source);
				}
			}
		},
		flags: {},
		name: "Sonic Shock",
		shortDesc: "Sound moves have a 15% paralysis chance against foes.",
		rating: 1,
	},
	// tree 2
	airvents: {
		onStart(pokemon) {
			if (pokemon.side.sideConditions['tailwind']) {
				this.boost({ def: 5, spd: 5 }, pokemon, pokemon);
			}
		},
		onHit(target, source, move) {
			if (target !== source && move.flags['wind']) {
				this.boost({ def: 5, spd: 5 }, target, target);
			}
		},
		onSideConditionStart(side, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind') {
				this.boost({ def: 5, spd: 5 }, pokemon, pokemon);
			}
		},
		flags: { breakable: 1 },
		name: "Air Vents",
		shortDesc: "Boosts Def and SpD 5% when hit by wind or Tailwind starts.",
		rating: 1,
	},
	regulation: {
		flags: {},
		name: "Regulation",
		shortDesc: "Shortens Tailwind duration by 1 turn.",
		rating: 1,
	},
	maneuver: {
		onStart(pokemon) {
			if (pokemon.side.sideConditions['tailwind']) {
				this.effectState.tailwind = true;
			}
		},
		onSideConditionStart(side, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind' && pokemon && !pokemon.fainted) {
				this.effectState.tailwind = true;
			}
		},
		onResidual(pokemon) {
			if (this.effectState.tailwind && !pokemon.side.sideConditions['tailwind']) {
				this.add('-activate', pokemon, 'ability: Maneuver');
				this.heal(pokemon.maxhp / 4);
				this.effectState.tailwind = false;
			}
		},
		flags: {},
		name: "Maneuver",
		shortDesc: "When Tailwind ends heal 25% of max HP.",
		rating: 1,
	},
	stacking: {
		flags: {},
		name: "Stacking",
		shortDesc: "Can also build stacks of Sonar using Dragon or Flying-type moves.",
		rating: 1,
	},
	airresistance: {
		onSourceModifyDamage(damage, source, target, move) {
			this.debug('Air Resistance weaken');
			return this.chainModify(0.95);
		},
		flags: { breakable: 1 },
		name: "Air Resistance",
		shortDesc: "Damage taken from attacks is reduced by 5%.",
		rating: 1,
	},
	airsupport: {
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Flying' && attacker.side.sideConditions['tailwind']) {
				this.debug('Air Support boost');
				return this.chainModify(1.15);
			}
		},
		flags: {},
		name: "Air Support",
		desc: "This Pokemon and its allies' Flying-type moves have their power multiplied by 1.15 if Tailwind is active on their side.",
		shortDesc: "This Pokemon and its allies' Flying-type moves have 1.15 power if Tailwind is active.",
		rating: 2,
	},
	// tree 3
	sonicprecision: {
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('sonicprecision - enhancing accuracy');
			return accuracy + 20;
		},
		flags: {},
		name: "Sonic Precision",
		shortDesc: "Moves gain an additional 20% accuracy.",
		rating: 1,
	},
	draconianrage: {
		onSourceDamagingHit(damage, target, source, move) {
			if (move.type === "Dragon") {
				target.addVolatile('spddown', source);
			}
		},
		flags: {},
		name: "Draconian Rage",
		shortDesc: "Dragon-type moves apply SpD down.",
		rating: 1,
	},
	longrange: {
		onModifyMove(move, pokemon, target) {
			move.target = 'any';
		},
		flags: {},
		name: "Long Range",
		shortDesc: "Moves are no longer spread and can hit any target on the field.",
		rating: 1,
	},
	aerialnoise: {
		onModifyMove(move, pokemon, target) {
			if (move.type === "Flying") move.flags.sound = 1;
		},
		flags: {},
		name: "Aerial Noise",
		shortDesc: "Flying-type moves become sound.",
		rating: 2,
	},
	soundboost: {
		onBasePower(relayVar, source, target, move) {
			if (move.flags.sound) return this.chainModify(1.1);
		},
		flags: {},
		name: "Sound Boost",
		shortDesc: "Sound moves gain 10% Base Power.",
		rating: 1,
	},
	straightupevil: {
		onBasePower(relayVar, source, target, move) {
			if (source.position === 1) return this.chainModify(1.1);
		},
		flags: {},
		name: "Straight Up Evil",
		shortDesc: "Moves gain 10% Base Power to targets under 50% HP.",
		rating: 1,
	},

	// thievul
	// skill
	moneyispower: {
		onStart(pokemon) {
			this.effectState.money = 0;
			pokemon.canTerastallize = null;
		},
		onEnd(pokemon) {
			this.effectState.money = 0;
		},
		onAfterTerastallization(pokemon) {
			pokemon.addVolatile('moneyispower');
		},
		onUpdate(pokemon) {
			if (!pokemon.isStarted) return;
			if (this.effectState.money >= 500 && !pokemon.hasAbility('wealthbeyondmeasure')) this.effectState.money = 500;
			if (this.effectState.money >= 1000) this.effectState.money = 1000;
			if (this.effectState.money >= 500 || (pokemon.hasAbility('cheapskate') && this.effectState.money >= 300)) pokemon.canTerastallize = pokemon.teraType;
			this.add('-start', pokemon, `Money: ${this.effectState.money}x`, '[silent]');
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !move.hitTargets || move.category === 'Status') return;
			this.add('-end', source, `Money: ${this.effectState.money}x`, '[silent]');
			this.effectState.money += 50;
		},
		onDamagingHit(damage, target, source, move) {
			this.add('-end', source, `Money: ${this.effectState.money}x`, '[silent]');
			this.effectState.money -= 50;
		},
		condition: {
			duration: 1,
			noCopy: true,
			onStart(target, source, sourceEffect) {
				this.add('-start', target, 'Money Is Power');
			},
			onEnd(target) {
				this.add('-end', target, 'Money Is Power');
			},
			onSourceDamagingHit(damage, target, source, move) {
				target.addVolatile('healblock');
			},
		},
		flags: {},
		name: "Money Is Power",
		desc: 'You can have up to 500 stacks of "Money". Each stack grants a 0.1% boost to damage, up to 50% at 5 stacks. Succesfully using an attacking move grants 50 stacks, taking direct damage removes 50 stacks. Activation lasts 1 turn and all attacks apply Heal Block on target for 2 turns.',
		shortDesc: "Money Stacks, max 500, 0.1 dmg boost * stack. Atk +50, Dmg -50.",
	},
	// tree 1
	bounty: {
		onResidual(pokemon) {
			let foe = this.sample(pokemon.foes());
			foe.addVolatile('bounty');
		},
		condition: {
			duration: 1,
			onStart(target, source, sourceEffect) {
				this.add('-start', target, 'Bounty');
			},
			onEnd(target) {
				this.add('-end', target, 'Bounty');
			},
			onDamagingHit(damage, target, source, move) {
				if (source.hasAbility('moneyispower')) {
					this.add('-end', source, `Money: ${source.abilityState.money}x`, '[silent]');
					source.abilityState.money += 100;
				}
				target.removeVolatile('bounty');
			},
			onSourceModifyDamage(relayVar, source, target, move) {
				if (source.hasAbility('bounty')) {
					this.chainModify(1.25);
				}
			},
		},
		flags: {},
		name: "Bounty",
		desc: "Random foe gains bounty every turn. Hitting foe with bounty grants 100 money stacks and removes bounty. Foes with bounty take 25% more damage from this Pokemon.",
		shortDesc: "Random foe gains bounty every turn. Hitting foe with bounty +100 money.",
		rating: 1,
	},
	familyheirloom: {
		onModifyDamage(relayVar, source, target, move) {
			if (move.flags.bullet) {
				return this.chainModify(1.1);
			}
		},
		flags: {},
		name: "Family Heirloom",
		shortDesc: "10% more bullet damage.",
		rating: 1,
	},
	assassination: {
		onModifyDamage(relayVar, source, target, move) {
			if (target.volatiles['bounty']) {
				return this.chainModify(1.1);
			}
		},
		flags: {},
		name: "Assassination",
		shortDesc: "10% damage boost vs foe with bounty.",
		rating: 1,
	},
	lifesentence: {
		onStart(target) {
			if (target.m.lifesentence === null) target.m.lifesentence = false;
		},
		onDamagePriority: -30,
		onDamage(damage, target, source, effect) {
			if (target.m.lifesentence) return;
			if (damage >= target.hp) {
				target.addVolatile('lifesentence');
				target.m.lifesentence = true;
				return target.hp - 1;
			}
		},
		onAfterTerastallization(pokemon) {
			pokemon.removeVolatile('lifesentence');
			this.boost({ spa: 150 }, pokemon);
		},
		condition: {
			duration: 3,
			onDamagePriority: -30,
			onDamage(damage, target, source, effect) {
				return null;
			},
			onBeforeMove(pokemon) {
				return false;
			},
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 3);
			},
			onStart(target) {
				this.add('-start', target, 'Life Sentence');
			},
			onEnd(target) {
				target.cureStatus();
				const volatiles = Object.keys(target.volatiles).filter(id => {
					const vol = target.volatiles[id];
					return vol && typeof vol.duration === 'number' && vol.duration > 0 && !vol.noCopy;
				});
				if (!volatiles.length) return;

				volatiles.forEach(vol => {
					target.removeVolatile(vol);
				});

				this.add('-end', target, 'Life Sentence');
			},
		},
		flags: {},
		name: "Life Sentence",
		desc: "Once per battle instead of fainting Thievul lives on 1 HP and gains Life Sentence for the following 3 turns. During Life Sentence Thievul cannot move or take damage and at the end of each turn it heals for 1/3rd its max HP and once the effect ends has all volatiles and status healed. If Money Is Power is activated while Life Sentence is active, Life Sentence ends and Thievul gains +150% SpA.",
		shortDesc: "Once per battle live on 1 HP instead of die + more effects.",
		rating: 2,
	},
	makingakilling: {
		onFoeFaint(target, source, effect) {
			if (source.boosts.def < 60) {
				this.boost({ def: 10 }, source);
			}
			if (source.boosts.spd < 60) {
				this.boost({ spd: 10 }, source);
			}
		},
		onSourceDamagingHit(damage, target, source, move) {
			if (target.volatiles['bounty']) {
				this.runEvent('Faint', target);
			}
		},
		flags: {},
		name: "Making a Killing",
		desc: "Hitting foes with bounty procs On Faint effects. On Foe Faint gain +10% boost to Defense and Special Defense up to 60%.",
		shortDesc: "Hitting foes with bounty procs On Faint effects. Kills grant +10% Def/SpD.",
		rating: 1,
	},
	knivesout: {
		flags: {},
		name: "Knives Out",
		shortDesc: "Placeholder.",
		rating: 1,
	},
	// tree 2
	inheritance: {
		onUpdate(pokemon) {
			if (!pokemon.hasAbility('moneyispower') || pokemon.abilityState.money > 0) return;
			this.add('-end', pokemon, `Money: ${pokemon.abilityState.money}x`, '[silent]');
			pokemon.abilityState.money += 100;
		},
		name: "Inheritance",
		shortDesc: "If Money stacks are 0, gain 100.",
		rating: 1,
	},
	cheapskate: {
		flags: {},
		name: "Cheapskate",
		shortDesc: "Ability activation costs 200 less money.",
		rating: 1,
	},
	spadownres: {
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'spadown') {
				pokemon.boosts.spa = Math.floor(pokemon.boosts.spa * 0.5);
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Spa Down Res",
		desc: "Immune to SpA down. Instead when you would suffer from SpA Down your SpA boosts are halved instead.",
		shortDesc: "Immune to SpA down. Instead your SpA boosts are halved.",
		rating: 1,
	},
	investmentbanker: {
		onAfterTerastallization(pokemon) {
			if (!pokemon.hasAbility('moneyispower')) return;
			this.add('-end', pokemon, `Money: ${pokemon.abilityState.money}x`, '[silent]');
			pokemon.abilityState.money += 500;
		},
		flags: {},
		name: "Investment Banker",
		shortDesc: "On Ability activation, regain 500 Money.",
		rating: 2,
	},
	// tree 3
	skilledgambler: {
		onModifyCritRatio(critRatio) {
			return critRatio + 10;
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.add('-end', source, `Money: ${source.abilityState.money}x`, '[silent]');
				source.abilityState.money += 50;
			}
		},
		flags: {},
		name: "Skilled Gambler",
		shortDesc: "Increases crit chance by 10%. On crit gain 50 money.",
		rating: 1,
	},
	burstboost: {
		onModifyDamage(relayVar, source, target, move) {
			if (source.volatiles['burst']) {
				return this.chainModify(1.1);
			}
		},
		flags: {},
		name: "Burst Boost",
		shortDesc: "10% more damage while Burst volatile is active.",
		rating: 1,
	},
	moneybags: {
		onDamagingHit(damage, target, source, move) {
			this.add('-end', target, `Money: ${target.abilityState.money}x`, '[silent]');
			this.effectState.money += 25;
		},
		flags: {},
		name: "Moneybags",
		shortDesc: "Gain 25 money when hit.",
		rating: 3,
	},
	wealthbeyondmeasure: {
		flags: {},
		name: "Wealth Beyond Measure",
		shortDesc: "Doubles Money cap to 1000.",
		rating: 1,
	},

	/*
	// skills
	coalmines: {
		onAfterTerastallization(pokemon) {
			this.add('-ability', pokemon, 'Coal Mines');
			pokemon.foes().forEach(foe => {
				foe.addVolatile('tarshot');
			})
		},
		flags: {},
		name: "Coal Mines",
		shortDesc: "On activation applies Tar Shot on all active foes.",
	},
	divineblessing: {
		onHit(target, source, move) {
			if (target.getMoveHitData(move).crit && !source.syrupTriggered) {
				source.syrupTriggered = true;
			}
			if (target.getMoveHitData(move).crit && source.syrupTriggered) {
				source.canTerastallize = source.teraType;
				source.syrupTriggered = false;
			}
		},
		onAfterTerastallization(pokemon) {
			this.add('-ability', pokemon, 'Divine Blessing');
			for (const ally of pokemon.side.active) {
				if (ally && !ally.fainted && !ally.volatiles['regen']) {
					ally.addVolatile('regen');
				}
			}
		},
		flags: {},
		name: "Divine Blessing",
		shortDesc: "Grants regen on user's side. Consecutive Critical hits allow reactivation.",
	},
	doubletap: {
		onAfterTerastallization(pokemon) {
			this.add('-ability', pokemon, 'Double Tap');
			if (!pokemon.volatiles['doubletap']) pokemon.addVolatile('doubletap');
		},
		condition: {
			onAfterMove(source, target, move) {
				if (move.category === 'Status' || move.flags['charge'] || move.flags['recharge'] || move.flags['futuremove']) return;
				if (target && !target.fainted && source.lastMoveUsed?.id) this.actions.useMove(source.lastMoveUsed.id, source, { target });
				source.removeVolatile('doubletap');
			},
		},
		flags: {},
		name: "Double Tap",
		shortDesc: "On activation uses its next attacking move twice.",
	},

	// perks
	justified: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Dark') {
				this.boost({ atk: 50 });
			}
		},
		shortDesc: "This Pokemon's Attack is raised by 50% after it is damaged by a Dark-type move.",
	},
	cuttingedge: {
		onHit(target, source, move) {
			if (target.getMoveHitData(move).crit) {
				this.heal((source.maxhp - source.hp) / 10);
			}
		},
		flags: {},
		name: "Cutting Edge",
		shortDesc: "Critical hits heal for 10% of missing HP.",
	},
	duelist: {
		onSourceDamagingHit(damage, target, source, move) {
			let duelCount = 0;
			this.getAllActive().forEach(pokemon => {
				if (pokemon.volatiles.includes["duel"]) duelCount++;
			})
			if (move.flags.slicing && duelCount == 0) {
				source.addVolatile('duel', target);
				target.addVolatile('duel', source);
			}
		},
		flags: {},
		name: "Duelist",
		shortDesc: "Slicing initiates duel: both sides do 20% more damage to eachother. Only one duel active.",
	},
	exoskeleton: {
		onDamagingHit(damage, target, source, move) {
			move.damage = Math.min(target.lastDamage - (target.level / 4), 1)
		},
		flags: {},
		name: "Exoskeleton",
		shortDesc: "Gains flat damage reduction equals to 1/4th of its level."
	},
	explosivecharge: {
		onSourceDamagingHit(damage, target, source, move) {
			if (target.types.includes("Rock") && source.activeMoveActions > 1) {
				move.willCrit = true;
				move.selfSwitch = true;
			}
		},
		flags: {},
		name: "Explosive Charge",
		shortDesc: "After active for more than 1 turn, when hitting Rock type: crit and switch out."
	},
	paintrain: {
		onSourceDamagingHit(damage, target, source, move) {
			if (damage >= target.maxhp / 10) this.boost({ spe: 25 }, source);
		},
		flags: {},
		name: "Pain Train",
		shortDesc: "Gain a 25% Speed Boost after attacking for >= 10% of target's max HP."
	},
	ridethewave: {
		onFoeModifyDef(spd, target, source, move) {
			if (move.type === "Water" && !target.isAlly) 
			{
				this.debug('Ride the Wave SpD drop');
				return this.chainModify(0.8);
			}
		},
		onFoeModifySpD(spd, target, source, move) {
			if (move.type === "Water" && !target.isAlly) 
			{
				this.debug('Ride the Wave SpD drop');
				return this.chainModify(0.8);
			}
		},
		flags: {},
		name: "Ride the Wave",
		shortDesc: "Water-type moves ignore 20% of the foe's defenses.",
	},
	tanglinghair: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.add('-ability', target, 'Tangling Hair');
				source.addVolatile('spedown', target);
			}
		},
	},
	telepathy: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && source.isAlly(target) && move.category !== 'Status') {
				move.basePower = 0;
			}
		},
		flags: {},
		shortDesc: "This Pokemon does 0 damage to its allies with attacks.",
	},
	sharpblade: {
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.debug('Sharp Blade boost');
				return this.chainModify(1.2);
			}
		},
		flags: {},
		name: "Sharp Blade",
		shortDesc: "If this Pokemon strikes with a critical hit, the damage is multiplied by 1.2.",
	},
	nectartap: {
		flags: {},
		name: "Nectar Tap",
		shortDesc: "Extends Regen duration by 1 turn.",
	},
	fortitude: {
		onAnyInvulnerabilityPriority: 1,
		onAnyInvulnerability(target, source, move) {
			if (move && source === this.effectState.target && source.volatiles.includes["regen"]) return 0;
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && source === this.effectState.target && source.volatiles.includes["regen"]) {
				return true;
			}
			return accuracy;
		},
		flags: {},
		name: "Fortitude",
		shortDesc: "While under the effect of Regen moves cannot miss."
	},
	zealousrush: {
		onModifyPriority(priority, pokemon, target, move) {
			if (pokemon.volatiles.includes["regen"]) {
				return priority + 1;
			}
		},
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.volatiles.includes["regen"]) {
				this.debug('Zealous Rush nerf');
				return this.chainModify([1, 2]);
			}
		},
		flags: {},
		name: "Zealous Rush",
		shortDesc: "While under the effect of Regen moves gain +1 priority but halved power."
	},
	brutal: {
		onAfterTerastallization(pokemon) {
			pokemon.addVolatile('doubletap');
			pokemon.addVolatile('brutal');
		},
		condition: {
			duration: 3,
			onStart(target) {
				this.add('-start', target, 'Brutal Mode');
			},
			onEnd(target) {
				this.add('-end', target, 'Brutal Mode');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (move.category !== 'Status') {
					const drain = Math.floor(pokemon.lastDamage * 0.25);
					this.heal(drain, pokemon, pokemon);
					this.add('-heal', pokemon, pokemon.hp, `[drain] ${drain}`);
				}
			},
			onResidualOrder: 26,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.maxhp * 0.25), pokemon, pokemon);
			},
		},
		flags: {},
		name: "Brutal",
		shortDesc: "On activation gain Double Tap, moves gain 25% drain and lose 25% HP at the end of turn for 3 turns.",
	},
	desperado: {
		onStart(pokemon) {
			this.effectState.stacks = 0;
			pokemon.canTerastallize = null;
		},
		onEnd(pokemon) {
			this.effectState.stacks = 0;
		},
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.effectState.stacks = Math.min(6, (this.effectState.stacks || 0) + 1);
				this.add('-start', source, `Desperado: ${this.effectState.stacks}x`, '[silent]');
			}
			const stacks = this.effectState.stacks || 0;
			if (stacks) {
				return this.chainModify(1 + 0.1 * stacks);
			}
		},
		flags: {},
		name: "Desperado",
		shortDesc: "Critical hits grant a stack that boosts damage by 10% for each, up to 60%.",
	},
	divine: {
		onHit(target, source, move) {
			if (target.getMoveHitData(move).crit) {
				this.add('-ability', target, 'Divine');
				for (const ally of source.side.active) {
					if (ally && !ally.fainted && !ally.volatiles['regen']) {
						ally.addVolatile('regen');
					}
				}
			}
		},
		onAfterTerastallization(pokemon) {
			pokemon.addVolatile('divine');
		},
		condition: {
			onStart(target) {
				this.add('-start', target, 'Divine');
			},
			onBeforeMove(pokemon, target, move) {
				move.accuracy = true;
			},
			onModifyMove(move, pokemon) {
				move.willCrit = true;
			},
			onEffectiveness(typeMod, target, type, move) {
				if (typeMod <= 0) {
					return 1;
				}
			},
			onAfterMove(source) {
				source.removeVolatile('divine');
			},
		},
		flags: {},
		name: "Divine",
		shortDesc: "Critical hits grant Regen to user's side. Activation: next attack always hits, crits, and super-effective.",
	},
	dualwielding: {
		onStart(pokemon) {
			pokemon.canTerastallize = null;
		},
		onBasePower(basePower, user, target, move) {
			if (this.dex.getActiveMove(user.moveSlots[0].id).category !== 'Status' && this.dex.getActiveMove(user.moveSlots[1].id).category !== 'Status') {
				return this.chainModify(0.75);
			}
		},
		onAfterMove(source, target, move) {
			if (this.dex.getActiveMove(source.moveSlots[0].id).category === 'Status' || this.dex.getActiveMove(source.moveSlots[1].id).category === 'Status') return;

			if (source.volatiles['dualwielding']) return;
			source.addVolatile('dualwielding');
			
			if (target && !target.fainted) {
				if (move === this.dex.getActiveMove(source.moveSlots[0].id)) this.actions.runMove(this.dex.getActiveMove(source.moveSlots[1].id), source, target.position);
				else this.actions.runMove(this.dex.getActiveMove(source.moveSlots[0].id), source, target.position);
			} 
		},
		condition: {
			duration: 1,
		},
		flags: {},
		name: "Dual Wielding",
		shortDesc: "If user's first 2 moveslots are attacking moves they have 75% BP and using one uses the other.",
	},
	pyromaniac: {
		onStart(pokemon) {
			this.effectState.fireTotal = 0;
			pokemon.canTerastallize = false;
		},
		onUpdate(pokemon) {
			pokemon.trySetStatus('brn', pokemon);
		},
		onDamage(damage, target, source, effect) {
			if (effect.id === 'brn') {
				return false;
			}
		},
		onPrepareHit(source, target, move) {
			if (move.type === 'Fire' && source.canTerastallize !== null) {
				this.effectState.fireTotal = (this.effectState.fireTotal || 0) + (move.basePower || 0);
				if (this.effectState.fireTotal >= 250) {
					source.canTerastallize = source.teraType;
				}
			}
		},
		onAfterTerastallization(pokemon) {
			pokemon.addVolatile('spedown');
			pokemon.addVolatile('suppression');
			this.boost({ spa: 100 }, pokemon, pokemon);
		},
		flags: {},
		name: "Pyromaniac",
		shortDesc: "Burns but immune. Using Fire for 250 BP enables Activation: Spe Down, Suppression, 100% SpA.",
	},
	feral: {
		onStart(pokemon) {
			pokemon.canTerastallize = null;
		},
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (pokemon.activeTurns && (!pokemon.lastMoveUsed || pokemon.lastMove?.category === 'Status')) {
				pokemon.addVolatile('taunt');
				this.boost({ atk: 50 }, pokemon, pokemon);
			}
		},
		onAfterMove(pokemon, target, move) {
			if (move.category !== 'Status') {
				// Remove all stat boosts
				const boosts: SparseBoostsTable = {};
				for (const stat in pokemon.boosts) {
					const statKey = stat as BoostID;
					if (pokemon.boosts[statKey] !== 0) {
						boosts[statKey] = -pokemon.boosts[statKey];
					}
				}
				if (Object.keys(boosts).length) {
					this.boost(boosts, pokemon, pokemon);
				}
			}
		},
		flags: {},
		name: "Feral",
		shortDesc: "If doesn't attack for a turn: Taunt and 50% Attack boost. Boosts are lost after attacking.",
	},
	allseeing: {
		onAfterTerastallization(pokemon) {
			const foes = pokemon.foes().filter(foe => foe && !foe.fainted);
			if (!foes.length) return;
			const target = this.sample(foes);
			if (!target) return;

			const options: {type: 'item' | 'move'; value: string}[] = [];
			if (target.item) options.push({type: 'item', value: target.getItem().name});
			for (const moveSlot of target.moveSlots) {
				if (moveSlot?.move) options.push({type: 'move', value: this.dex.moves.get(moveSlot.move).name});
			}
			if (!options.length) return;

			const choice = this.sample(options);
			this.add('-activate', pokemon, 'ability: All-Seeing', `${choice.type === 'item' ? 'revealed item' : 'revealed move'} ${choice.value}`);
			if (target.status) {
				// still reveal even if already statused
				return;
			}
			target.trySetStatus('brn', pokemon);
		},
		flags: {},
		name: "All-Seeing",
		shortDesc: "On activation reveals a random foe move/item and burns that foe.",
	},
	covertoperative: {
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.position !== defender.position) {
				return this.chainModify(1.25);
			}
		},
		onAfterTerastallization(pokemon) {
			let success = true;
			// Fail in formats where you don't control allies
			if (this.format.gameType !== 'doubles' && this.format.gameType !== 'triples') success = false;

			// Fail in triples if the Pokemon is in the middle
			if (pokemon.side.active.length === 3 && pokemon.position === 1) success = false;

			const newPosition = (pokemon.position === 0 ? pokemon.side.active.length - 1 : 0);
			if (!pokemon.side.active[newPosition]) success = false;
			if (pokemon.side.active[newPosition].fainted) success = false;
			if (!success) {
				this.attrLastMove('[still]');
				return this.NOT_FAIL;
			}
			this.swapPosition(pokemon, newPosition);
		},
		name: "Covert Operative",
		shortDesc: "Deal 1.25x damage when not attacking in front. On activation switch with ally.",
	},
	engineer: {
		onEnd(pokemon) {
			this.effectState.used = false;
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2 || pokemon.volatiles['turret'] || this.effectState.used) {
				pokemon.canTerastallize = false;
			} else {
				pokemon.canTerastallize = pokemon.teraType;
			}
		},
		onAfterTerastallization(pokemon) {
			this.directDamage(pokemon.maxhp / 2);
			pokemon.addVolatile('turret');
			this.effectState.used = true;
		},
		flags: {},
		name: "Engineer",
		shortDesc: "On activation summons a Turret in exchange for 1/2 of the user's max HP.",
	},
	entombingjaws: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (move.flags['bite']) {
				target.trySetStatus('ptr', source);
			}
		},
		onAfterTerastallization(pokemon) {
			pokemon.adjacentFoes().forEach(foe => { if (foe.status === 'ptr') foe.addVolatile('flinch'); });
		},
		flags: {},
		name: "Entombing Jaws",
		shortDesc: "Biting moves petrify targets. On activation flinch petrified foes.",
	},
	greedy: {
		onAfterTerastallization(pokemon) {
			const target = pokemon.foes()[0];
			if (target && !target.fainted) this.actions.useMove('punishment', pokemon, { target });
		},
		flags: {},
		name: "Greedy",
		shortDesc: "On activation uses Punishment.",
	},
	heatengine: {
		onStart(pokemon) {
			this.effectState.heat = 0;
		},
		onEnd(pokemon) {
				this.add('-end', pokemon, `Heat: ${this.effectState.heat}x`, '[silent]');
			this.effectState.heat = 0;
		},
		onUpdate(pokemon) {
			if (this.effectState.heat === 0) pokemon.canTerastallize = false;
			else pokemon.canTerastallize = pokemon.teraType;
		},
		onAfterMove(source, target, move) {
			if (move.category === 'Status') return;
				this.add('-end', source, `Heat: ${this.effectState.heat}x`, '[silent]');
			this.effectState.heat = Math.min(5, (this.effectState.heat || 0) + 1);
				this.add('-start', source, `Heat: ${this.effectState.heat}x`, '[silent]');
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, source, target, move) {
			const heat = this.effectState.heat || 0;
			if (!heat) return;
			return this.chainModify(1 + 0.05 * heat);
		},
		onAfterTerastallization(pokemon) {
			const heat = this.effectState.heat || 0;
			if (!heat) return;
			const damageRatio = 0.05 * heat;
			pokemon.adjacentFoes().forEach(foe => {
				this.damage(Math.floor(foe.maxhp * damageRatio), foe, pokemon);
				if (this.randomChance(heat, 5)) {
					foe.trySetStatus('brn', pokemon);
				}
			});
				this.add('-end', pokemon, `Heat: ${this.effectState.heat}x`, '[silent]');
			this.effectState.heat = 0;
			pokemon.canTerastallize = pokemon.teraType;
		},
		flags: {},
		name: "Heat Engine",
		shortDesc: "Each attack adds 5% power (max 25%). Activation damages and 20% burn per stack.",
	},
	highnoon: {
		onAnyModifyDamage(relayVar, source, target, move) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.15);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onAfterTerastallization(pokemon) {
			this.field.setWeather('sandstorm');
			pokemon.addVolatile('highnoon');
		},
		condition: {
			onModifyPriority(priority, pokemon, target, move) {
				return priority + 1;
			},
			onAfterMove(source, target, move) {
				source.removeVolatile('highnoon');
			},
		},
		flags: {},
		name: "High Noon",
		shortDesc: "All damage is 1.15 in Sandstorm. Activation: Sandstorm and +1 prio on next move.",
	},
	leecher: {
		onAfterMoveSecondarySelf(pokemon, target, move) {
			this.heal(pokemon.lastDamage / 6, pokemon, pokemon);
		},
		onAfterTerastallization(pokemon) {
			if (!pokemon.volatiles['leecher']) pokemon.addVolatile('leecher');
		},
		condition: {
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (move.category === 'Status' || move.flags['charge'] || move.flags['recharge'] || move.flags['futuremove']) return;
				this.heal(pokemon.lastDamage, pokemon, pokemon);
				pokemon.removeVolatile('leecher');
			},
		},
		flags: {},
		name: "Leecher",
		shortDesc: "Moves drain 1/6th of damage dealt. On activation next attack gains +100% drain.",
	},
	perplexing: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (this.field.pseudoWeather['magicroom'] || this.field.pseudoWeather['trickroom'] || this.field.pseudoWeather['wonderroom']) {
					this.damage(target.baseMaxhp / 15, target, pokemon);
				}
			}
		},
		onAfterTerastallization(pokemon) {
			this.field.addPseudoWeather('wonderroom');
		},
		flags: {},
		name: "Perplexing",
		shortDesc: "Foes take 1/15th damage during room effects. On activation sets up Wonder Room.",
	},
	plaguebearer: {
		onSourceModifyDamage(relayVar, source, target, move) {
			if (target.status === 'psn' || target.status === 'tox') {
				this.debug('Plaguebearer weaken');
				return this.chainModify(0.85);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === '') {
				pokemon.canTerastallize = pokemon.teraType;
			}
		},
		onAfterTerastallization(pokemon) {
			const move = this.dex.getActiveMove('poisongas');
			move.accuracy = 100;
			move.target = 'normal';
			for (const target of this.getAllActive()) {
				if (target && !target.fainted) {
					this.actions.useMove(move, pokemon, { target });
				}
			}
		},
		flags: {},
		name: "Plaguebearer",
		shortDesc: "Poisoned: 15% less damage. Activation: Poison Gas on every Pokemon, including user.",
	},
	prismatic: {
		onStart(pokemon) {
			this.effectState.prism = 0;
		},
		onEnd(pokemon) {
				this.add('-end', pokemon, `Prism: ${this.effectState.prism}x`, '[silent]');
			this.effectState.prism = 0;
		},
		onPrepareHit(source, target, move) {
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
					this.add('-end', source, `Prism: ${this.effectState.prism}x`, '[silent]');
				this.effectState.prism++;
				this.add('-start', source, 'typechange', type, '[from] ability: Prismatic');
					this.add('-start', source, `Prism: ${this.effectState.prism}x`, '[silent]');
			}
		},
		onAfterTerastallization(pokemon) {
			const prism = this.effectState.prism || 0;
			if (!prism) return;
			const heal = 0.05 * prism;
			this.heal(Math.floor(pokemon.maxhp * heal), pokemon, pokemon);
				this.add('-end', pokemon, `Prism: ${this.effectState.prism}x`, '[silent]');
			this.effectState.prism = 0;
			pokemon.canTerastallize = pokemon.teraType;
		},
		flags: {},
		name: "Prismatic",
		shortDesc: "Changes type to move type. On activation heals 5% per type change.",
	},
	punisher: {
		onDamagingHit(damage, target, source, move) {
			source.addVolatile('punisher', target);
		},
		onAfterTerastallization(pokemon) {
			for (const target of pokemon.adjacentFoes()) {
				pokemon.adjacentFoes().forEach(foe => { if (foe.volatiles['punisher']) foe.addVolatile('flinch'); });
			}
		},
		condition: {
			onStart(target, source, sourceEffect) {
				this.add('-start', target, 'guilty');
			},
			onDamage(damage, target, source, effect) {
				if (effect && effect.effectType === 'Move') {
					this.debug('Guilty increase');
					return this.chainModify(1.1);
				}
			},
			onUpdate(pokemon) {
				const source = this.effectState.source;			
				if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns || !source.hasAbility('punisher'))) {
					delete pokemon.volatiles['guilty'];
					return;
				}
			},
		},
		flags: {},
		name: "Punisher",
		shortDesc: "Applies Guilty on being hit. On activation flinch all guilty Pokemon.",
	},
	pyromaniac: {
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (!this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Rapid boost');
				return this.chainModify([11, 10]);
			}
		},
		onAfterTerastallization(pokemon) {
			for (const target of pokemon.adjacentFoes()) {
				if (target.status === 'brn') target.addVolatile('suppression');
			}
		},
		flags: {},
		name: "Pyromaniac",
		shortDesc: "Burn foes boosting their stat stage. Activation suppresses burned foes.",
	},
	rampart: {
		name: "Rampart",
		onAllyHit(target, source, move) {
			if (!source || !move) return;

			const rampartUser = this.effectState.target;
			if (!rampartUser.hp || rampartUser.fainted) return;
			if (rampartUser.volatiles['followme']) return;

			this.add('-activate', rampartUser, 'ability: Rampart');

			rampartUser.addVolatile('followme');
		},
		onAfterTerastallization(pokemon) {
			pokemon.addVolatile('rampart');
		},
		condition: {
			duration: 1,
			onStart(target, source, effect) {
				if (effect?.id === 'zpower') {
					this.add('-singleturn', target, 'move: Follow Me', '[zeffect]');
				} else {
					this.add('-singleturn', target, 'move: Follow Me');
				}
			},
			onFoeRedirectTargetPriority: 1,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("Follow Me redirected target of move");
					return this.effectState.target;
				}
			},
			onSourceModifyDamage(relayVar, source, target, move) {
				this.debug('Rampart weaken');
				return this.chainModify([2, 3]);
			},
		},
		shortDesc: "If ally hit gain Follow Me. Activation redirects moves, takes 2/3rd damage.",
	},
	rapid: {
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (!this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Rapid boost');
				return this.chainModify([11, 10]);
			}
		},
		onAfterTerastallization(pokemon) {
			for (const pokemon of this.getAllActive()) {
				pokemon.addVolatile('haste');
			}
		},
		flags: {},
		name: "Rapid",
		shortDesc: "10% boost if first to move. On activation grant Haste to user's side for 2 turns.",
	},
	scrappy: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true && target) {
				for (const type of this.dex.types.all()) {
					if (target.runImmunity(type.name)) {
						move.ignoreImmunity[type.name] = true;
					}
				}
			}
		},
		onTryBoost(boost, target, source, effect) {},
		onAfterTerastallization(pokemon) {
			this.actions.useMove('bulkup', pokemon);
		},
		desc: "Moves ignore immunities. On activation use Bulk Up.",
		shortDesc: "Moves ignore immunities. On activation use Bulk Up.",
	},
	searinginsight: {
		onModifyDamage(damage, source, target, move) {
			if (move && move.category === 'Special' && target.status === 'brn') {
				return this.chainModify(1.15);
			}
		},
		onAfterTerastallization(pokemon) {
			pokemon.adjacentFoes().forEach(foe => {
				foe.trySetStatus('brn', pokemon);
			});
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				source.canTerastallize = source.teraType;
			}
		},
		flags: {},
		name: "Searing Insight",
		shortDesc: "15% more special damage to burned targets. Activation burns adjacent foes.",
	},
	shockquills: {
		onSourceAfterMove(pokemon, target, move) {
			if (move.type === 'Electric' && target && !target.fainted) {
				const shieldAmount = pokemon.maxhp / 10;

				const oldShield = pokemon.m.buildmonsShield || 0;
				const newShield = Math.min(oldShield + shieldAmount, pokemon.maxhp);
				pokemon.m.buildmonsShield = newShield;

				this.add('-end', pokemon, `Shield: ${Math.floor(oldShield)}`);
				this.add('-start', pokemon, `Shield: ${Math.floor(newShield)}`);
			}
		},
		onStart(pokemon) {
			this.effectState.activated = false;
		},
		onUpdate(pokemon) {
			if (pokemon.m.buildmonsShield >= pokemon.maxhp * 0.2 && !this.effectState.activated) {
				pokemon.canTerastallize = pokemon.teraType;
			} else {
				pokemon.canTerastallize = false;
			}
		},
		onAfterTerastallization(pokemon) {
			pokemon.adjacentAllies().forEach(ally => {
				ally.trySetStatus('par', pokemon);
			});
			pokemon.adjacentFoes().forEach(foe => {
				foe.trySetStatus('par', pokemon);
			});
			this.effectState.activated = true;
		},
		flags: {},
		name: "Shock Quills",
		shortDesc: "Using Electric move grants 10% shield. If shield >= 20% can activate to paralyze field.",
	},
	sniper: {
		inherit: true,
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.debug('Sniper boost');
				return this.chainModify(1.15);
			}
		},
		onAfterTerastallization(pokemon) {
			if (!pokemon.volatiles['laserfocus']) pokemon.addVolatile('laserfocus');
		},
		shortDesc: "Critical hit damage is multiplied by 1.15. On activation gain Laser Focus.",
	},
	soulbrand: {
		onStart(pokemon) {
			this.effectState.essence = 0;
		},
		onEnd(pokemon) {
				this.add('-end', pokemon, `Essence: ${this.effectState.essence}x`, '[silent]');
			this.effectState.essence = 0;
		},
		onAnySwitchIn(pokemon) {
			for (const target of this.getAllActive()) {
				if (target.ability !== 'soulbrand') {
					target.addVolatile('deathbrand', pokemon);
				}
			}
		},
		onAnyFaint(target, source, effect) {
				this.add('-end', source, `Essence: ${this.effectState.essence}x`, '[silent]');
			this.effectState.essence = (this.effectState.essence || 0) + 1;
				this.add('-start', source, `Essence: ${this.effectState.essence}x`, '[silent]');
		},
		onAfterTerastallization(pokemon) {
			const essence = this.effectState.essence || 0;
			if (!essence) return;
			const damageRatio = 0.1 * essence;
			if (essence > 1) this.damage(Math.floor(pokemon.maxhp * damageRatio), pokemon, pokemon);
				this.add('-end', pokemon, `Essence: ${this.effectState.essence}x`, '[silent]');
			this.effectState.essence = 0;
			pokemon.canTerastallize = pokemon.teraType;
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			this.debug(`Soul Brand boost: ${1 + 0.1 * this.effectState.essence}`);
			return this.chainModify(1 + 0.1 * this.effectState.essence, 1);
		},
		flags: {},
		name: "Soul Brand",
		shortDesc: "Switch-ins: Death Brand. Gain essence for kill on branded. Activation consumes essence.",
	},
	vampiric: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (move.flags['bite'] || move.flags['slicing'] || move.drain) {
				target.trySetStatus('bld', source);
			}
		},
		onAfterTerastallization(pokemon) {
			pokemon.adjacentFoes().forEach(foe => { if (foe.status === 'bld') {
				this.damage(foe.maxhp / 4, foe, pokemon); }
				this.heal(foe.maxhp / 4, pokemon, foe, "drain");
				foe.cureStatus();
			});
		},
		flags: {},
		name: "Vampiric",
		shortDesc: "Biting, Slicing, Draining bleed. Activation drains 1/4th of bleeding foes HP and heal bleed.",
	},

	// passives
	steady: {
		onAfterTerastallization(pokemon) {
			this.boost({ accuracy: 1 }, pokemon);
		},
		flags: {},
		name: "Steady",
		shortDesc: "Boost accuracy 1 stage after Skill activation.",
	},
	extendedmagazine: {
		onModifyMove(move) {
			if (move.flags['bullet']) {
				move.pp *= 1.5;
			}
		},
		flags: {},
		name: "Extended Magazine",
		shortDesc: "Bullet moves have 50% more PP.",
	},
	quickreflexes: {
		onDamagingHit(damage, target, source, move) {
			if (!source.isAlly(target) && this.getCategory(move) != 'Status') {
				target.addVolatile('quickreflexes');
			}
		},
		condition: {
			duration: 1,
			onModifyDamage(damage, source, target, move) {
				if (target.getMoveHitData(move).crit) {
					this.debug('Quick Reflexes boost');
					return this.chainModify(1.25);
				}
			},
			onModifyCritRatio(critRatio, source, target) {
				if (this.randomChance(1, 4)) return 5;
			},
		},
		flags: {},
		name: "Quick Reflexes",
		shortDesc: "If attacked this turn, gain 25% increased critical hit chance and damage.",
	},
	stress: {
		onModifySpe(spe, pokemon) {
			return spe + (pokemon.maxhp - pokemon.hp);
		},
		flags: {},
		name: "Stress",
		shortDesc: "Missing HP is added to Speed.",
	},
	suppressivefire: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (move.flags['bullet']) {
				if (this.randomChance(3, 10)) {
					target.addVolatile('supression', source);
				}
			}
		},
		flags: {},
		name: "Suppressive Fire",
		shortDesc: "Bullet moves have a 30% chance to apply suppresion.",
	},
	crossfire: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move' && source.volatiles.includes['doubletap']) {
				source.canTerastallize = source.teraType;
			}
		},
		flags: {},
		name: "Crossfire",
		shortDesc: "Killing an enemy with Double Tap active allows activation again.",
	},

	numb: {
		onSourceModifyDamage(relayVar, source, target, move) {
			this.debug('Numb weaken');
			if (target.status === 'brn') return this.chainModify(0.9);
		},
		flags: {},
		name: "Numb",
		shortDesc: "If the Pokémon is burned, it takes 10% less damage from attacks.",
	},
	contagion: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (source.status) {
				if (this.randomChance(3, 10)) {
					target.trySetStatus(source.status, source);
				}
			}
		},
		flags: {},
		name: "Contagion",
		shortDesc: "If the Pokémon is statused, 30% chance to pass that status to targets.",
	},
	biofuel: {
		onModifyMovePriority: 1,
		onModifyMove(move, pokemon, target) {
			if (!move.drain && target && target.status === 'brn') move.drain = [1, 4];
		},
		flags: {},
		name: "Biofuel",
		shortDesc: "If the target is burned, moves gain 25% drain.",
	},
	
	trapper: {
		onHit(target, source, move) {
			if (move.basePower > 60) {
				if (target && !target.fainted) this.actions.useMove('bite', target, { target: source });
			}
		},
		onAfterTerastallization(pokemon) {
			pokemon.heal(pokemon.maxhp / 2);
		},
		flags: {},
		name: "Trapper",
		shortDesc: "When hit by a move above 60 BP retaliates with Bite. On activation heal 50% HP.",
	},*/
};
