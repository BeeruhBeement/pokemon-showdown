export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	bigroot: {
		inherit: true,
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
	devilhorns: {
		name: "Devil Horns",
		shortDesc: "Disables draining. Half of the drain is transformed into damage.",
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.drain) {
				this.debug('Devil Horns boost');
				return basePower + basePower * (move.drain?.[0] / move.drain?.[1]) / 2;
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
	icekingsmemento: {
		name: "Ice King's Memento",
		shortDesc: "Adds Blizzard to the user's moveset.",
		onStart(pokemon) {
			pokemon.moveSlots.push({
				move: 'blizzard' as ID,
				pp: 5,
				maxpp: 5,
				id: 'blizzard' as ID,
				disabled: false,
				used: false
			});
		},
		gen: -1,
	},
	heavyshackles: {
		name: "Heavy Shackles",
		shortDesc: "Use Stomp on switch-in. 1.5x Weight.",
		onStart(pokemon) {
			this.actions.useMove('stomp', pokemon.adjacentFoes()[0]);
		},
		onModifyWeight(weighthg) {
			return this.trunc(weighthg * 1.5);
		},
		gen: -1,
	},
	leakingpipe: {
		name: "Leaking Pipe",
		shortDesc: "Use Water Gun when hit by a contact move.",
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				this.actions.useMove('watergun', source);
			}
		},
		gen: -1,
	},
	loadeddice: {
		inherit: true,
		gen: -1,
	},
	metronome: {
		inherit: true,
		shortDesc: "Damage of moves used on consecutive turns is increased. Max 1.25x after 5 turns.",
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
			if (this.randomChance(1, 10)) {
				target.trySetStatus('bld', source);
			}
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
	philosophersstone: {
		name: "Philosopher's Stone",
		shortDesc: "Turns Steel-type into Rock-type. If shiny turns Steel-type into Fairy-type.",
		onStart(pokemon) {
			let type = 'Rock';
			if (pokemon.set.shiny) type = 'Fairy';

			if (pokemon.hasType('Steel')) {
				let newTypes = pokemon.types.map(t => t === 'Steel' ? type : t);

				newTypes = [...new Set(newTypes)];

				pokemon.setType(newTypes);
				this.add('-start', pokemon, 'typechange', newTypes.join('/'), '[silent]');
			}
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
		shortDesc: "On switch-in adds Protect to the user's moveset with 1 PP.",
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
	witchsmemento: {
		name: "Witch's Memento",
		shortDesc: "Killing a statused target transfers the status to the Pokemon switching in.",
		onSourceAfterFaint(length, target, source, effect) {
			if (!source || source.fainted) return;
			if (!target.status) return;
			target.side.addSideCondition('witchsmemento');
			const sideCondition = target.side.sideConditions['witchsmemento'];
			if (sideCondition) {
				sideCondition.status = target.status;
				sideCondition.source = source;
			}
		},
		condition: {
			onSwitchIn(target) {
				const state = this.effectState as any;
				if (!state.status) return;
				if (target.status) return;

				target.setStatus(state.status, state.source);

				target.side.removeSideCondition('witchsmemento');
			},
		},
		gen: -1,
	},
	zoomlens: {
		inherit: true,
		gen: -1,
		shortDesc: "The accuracy of attacks by the holder is 1.3x if it moves after its target.",
		onSourceModifyAccuracy(accuracy, target) {
			if (typeof accuracy === 'number' && !this.queue.willMove(target)) {
				this.debug('Zoom Lens boosting accuracy');
				return this.chainModify([13, 10]);
			}
		},
	},
};