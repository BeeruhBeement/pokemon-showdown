import { Pokedex as BasePokedex } from '../../pokedex';
import { ModdedLearnsetData } from "../../../sim/dex-species";

export const Learnsets: {[k: string]: ModdedLearnsetData} = {
	commando: {
		learnset: {
			scaleshot: ["9M"],
			dragonclaw: ["9M"],
			leechlife: ["9M"],
			xcsissor: ["9M"],
			stingerlance: ["9M"],
			fightingterrain: ["9M"],
			counterattack: ["9M"],
			dragonbreath: ["9M"],
			stoneedge: ["9M"],
			megahorn: ["9M"],
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