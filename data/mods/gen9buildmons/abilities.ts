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
				this.boost({atk: 5}, source);
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
			if (pokemon.activeTurns === 3) pokemon.canTerastallize = pokemon.teraType;
		},
		condition: {
			duration: 2,
			noCopy: true,
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
		desc: "After being active for 3 turns this Ability can be activated. When activated the Pokemon does not act for the turn and avoids all attacks, it also gains 1.3x power on its moves on the turn after.",
		shortDesc: "After being active for 3 turns can activate: semi invulnerable and 1.3x power next turn.",
	},
	// tree 1
	probing: {
		onBasePower(relayVar, source, target, move) {
			if (target.status === 'par' || target.status === 'rad') {
				return this.chainModify(1.1);
			}
		},
		flags: {},
		name: "Probing",
		shortDesc: "Increases damage dealt to paralyzed or irradiated targets by 10%.",
		rating: 1,
	},
	spacemodulator: {
		onModifyMove(move, pokemon, target) {
			if (move.volatileStatus === 'confusion') {
				move.volatileStatus = undefined;
				move.status = 'rad' as ID;
			}
			if (move.secondary && move.secondary.volatileStatus === 'confusion') {
				move.secondary.volatileStatus = undefined;
				move.secondary.status = 'rad' as ID;
			}
		},
		flags: {},
		name: "Space Modulator",
		shortDesc: "Swaps confusion with Radiation on moves.",
		rating: 1,
	},
	dnadecompiler: {
		onBasePower(relayVar, source, target, move) {
			if (target.status === 'par' || target.status === 'rad') {
				return this.chainModify(1.1);
			}
		},
		flags: {},
		name: "DNA Decompiler",
		shortDesc: "Increases damage dealt to paralyzed or irradiated targets by 10%.",
		rating: 1,
	},
	loophole: {
		onAnyDamage(damage, target, source, effect) {
			if (target === this.effectState.target) this.heal(target.maxhp / 20, target, target)
		},
		flags: {},
		name: "Loophole",
		shortDesc: "Heals 5% after taking any damage",
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
	mothership: {
		onUpdate(pokemon) {
			if (pokemon.hasType('Steel')) return false;
			if (!pokemon.addType('Steel')) return false;
			this.add('-start', pokemon, 'typeadd', 'Steel', '[from] ability: Mothership');
		},
		flags: {},
		name: "Mothership",
		shortDesc: 'Adds the Steel type to the Pokemon.',
		rating: 2,
	},

	// tree 3
	noosphere: {
		flags: {},
		name: "Noosphere",
		shortDesc: ".",
		rating: 1,
	},
	binarysignal: {
		flags: {},
		name: "Binary Signal",
		shortDesc: ".",
		rating: 1,
	},

	//durant
	//skill
	pincermaneuver: {
		flags: {},
		name: "Pincer Maneuver",
		shortDesc: "Placeholder.",
	},

	// noivern
	// skill
	sonar: {
		onAfterTerastallization(pokemon) {
			this.add('-ability', pokemon, 'Sonar');
			pokemon.adjacentFoes().forEach(foe => {
				foe.addVolatile('spddown');
			})
		},
		onStart(pokemon) {
			this.effectState.stacks = 0;
			pokemon.canTerastallize = null;
		},
		onEnd(pokemon) {
			this.effectState.stacks = 0;
		},
		onUpdate(pokemon) {
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
		onBasePower(relayVar, source, target, move) {
			if (target.isAlly(source)) return this.chainModify(0.6);
		},
		flags: { breakable: 1 },
		name: "Dampener",
		shortDesc: "Moves deal 60% less damage to allies.",
		rating: 1,
	},
	slipstream: {
		onResidual(pokemon) {
			if (pokemon.position !== 1) this.heal(pokemon.maxhp / 10, pokemon)
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

				if (!pokemon.volatiles['shield']) {
					pokemon.addVolatile('shield');
				}

				const volatile = pokemon.volatiles['shield'];
				if (volatile) {
					if (!volatile.effectState) {
						volatile.effectState = {};
					}
					const oldShield = volatile.effectState.shield || 0;
					const newShield = Math.min(oldShield + shieldAmount, pokemon.maxhp);
					volatile.effectState.shield = newShield;
					
					this.add('-end', pokemon, `Shield: ${Math.floor(oldShield)}`);
					this.add('-start', pokemon, `Shield: ${Math.floor(newShield)}`);
				}
			}
		},
		onStart(pokemon) {
			this.effectState.activated = false;
		},
		onUpdate(pokemon) {
			const shieldVolatile = pokemon.volatiles['shield'];
			if (shieldVolatile?.effectState?.shield >= pokemon.maxhp * 0.2 && !this.effectState.activated) {
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
