export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	abilityshield: {
		inherit: true,
		gen: -1,
	},
	aloevera: {
		name: "Aloe Vera",
		shortDesc: "Increases healing effectiveness by 1.25x.",
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const noheals = ['drain', 'leechseed'];
			if (!noheals.includes(effect.id)) {
				return this.chainModify([125, 100]);
			}
		},
		gen: -1,
	},
	amuletofthemoon: {
		name: "Amulet of the Moon",
		shortDesc: "10% damage boost under Night. Always active if also holding Amulet of the Sun.",
		onBasePower(basePower, user, target, move) {
			if (['night'].includes(user.effectiveWeather()) || user.hasItem("amuletofthesun")) {
				return this.chainModify([11, 10]);
			}
		},
		gen: -1,
	},
	amuletofthesun: {
		name: "Amulet of the Sun",
		shortDesc: "10% damage boost under Sun. Always active if also holding Amulet of the Moon.",
		onBasePower(basePower, user, target, move) {
			if (['sunnyday', 'desolateland'].includes(user.effectiveWeather()) || user.hasItem("amuletofthemoon")) {
				return this.chainModify([11, 10]);
			}
		},
		gen: -1,
	},
	bigroot: {
		inherit: true,
		shortDesc: "Holder gains 1.3x HP from draining.",
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed'];
			if (heals.includes(effect.id)) {
				return this.chainModify([13, 10]);
			}
		},
		gen: -1,
	},
	bindingband: {
		inherit: true,
		gen: -1,
		shortDesc: "Holder's partial-trapping moves deal 1/10 max HP per turn instead of 1/20.",
	},
	bloodletterleech: {
		name: "Bloodletter Leech",
		shortDesc: "User Bleeds. Moves without drain gain 1/5 drain if the user is bleeding.",
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('bld', pokemon);
		},
		onModifyMovePriority: 1,
		onModifyMove(move, pokemon, target) {
			if (!move.drain && pokemon.status === 'bld') move.drain = [1, 4];
		},
		gen: -1,
	},
	bottledlightning: {
		name: "Bottled Lightning",
		shortDesc: "Adds Thunder to the user's moveset if the user doesn't have it already.",
		onStart(pokemon) {
			if (pokemon.moveSlots.some(move => move.id === 'thunder')) return;
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
	brokenstopwatch: {
		name: "Broken Stopwatch",
		shortDesc: "Future attacks hit instantly.",
		onModifyMovePriority: 1,
		onModifyMove(move, pokemon, target) {
			if (move.flags.futuremove) {
				move.ignoreImmunity = false;
				move.onTry = undefined;
			}
		},
		gen: -1,
	},
	devilhorns: {
		name: "Devil Horns",
		shortDesc: "Disables draining. Half of draining is transformed into damage.",
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.drain) {
				this.debug('Devil Horns boost');
				return basePower + basePower * (move.drain?.[0] / move.drain?.[1]) / 2;
			}
		},
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			if (effect.id === 'drain') {
				return false;
			}
		},
		gen: -1,
	},
	elementalinverter: {
		name: "Elemental Inverter",
		shortDesc: "Swaps the types of the first 2 moveslots.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const move1 = this.dex.getActiveMove(pokemon.moveSlots[0]?.move).id;
			const move2 = this.dex.getActiveMove(pokemon.moveSlots[1]?.move).id;
			if (!move1 || !move2) return;
			if (move.id === move1) {
				move.type = this.dex.getActiveMove(move2).type;
			} else if (move.id === move2) {
				move.type = this.dex.getActiveMove(move1).type;
			}
		},
		gen: -1,
	},
	executionerhood: {
		name: "Executioner Hood",
		shortDesc: "Moves deal 30% more damage to targets below 40% HP.",
		onModifyDamage(damage, source, target, move) {
			if (target && target.hp < target.maxhp * 4 / 10) this.chainModify([13, 10]);
		},
		gen: -1,
	},
	fanofknives: {
		name: "Fan of Knives",
		shortDesc: "Wind moves apply Bleed to the target.",
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (move.flags['wind']) {
				target.trySetStatus('bld', source);
			}
		},
		gen: -1,
	},
	gripclaw: {
		inherit: true,
		gen: -1,
	},
	hangmansnoose: {
		name: "Hangman's Noose",
		shortDesc: "On switch-in, sets the user's HP to 1/3 of its max HP.",
		onSwitchInPriority: -1,
		onStart(pokemon) {
			pokemon.sethp(pokemon.maxhp / 3);
			this.add('-sethp', pokemon, pokemon.getHealth);
		},
		gen: -1,
	},
	juicysteak: {
		name: "Juicy Steak",
		shortDesc: "On switchin Gain 30 Max HP.",
		onStart(pokemon) {
			if (pokemon.bondTriggered) return;
			this.effectState.oldmaxhp = pokemon.maxhp;
			pokemon.maxhp += 30;
			pokemon.sethp(pokemon.hp + (pokemon.maxhp - this.effectState.oldmaxhp));
			pokemon.bondTriggered = true;
		},
		gen: -1,
	},
	icecoldcoffee: {
		name: "Ice Cold Coffee",
		shortDesc: "Swaps burn and freeze. Doubles burn and freeze chances.",
		onModifyMovePriority: -2,
		onModifyMove(move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (const secondary of move.secondaries) {
					if (secondary.chance && (secondary.status === 'brn' || secondary.status === 'frz')) secondary.chance *= 2;
				}
			}
		},
		gen: -1,
	},
	jestersmask: {
		name: "Jester's Mask",
		shortDesc: "Adds Taunt to the user's moveset. Using Taunt on a Pokemon burns it.",
		onStart(pokemon) {
			if (pokemon.moveSlots.some(move => move.id === 'taunt')) return;
			pokemon.moveSlots.push({
				move: 'taunt' as ID,
				pp: 5,
				maxpp: 5,
				id: 'taunt' as ID,
				disabled: false,
				used: false
			});
		},
		onAfterMove(source, target, move) {
			if (move.id === 'taunt') {
				target.trySetStatus('brn', source);
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
				if (!pokemon.hasItem('metronome')) {
					pokemon.removeVolatile('metronome');
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
	miasmiccandle: {
		name: "Miasmic Candle",
		desc: "Using a Poison-type attack on a burned target applies the volatile status Miasma (1/10 damage end of turn) until the burn is cured.",
		shortDesc: "Using a Poison attack on burned target applies Miasma until the burn is cured.",
		onSourceHit(target, source, move) {
			if (move.type === 'Poison' && target.status === 'brn') {
				target.addVolatile('miasmiccandle');
			}
		},
		condition: {
			onStart(target) {
				this.add('-start', target, 'Miasma');
			},
			onResidualOrder: 15,
			onResidual(pokemon) {
				if (pokemon.status !== 'brn') {
					pokemon.removeVolatile('miasmiccandle');
				} else {
					this.damage(pokemon.baseMaxhp / 10);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'Miasma');
			},
		},
		gen: -1,
	},
	moltenhammer: {
		name: "Molten Hammer",
		shortDesc: "After using a move more than twice consecutively every subsequent hit burns.",
		onStart(pokemon) {
			pokemon.addVolatile('moltenhammer');
		},
		condition: {
			onStart(pokemon) {
				this.effectState.lastMove = '';
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasItem('moltenhammer')) {
					pokemon.removeVolatile('moltenhammer');
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
	muscleband: {
		inherit: true,
		shortDesc: "Holder's physical attacks have a 7.5% power boost.",
		onBasePower(basePower, user, target, move) {
			if (move.category === 'Physical') {
				return this.chainModify([1075, 1000]);
			}
		},
		gen: -1,
	},
	nanobots: {
		name: "Nanobots",
		shortDesc: "At the end of every turn, holder restores 1/15 of max HP. Damages if user is statused.",
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (!pokemon.status) return this.heal(pokemon.maxhp / 20);
			else return this.damage(pokemon.maxhp * 3 / 40);
		},
		gen: -1,
	},
	noxiousthorn: {
		name: "Noxious Thorn",
		shortDesc: "Gain 10% chance to bleed. Critical damage on statused targets is multiplied by 1.15.",
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
	psychicnullifier: {
		name: "Psychic Nullifier",
		shortDesc: "All damage received is Physical. Sp. Atk and Sp. Def are set to 5.",
		onFoeModifyMove(move, pokemon, target) {
			move.overrideDefensiveStat = 'def';
		},
		onModifySpA() {
			return 5;
		},
		onModifySpD() {
			return 5;
		},
		gen: -1,
	},
	punchingglove: {
		inherit: true,
		gen: -1,
	},
	razorpenny: {
		name: "Razor Penny",
		shortDesc: "All moveslots gain 2 PP on landing a crit.",
		onSourceDamagingHit(damage, target, source, move) {
			if (move?.effectType === 'Move' && target.getMoveHitData(move).crit) {
				for (const m of source.moveSlots) {
					if (!m) continue;
					m.pp = Math.min(m.pp + 2, m.maxpp);
				}
			}
		},
		gen: -1,
	},
	foulsteak: {
		name: "Foul Steak",
		shortDesc: "Switch-in damages for 20% max HP. Contact with user poisons. Can't kill user.",
		onSwitchIn(pokemon) {
			if (pokemon.hp > Math.floor(pokemon.maxhp / 5)) {
				this.damage(Math.floor(pokemon.maxhp / 5), pokemon, pokemon);
			} else {
				this.damage(pokemon.hp - 1, pokemon, pokemon);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				source.trySetStatus('psn', target);
			}
		},
		gen: -1,
	},
	rustyknife: {
		name: "Rusty Knife",
		shortDesc: "Holder's attacks have a 15% chance of bleeding.",
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Toxic Chain's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;

			if (this.randomChance(3, 20)) {
				target.trySetStatus('bld', source);
			}
		},
		gen: -1,
	},
	sandbucket: {
		name: "Sand Bucket",
		shortDesc: "Holder acts as if it were affected by Sandstorm.",
		onStart(pokemon) {
			if (!pokemon.ignoringItem()) return;
			this.runEvent('WeatherChange', pokemon, pokemon, this.effect);
		},
		onUpdate(pokemon) {
			if (!this.effectState.inactive) return;
			this.effectState.inactive = false;
			this.runEvent('WeatherChange', pokemon, pokemon, this.effect);
		},
		onEnd(pokemon) {
			this.runEvent('WeatherChange', pokemon, pokemon, this.effect);
			this.effectState.inactive = true;
		},
		gen: -1,
	},
	scopelens: {
		inherit: true,
		gen: -1,
	},
	severedrobothand: {
		name: "Severed Robot Hand",
		shortDesc: "Cannot heal above 50% HP. 10% damage boost when at or below 50% HP.",
		onBasePower(basePower, user, target, move) {
			if (user.hp <= user.maxhp / 2) {
				return this.chainModify([11, 10]);
			}
		},
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			if (source.hp >= source.maxhp / 2) return false;
			if (source.hp + damage > source.maxhp / 2) return source.maxhp / 2 - source.hp;
		},
		gen: -1,
	},
	shieldgenerator: {
		name: "Shield Generator",
		shortDesc: "Adds Protect to the user's moveset if the user doesn't have it already.",
		onStart(pokemon) {
			if (pokemon.moveSlots.some(move => move.id === 'protect')) return;
			pokemon.moveSlots.push({
				move: 'protect' as ID,
				pp: 5,
				maxpp: 5,
				id: 'protect' as ID,
				disabled: false,
				used: false
			});
		},
		gen: -1,
	},
	snakeeyes: {
		name: "Snake Eyes",
		shortDesc: "Missing grants Laser Focus.",
		// Effect immplemented in scripts.ts under hitStepAccuracy
		gen: -1,
	},
	snowglobe: {
		name: "Snowglobe",
		shortDesc: "Adds Blizzard to the user's moveset if the user doesn't have it already.",
		onStart(pokemon) {
			if (pokemon.moveSlots.some(move => move.id === 'blizzard')) return;
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
	stormcatalyst: {
		name: "Storm Catalyst",
		shortDesc: "Halves Electric/Ice power. If user knows both, using one triggers the other.",
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Electric' || move.type === 'Ice') {
				return this.chainModify(0.5);
			}
		},
		onAfterMove(source, target, move) {
			if (move.type !== 'Electric' && move.type !== 'Ice') return;

			if (source.volatiles['stormcatalyst']) return;
			source.addVolatile('stormcatalyst');

			const electricMoves: string[] = [];
			const iceMoves: string[] = [];

			for (const m of source.moveSlots) {
				const moveData = this.dex.moves.get(m.id);
				if (moveData.type === 'Electric') electricMoves.push(m.id);
				if (moveData.type === 'Ice') iceMoves.push(m.id);
			}

			if (!electricMoves.length || !iceMoves.length) return;

			const queueMoves = move.type === 'Electric' ? iceMoves : electricMoves;

			for (const id of queueMoves) {
				if (target && !target.fainted) this.actions.runMove(id, source, 0);
			}
		},
		condition: {
			duration: 1,
		},
		gen: -1,
	},
	strongdrink: {
		name: "Strong Drink",
		shortDesc: "User's max HP is boosted by 30% but cannot heal in any way.",
		onStart(pokemon) {
			if (pokemon.bondTriggered) return;
			this.effectState.oldmaxhp = pokemon.maxhp;
			pokemon.maxhp = Math.trunc(pokemon.maxhp * 1.3);
			pokemon.sethp(pokemon.hp + (pokemon.maxhp - this.effectState.oldmaxhp));
			pokemon.bondTriggered = true;
		},
		onTryHealPriority: 1,
		onTryHeal() {
			return false;
		},
		gen: -1,
	},
	sweetroll: {
		name: "Sweet Roll",
		shortDesc: "At the end of every other turn, holder restores 10% of its max HP.",
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.activeTurns % 2 === 0) return this.heal(pokemon.maxhp / 10);
		},
		gen: -1,
	},
	syntheticplant: {
		name: "Synthetic Plant",
		desc: "At the end of each turn, removes a random volatile status.",
		onResidualOrder: 1,
		onResidual(pokemon) {
			const volatiles = Object.keys(pokemon.volatiles).filter(id => {
				const vol = pokemon.volatiles[id];
				return vol && typeof vol.duration === 'number' && vol.duration > 0;
			});
			if (!volatiles.length) return;

			const randomVolatile = this.sample(volatiles);
			pokemon.removeVolatile(randomVolatile);

			this.add('-message', `${pokemon.name} had its ${randomVolatile} removed!`);
		},
		gen: -1,
	},
	taser: {
		name: "Taser",
		shortDesc: "Holder's attacks have a 15% chance of paralyzing.",
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Toxic Chain's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;

			if (this.randomChance(3, 20)) {
				target.trySetStatus('par', source);
			}
		},
		gen: -1,
	},
	timewornresidue: {
		name: "Timeworn Residue",
		shortDesc: "Triggers holder's effects that happen on residual twice.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.volatiles['timewornresidue']) return;
			
			pokemon.addVolatile('timewornresidue');
			
			this.queue.insertChoice({choice: 'residual', pokemon: pokemon});
		},
		condition: {
			duration: 1,
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
	unicornhorn: {
		name: "Unicorn Horn",
		shortDesc: "Physical moves are Special, Special moves are Physical, Status moves self target.",
		onModifyTypePriority: -1,
		onModifyMove(move, pokemon, target) {
			if (move.category === 'Physical') {
				move.category = 'Special';
			} else if (move.category === 'Special') {
				move.category = 'Physical';
			} else if (move.category === 'Status') {
				move.target = 'self';
			}
		},
		gen: -1,
	},
	utilityumbrella: {
		inherit: true,
		gen: -1,
	},
	vengefuldagger: {
		name: "Vengeful Dagger",
		shortDesc: "Holder gains Focus Energy when switching in if an ally fainted last turn.",
		onSwitchIn(pokemon) {
			if (pokemon.side.faintedLastTurn) pokemon.addVolatile('focusenergy');
		},
		gen: -1,
	},
	wiseglasses: {
		inherit: true,
		shortDesc: "Holder's special attacks have a 7.5% power boost.",
		onBasePower(basePower, user, target, move) {
			if (move.category === 'Special') {
				return this.chainModify([1075, 1000]);
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

				if (!target.status) target.setStatus(state.status, state.source);

				target.side.removeSideCondition('witchsmemento');
			},
		},
		gen: -1,
	},
	woodenmask: {
		name: "Wooden Mask",
		shortDesc: "Heal for 7.5% of max HP after using a move.",
		onAfterMoveSecondarySelf(pokemon, source, move) {
			this.heal(pokemon.maxhp / 20, pokemon, pokemon);
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