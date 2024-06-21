export const Abilities: {[k: string]: ModdedAbilityData} = {
	hustle: {
		inherit: true,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			const physicalTypes = ['Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Fairy'];
			if (physicalTypes.includes(move.type) && typeof accuracy === 'number') {
				return this.chainModify([3277, 4096]);
			}
		},
	},
	toughclaws: {
		inherit: true,
		gen: 3,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([12, 10]);
			}
		},
		shortDesc: "This Pokemon's contact moves have their power multiplied by 1.1.",
	},
	sapsipper: {
		inherit: true,
		gen: 3,
	},
	strongjaw: {
		inherit: true,
		gen: 3,
	},
	sturdy: {
		inherit: true,
		onTryHit(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Sturdy');
				return null;
			}
		},
		onDamagePriority: -30,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Sturdy');
				return target.hp - 1;
			}
		},
		desc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. OHKO moves fail when used against this Pokemon.",
		shortDesc: "If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.",
	},
	ironfist: {
		inherit: true,
		gen: 3,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Iron Fist boost');
				return this.chainModify([13, 10]);
			}
		},
		desc: "This Pokemon's punch-based attacks have their power multiplied by 1.3.",
		shortDesc: "This Pokemon's punch-based attacks have 1.3x power. Sucker Punch is not boosted.",
	},
	moldbreaker: {
		inherit: true,
		gen: 3,
	},
	sandrush: {
		inherit: true,
		gen: 3,
	},
	infiltrator: {
		inherit: true,
		gen: 3,
		onModifyMove(move) {
			move.infiltrates = true;
		},
	},
	roughskin: {
		inherit: true,
		desc: "Pokemon making contact with this Pokemon lose 1/8 of their maximum HP, rounded down. This effect does not happen if this Pokemon did not lose HP from the attack.",
		shortDesc: "Pokemon making contact with this Pokemon lose 1/8 of their max HP.",
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
	},
	eartheater: {
		inherit: true,
		gen: 3,
	},
	aftermath: {
		inherit: true,
		gen: 3,
	},
	snowwarning: {
		inherit: true,
		gen:3,
		onStart(source) {
			this.field.setWeather('snow');
		},
	},
	stancechange: {
		inherit: true,
		gen:3,
		desc: "If this Pokemon is an Aegislash, it changes to Blade Forme before attempting to use Swords Dance, and changes to Shield Forme before attempting to use Protect.",
		shortDesc: "If Aegislash, changes Forme to Blade before Swords Dance and Shield before Protect.",
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			if (attacker.species.baseSpecies !== 'Aegislash' || attacker.transformed) return;
			if (move.category === 'Status' && !['protect', 'swordsdance'].includes(move.id)) return;
			let targetForme = 'Aegislash-Blade';
			if (move.id === 'protect') {
				targetForme = 'Aegislash';
			}
			if (move.id === 'swordsdance') {
				targetForme = 'Aegislash-Blade';
			}
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
	},
	quickdraw: {
		inherit: true,
		gen:3,
	},
	colorchange: {
		inherit: true,
		desc: "On switch-in, this Pokemon's type changes to match the type of an adjacent foe.",
		shortDesc: "On switch-in, this Pokemon's type changes to match an adjacent foe's type.",
		onSwitchIn(pokemon) {
			const possibleTargets = pokemon.adjacentFoes();
			if (!possibleTargets.length) return;
	
			const target = this.sample(possibleTargets);
			const targetTypes = target.getTypes();
			if (pokemon.setType(targetTypes)) {
				this.add('-start', pokemon, 'typechange', targetTypes.join('/'), '[from] ability: Color Change', '[of] ' + target);
			}
		},
		onAfterMoveSecondary(target, source, move) {},
	},
	galvanize: {
		inherit: true,
		gen: 3,
		onBasePower(basePower, pokemon, target, move) {},
	},
	rockypayload: {
		gen: 3,
		inherit: true,
	},
};
