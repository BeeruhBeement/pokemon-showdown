import { ModdedFormatData } from "../../../sim/dex-formats";

export const Rulesets: {[k: string]: ModdedFormatData} = {
	datamod: {
		effectType: 'Rule',
		name: 'Data Mod',
		desc: 'When a Pokémon switches in, its types, base Speed, and abilities are displayed to both players.',
		onSwitchIn(pokemon) {
			const speed = pokemon.baseSpecies.baseStats.spe;
			const abilities = Object.values(pokemon.species.abilities).join('/');

			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
			this.add('message', `${pokemon} Base Speed: ${speed}`);
			this.add('-start', pokemon, `${speed}`, '[silent]');
			this.add('message', `${pokemon} Abilities: ${abilities}`);
		},
		onDamagingHit(damage, target, source, move) {
			if (target.hasAbility('illusion')) { 
				const speed = target.baseSpecies.baseStats.spe;
				const abilities = Object.values(target.species.abilities).join('/');

				this.add('-start', target, 'typechange', (target.illusion || target).getTypes(true).join('/'), '[silent]');
				this.add('message', `${target} Base Speed: ${speed}`);
				this.add('-start', target, `${speed}`, '[silent]');
				this.add('message', `${target} Abilities: ${abilities}`);
			}
		},
		onAfterMega(pokemon) {
			const speed = pokemon.baseSpecies.baseStats.spe;
			const abilities = Object.values(pokemon.species.abilities).join('/');

			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
			this.add('message', `${pokemon} Base Speed: ${speed}`);
			this.add('-start', pokemon, `${speed}`, '[silent]');
			this.add('message', `${pokemon} Ability: ${abilities}`);
		},
	},
};
