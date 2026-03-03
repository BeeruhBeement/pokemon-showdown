export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	bigroot: {
		inherit: true,
		gen: -1,
	},
	zoomlens: {
		inherit: true,
		gen: -1,
		shortDesc: "The accuracy of attacks by the holder is 1.3x if it moves after its target.",
		onSourceModifyAccuracy(accuracy, target) {
			if (typeof accuracy === 'number' && !this.queue.willMove(target)) {
				this.debug('Zoom Lens boosting accuracy');
				return this.chainModify([15, 10]);
			}
		},
	},
	loadeddice: {
		inherit: true,
		gen: -1,
	},
	metronome: {
		inherit: true,
		shortDesc: "Damage of moves used on consecutive turns is increased. Max 1.5x after 5 turns.",
		condition: {
			onStart(pokemon) {
				this.effectState.lastMove = '';
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasItem('overheater')) {
					pokemon.removeVolatile('overheater');
					return;
				}
				if (move.callsMove) return;
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
			onModifyDamage(damage, source, target, move) {
				const dmgMod = [1, 1.05, 1.1, 1.15, 1.2, 1.25];
				const numConsecutive = this.effectState.numConsecutive > 5 ? 5 : this.effectState.numConsecutive;
				this.debug(`Current Metronome boost: ${dmgMod[numConsecutive]}`);
				return this.chainModify([dmgMod[numConsecutive], 1]);
			},
		},
		gen: -1,
	},
	bottledlightning: {
		name: "Bottled Lightning",
		shortDesc: "Adds Thunder to the user's moveset.",
		onStart(pokemon) {
			pokemon.moveSlots.push({
				move: 'thunder' as ID,
				pp: 5,
				maxpp: 5,
				id: 'thunder' as ID,
				disabled: false,
				used: false
			});
		},
		gen: -1,
	},
	ukulele: {
		name: "Ukulele",
		shortDesc: "This Pokemon's sound-based moves become Electric type.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound'] && !pokemon.volatiles['dynamax']) { // hardcode
				move.type = 'Electric';
			}
		},
		gen: -1,
	},
	devilhorns: {
		name: "Devil Horns",
		shortDesc: "Draining is transformed into damage.",
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.drain) {
				this.debug('Devil Horns boost');
				return this.chainModify(move.drain?.[0] / move.drain?.[1]);
			}
		},
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			return false;
		},
		gen: -1,
	},
	gravitycore: {
		name: "Gravity Core",
		shortDesc: "All moves make contact.",
		onModifyMovePriority: 1,
		onAnyModifyMove(move) {
			if (!move.flags['contact']) this.add(move.flags['contact']);
		},
		gen: -1,
	},
	glassbull: {
		name: "Glass Bull",
		shortDesc: "Gives the user Hyper Beam. Recharge ignored if it KOs the opponent, and breaks if it doesn’t.",
		onStart(pokemon) {
			pokemon.moveSlots.push({
				move: 'hyperbeam' as ID,
				pp: 5,
				maxpp: 5,
				id: 'hyperbeam' as ID,
				disabled: false,
				used: false
			});
		},
		onAfterMove(pokemon, target, move) {
			if (target && target.hp <= 0) {
				delete pokemon.volatiles['mustrecharge'];
				return;
			}
			this.add('-enditem', pokemon, 'Glass Bull');
			if (target.item === 'glassbull') {
				target.item = '';
				this.clearEffectState(target.itemState);
			} else {
				const isBMM = target.volatiles['item:glassbull']?.inSlot;
				if (isBMM) {
					target.removeVolatile('item:glassbull');
					target.m.scrambled.items.splice((target.m.scrambled.items as { thing: string, inSlot: string }[]).findIndex(e =>
						this.toID(e.thing) === 'glassbull' && e.inSlot === isBMM), 1);
				}
			}
			this.runEvent('AfterUseItem', target, null, null, this.dex.items.get('glassbull'));
			this.add('-mustrecharge', pokemon);
		},
		gen: -1,
	},
	rottensteak: {
		name: "Rotten Steak",
		shortDesc: "On switch-in take 20 damage unless it would kill. Contact with the user poisons.",
		onSwitchIn(pokemon) {
			if (pokemon.hp > 20) {
				this.damage(20, pokemon, pokemon);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				source.trySetStatus('psn', target);
			}
		},
		gen: -1,
	},
	shieldgenerator: {
		name: "Shield Generator",
		shortDesc: "On switch-in gain a single use protect.",
		onSwitchIn(pokemon) {
			pokemon.moveSlots.push({
				move: 'protect' as ID,
				pp: 1,
				maxpp: 1,
				id: 'protect' as ID,
				disabled: false,
				used: false
			});
		},
		gen: -1,
	},
	overheater: {
		name: "Overheater",
		shortDesc: "After using a move more than twice consecutively every subsequent hit burns.",
		onStart(pokemon) {
			pokemon.addVolatile('overheater');
		},
		condition: {
			onStart(pokemon) {
				this.effectState.lastMove = '';
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasItem('overheater')) {
					pokemon.removeVolatile('overheater');
					return;
				}
				if (move.callsMove) return;
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
				if (this.effectState.numConsecutive >= 3) {
					target.trySetStatus('brn', source);
				}
			},
		},
		gen: -1,
	},
	noxiousthorn: {
		name: "Noxious Thorn",
		shortDesc: "Gain 10% chance to bleed. Critical hit damage on statused targets is multiplied by 1.15.",
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.debug('Sniper boost');
				return this.chainModify(1.15);
			}
		},
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (this.checkMoveMakesContact(move, target, source)) {
				if (this.randomChance(1, 10)) {
					target.trySetStatus('bld', source);
				}
			}
		},
		gen: -1,
	},
	leakingpipe: {
		name: "Leaking Pipe",
		shortDesc: "Use Water Gun when hit.",
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			this.actions.useMove('watergun', source);
		},
		gen: -1,
	},
	heavyshackles: {
		name: "Heavy Shackles",
		shortDesc: "Use Stomp on switch-in. 1.5x Weight.",
		onSwitchIn(pokemon) {
			this.actions.useMove('stomp', pokemon.adjacentFoes()[0]);
		},
		gen: -1,
	},
};