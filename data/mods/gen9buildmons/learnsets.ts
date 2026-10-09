import { ModdedLearnsetData } from "../../../sim/dex-species";
import { Pokedex as BasePokedex } from '../../pokedex';

export const Learnsets: {[k: string]: ModdedLearnsetData} = {
  noivern: {
    learnset: {
      boomburst: ["9M"],
      dracometeor: ["9M"],
      dragonclaw: ["9M"],
      dualwingbeat: ["9M"],
      flamethrower: ["9M"],
      focusblast: ["9M"],
      heatwave: ["9M"],
      hurricane: ["9M"],
      hypervoice: ["9M"],
      psychicnoise: ["9M"],
      tailwind: ["9M"],
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