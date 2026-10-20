import { ModdedLearnsetData } from "../../../sim/dex-species";
import { Pokedex as BasePokedex } from '../../pokedex';

export const Learnsets: { [k: string]: ModdedLearnsetData; } = {
  furret: {
    learnset: {
      aquatail: ["9M"],
      blizzard: ["9M"],
      bodyslam: ["9M"],
      brickbreak: ["9M"],
      coil: ["9M"],
      doubleedge: ["9M"],
      firepunch: ["9M"],
      flamethrower: ["9M"],
      focusblast: ["9M"],
      focuspunch: ["9M"],
      hypervoice: ["9M"],
      icebeam: ["9M"],
      icepunch: ["9M"],
      irontail: ["9M"],
      playrough: ["9M"],
      seedbomb: ["9M"],
      shadowball: ["9M"],
      shadowclaw: ["9M"],
      substitute: ["9M"],
      surf: ["9M"],
      tailslap: ["9M"],
      thunder: ["9M"],
      thunderbolt: ["9M"],
      thunderpunch: ["9M"],
      tidyup: ["9M"],
    },
  },
  beheeyem: {
    learnset: {
      chargebeam: ["9M"],
      darkpulse: ["9M"],
      flashcannon: ["9M"],
      hyperbeam: ["9M"],
      meteorbeam: ["9M"],
      moonblast: ["9M"],
      psybeam: ["9M"],
      psychic: ["9M"],
      psyshock: ["9M"],
      radiowave: ["9M"],
      shadowball: ["9M"],
      signalbeam: ["9M"],
      signalflare: ["9M"],
      steelwing: ["9M"],
      thunderbolt: ["9M"],
      thunderwave: ["9M"],
      zenheadbutt: ["9M"],
    },
  },
  noivern: {
    learnset: {
      airslash: ["9M"],
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