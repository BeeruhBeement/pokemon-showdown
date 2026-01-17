import { learnsetUpdate } from "./learnsetupdate";

export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	init() {
		learnsetUpdate(this);
	},
	pokemon: {
		inherit: true,
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !(this.hasType('???') && 'roost' in this.volatiles)) return false;
			if ((this.hasAbility('levitate') || this.hasAbility('ubercharge')) && !this.battle.suppressingAbility(this)) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		},
		effectiveWeather() {
			const weather = this.battle.field.effectiveWeather();
			switch (weather) {
			case 'sunnyday':
			case 'raindance':
			case 'desolateland':
			case 'primordialsea':
				if (this.hasItem('utilityumbrella')) return '';
			}
			if (this.hasAbility('solarborne')) return 'sunnyday' as ID;
			return weather;
		}
	},
};
