import { ModdedSpeciesData } from "../../../sim/dex-species";

export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	noivern: {
		inherit: true,
		color: "Pilot",
		eggGroups: ["Saviour", "Expertise", "Versatile"],
		abilities: { skill: "Sonar", 
					tree00: "Dampener", tree01: "Slipstream", tree02: "Power of Friendship", tree03: "Harmony", tree04: "Centerpiece", tree05: "Sonic Shock",
					tree10: "Air Vents", tree11: "Regulation", tree12: "Maneuver", tree13: "Stacking", tree14: "Air Resistance", tree15: "Air Support",
					tree20: "Sonic Precision", tree21: "Draconian Rage", tree22: "Long Range", tree23: "Aerial Noise", tree24: "Sound Boost", tree25: "Straight Up Evil"},
	},
};
