import { Pokedex as BasePokedex } from '../../pokedex';
import { ModdedLearnsetData } from "../../../sim/dex-species";

export const Learnsets: {[k: string]: ModdedLearnsetData} = {
	commando: {
		learnset: {
			scaleshot: ["9M"],
			dragonclaw: ["9M"],
			leechlife: ["9M"],
			xscissor: ["9M"],
			stingerlance: ["9M"],
			fightingterrain: ["9M"],
			counterattack: ["9M"],
			dragonbreath: ["9M"],
			stoneedge: ["9M"],
			megahorn: ["9M"],
			substitute: ["9M"],
			protect: ["9M"],
			hammerarm: ["9M"],
			poisonjab: ["9M"],
			shadowclaw: ["9M"],
			shadowball: ["9M"],
			sunnyday: ["9M"],
			raindance: ["9M"],
			rockslide: ["9M"],
			taunt: ["9M"],
		},
	},
	bandit: {
		learnset: {
			nightslash: ["9M"],
			focusblast: ["9M"],
			darkpulse: ["9M"],
			morningstar: ["9M"],
			signalflare: ["9M"],
			aurasphere: ["9M"],
			earthpower: ["9M"],
			earthquake: ["9M"],
			highhorsepower: ["9M"],
			stompingtantrum: ["9M"],
			substitute: ["9M"],
			protect: ["9M"],
			fireblast: ["9M"],
			rockblast: ["9M"],
			seedbomb: ["9M"],
			slash: ["9M"],
			shadowclaw: ["9M"],
			metalclaw: ["9M"],
			stoneedge: ["9M"],
			knockoff: ["9M"],
			nightfall: ["9M"],
			quicksand: ["9M"],
			scorchingsands: ["9M"],
			shadowball: ["9M"],
			spikes: ["9M"],
			taunt: ["9M"],
		},
	},
	tesla: {
		learnset: {
			thunderbolt: ["9M"],
			thunder: ["9M"],
			thundercage: ["9M"],
			charge: ["9M"],
			electricterrain: ["9M"],
			flashcannon: ["9M"],
			fulmination: ["9M"],
			electroball: ["9M"],
			overdrive: ["9M"],
			hypervoice: ["9M"],
			signalbeam: ["9M"],
		},
	},
};

for (const mon in BasePokedex) {
  if (Object.prototype.hasOwnProperty.call(Learnsets, mon)) continue;

  const id = mon as keyof typeof Learnsets;
  Learnsets[id] = {
    inherit: undefined,
    learnset: {},
  };
}