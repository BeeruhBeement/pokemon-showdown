import { ModdedSpeciesData } from "../../../sim/dex-species";

export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	furret: {
		inherit: true,
		color: "Handler",
		eggGroups: ["Friends Forever", "Pack Hunter", "Fluffy Animals"],
		abilities: { skill: "Stuffed Guardian", 
					tree00: "And Ever", tree01: "It Never Ends", tree02: "Emotional Support", //tree03: "Harmony", tree04: "Centerpiece", tree05: "Sonic Shock",
					tree10: "Prepping", tree11: "Safespot", //tree12: "Maneuver", tree13: "Stacking", tree14: "Air Resistance", tree15: "Air Support",
					tree20: "Hamster Wheel", /*tree21: "Draconian Rage", tree22: "Long Range", tree23: "Aerial Noise", tree24: "Sound Boost", tree25: "Straight Up Evil"*/},
		weightkg: 8,
	},
	beheeyem: {
		inherit: true,
		color: "Invader",
		eggGroups: ["Destroyer", "Space Invader", "Tech Priest"],
		abilities: { skill: "Wormhole",
					tree00: "Probing", tree01: "Space Modulator", tree02: "DNA Decompiler", tree03: "Loophole", //tree04: "Mothership", //tree05: "Sonic Shock",
					tree10: "Surveillance Drone", tree11: "Laser Proficency", tree12: "Pew Pew Pew", tree13: "Mothership", //tree14: "Mothership", //tree15: "Air Support",
					tree20: "Noosphere", tree21: "Binary Signal", /*tree22: "Long Range", tree23: "Aerial Noise", tree24: "Sound Boost", tree25: "Straight Up Evil"*/},
		weightkg: 6,
	},
	durant: {
		inherit: true,
		color: "Forgeant",
		eggGroups: ["Tempered Steel", "Foundry"],
		abilities: { skill: "Pincer Maneuver",
					/*tree00: "Laser Proficency", tree01: "Space Modulator", tree02: "Pew Pew Pew", tree03: "Loophole", tree04: "Mothership", //tree05: "Sonic Shock",
					tree10: "Probing", tree11: "Surveillance Drone", //tree12: "Maneuver", tree13: "Stacking", tree14: "Air Resistance", tree15: "Air Support",
					tree20: "Noosphere", tree21: "Binary Signal", /*tree22: "Long Range", tree23: "Aerial Noise", tree24: "Sound Boost", tree25: "Straight Up Evil"*/},
		weightkg: 8,
	},
	noivern: {
		inherit: true,
		color: "Pilot",
		eggGroups: ["Saviour", "Expertise", "Versatile"],
		abilities: { skill: "Sonar", 
					tree00: "Dampener", tree01: "Slipstream", tree02: "Power of Friendship", tree03: "Harmony", tree04: "Centerpiece", tree05: "Sonic Shock",
					tree10: "Air Vents", tree11: "Regulation", tree12: "Maneuver", tree13: "Stacking", tree14: "Air Resistance", tree15: "Air Support",
					tree20: "Sonic Precision", tree21: "Draconian Rage", tree22: "Long Range", tree23: "Aerial Noise", tree24: "Sound Boost", tree25: "Straight Up Evil"},
		weightkg: 7,
	},
};
