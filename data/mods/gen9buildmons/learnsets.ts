import { Pokedex as BasePokedex } from '../../pokedex';
import { ModdedLearnsetData } from "../../../sim/dex-species";

export const Learnsets: {[k: string]: ModdedLearnsetData} = {
};

/*for (const mon in BasePokedex) {
  if (Object.prototype.hasOwnProperty.call(Learnsets, mon)) continue;

  const id = mon as keyof typeof Learnsets;
  Learnsets[id] = {
    inherit: undefined,
    learnset: {},
  };
}*/