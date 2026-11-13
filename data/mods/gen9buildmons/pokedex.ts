import { ModdedSpeciesData } from "../../../sim/dex-species";

export const Pokedex: { [k: string]: ModdedSpeciesData; } = {
	furret: {
		inherit: true,
		color: "Handler",
		eggGroups: ["Friends Forever", "Pack Hunter", "Fluffy Animals"],
		abilities: {
			skill: "Stuffed Guardian",
			tree00: "And Ever", tree01: "It Never Ends", tree02: "Emotional Support", //tree03: "Harmony", tree04: "Centerpiece", tree05: "Sonic Shock",
			tree10: "Prepping", tree11: "Safespot", //tree12: "Maneuver", tree13: "Stacking", tree14: "Air Resistance", tree15: "Air Support",
			tree20: "Hamster Wheel", /*tree21: "Draconian Rage", tree22: "Long Range", tree23: "Aerial Noise", tree24: "Sound Boost", tree25: "Straight Up Evil"*/
		},
		weightkg: 8,
	},
	noctowl: {
		inherit: true,
		types: ["Psychic", "Flying"],
		color: "123",
		eggGroups: ["1", "2", "3"],
		abilities: {
			skill: "Placeholder",
			tree00: "Arctic Owl",// tree01: "It Never Ends", tree02: "Emotional Support", //tree03: "Harmony", tree04: "Centerpiece", tree05: "Sonic Shock",
			//tree10: "Prepping", tree11: "Safespot", //tree12: "Maneuver", tree13: "Stacking", tree14: "Air Resistance", tree15: "Air Support",
			/*tree20: "Hamster Wheel", /*tree21: "Draconian Rage", tree22: "Long Range", tree23: "Aerial Noise", tree24: "Sound Boost", tree25: "Straight Up Evil"*/
		},
		weightkg: 7,
	},
	granbull: {
		inherit: true,
		color: "Hound",
		eggGroups: ["Boomdog", "Chained Beast", "Enforcer"],
		abilities: {
			skill: "Wild Hunt",
			tree00: "Phys Res", tree01: "Spread DMG", tree02: "Big Maws", tree03: "Glitter Bomb", tree04: "Entombing Jaws",// tree05: "Sonic Shock",
			tree10: "Swap PTR", tree11: "Vigor", tree12: "While They're Down", tree13: "Gilded Shackles", tree14: "Rocksplosion",// tree15: "Air Support",
			tree20: "Pack-a-Punch", tree21: "Lick Wounds", tree22: "Bear Arms", tree23: "Shielded Favor",/* tree24: "Sound Boost", tree25: "Straight Up Evil"*/
		},
		weightkg: 6,
	},
	floatzel: {
		inherit: true,
		color: "Lifeguard",
		eggGroups: ["1", "2", "3"],
		abilities: {
			skill: "Placeholder",
			//tree00: "And Ever", tree01: "It Never Ends", tree02: "Emotional Support", //tree03: "Harmony", tree04: "Centerpiece", tree05: "Sonic Shock",
			//tree10: "Prepping", tree11: "Safespot", //tree12: "Maneuver", tree13: "Stacking", tree14: "Air Resistance", tree15: "Air Support",
			/*tree20: "Hamster Wheel", /*tree21: "Draconian Rage", tree22: "Long Range", tree23: "Aerial Noise", tree24: "Sound Boost", tree25: "Straight Up Evil"*/
		},
		weightkg: 8,
	},
	weavile: {
		inherit: true,
		color: "Psycho",
		eggGroups: ["1", "2", "3"],
		abilities: {
			skill: "Placeholder",
			//tree00: "And Ever", tree01: "It Never Ends", tree02: "Emotional Support", //tree03: "Harmony", tree04: "Centerpiece", tree05: "Sonic Shock",
			//tree10: "Prepping", tree11: "Safespot", //tree12: "Maneuver", tree13: "Stacking", tree14: "Air Resistance", tree15: "Air Support",
			/*tree20: "Hamster Wheel", /*tree21: "Draconian Rage", tree22: "Long Range", tree23: "Aerial Noise", tree24: "Sound Boost", tree25: "Straight Up Evil"*/
		},
		weightkg: 7,
	},
	crustle: {
		inherit: true,
		color: "Slab",
		eggGroups: ["Walking Fortress", "Roadwork", "3"],
		abilities: {
			skill: "Craggy Bulwark",
			tree00: "Rebar", tree01: "Good Eatings", tree02: "Food Storage", tree03: "Rampart", tree04: "Mysterious Rock Inn", tree05: "Monolith",
			tree10: "Shrapnel", tree11: "Rock Power", tree12: "Switch Out", tree13: "Kick-Start",// tree14: "Air Resistance", tree15: "Air Support",
			/*tree20: "Hamster Wheel", /*tree21: "Draconian Rage", tree22: "Long Range", tree23: "Aerial Noise", tree24: "Sound Boost", tree25: "Straight Up Evil"*/
		},
		weightkg: 8,
	},
	vanilluxe: {
		inherit: true,
		color: "123",
		eggGroups: ["1", "2", "3"],
		abilities: {
			skill: "Placeholder",
					/*tree00: "Laser Proficency", tree01: "Space Modulator", tree02: "Pew Pew Pew", tree03: "Loophole", tree04: "Mothership", //tree05: "Sonic Shock",
					tree10: "Probing", tree11: "Surveillance Drone", //tree12: "Maneuver", tree13: "Stacking", tree14: "Air Resistance", tree15: "Air Support",
					tree20: "Noosphere", tree21: "Binary Signal", /*tree22: "Long Range", tree23: "Aerial Noise", tree24: "Sound Boost", tree25: "Straight Up Evil"*/},
		weightkg: 6,
	},
	beheeyem: {
		inherit: true,
		color: "Invader",
		eggGroups: ["Destroyer", "Space Invader", "Metallic Monk"],
		abilities: {
			skill: "Wormhole",
			tree00: "Probing", tree01: "Space Modulator", tree02: "DNA Decompiler", tree03: "Loophole", tree04: "Nuclear Option", tree05: "Hyperspace Leap",
			tree10: "Surveillance Drone", tree11: "Laser Proficency", tree12: "Pew Pew Pew", tree13: "Voidlight", tree14: "Tractor Beam", //tree15: "Air Support",
			tree20: "Engine Coolant", tree21: "Binary Signal", tree22: "Servitor Drone", tree23: "Omnispex", tree24: "Cybernetics", tree25: "Servo Arm"
		},
		weightkg: 6,
	},
	accelgor: {
		inherit: true,
		types: ["Bug", "Water"],
		color: "Daredevil",
		eggGroups: ["Flow Like Water", "Penitence", "Solace"],
		abilities: {
			skill: "Rapture",
					tree00: "Evasion", tree01: "Swift Mend", tree02: "Protective Wraps", tree03: "River",// tree04: "Mothership", //tree05: "Sonic Shock",
					tree10: "Blooddrenched", tree11: "Bloody Shroud", tree12: "Corrosive Aura", tree13: "Consume", tree14: "Judgement", tree15: "Divinity",
					tree20: "Purity", tree21: "To Be Left Alone", /*tree22: "Long Range", tree23: "Aerial Noise", tree24: "Sound Boost", tree25: "Straight Up Evil"*/},
		weightkg: 6,
	},
	durant: {
		inherit: true,
		color: "Forgeant",
		eggGroups: ["Tempered Steel", "Foundry", "Antagonizer"],
		abilities: {
			skill: "Pincer Maneuver",
			tree00: "Galvanized Steel", tree01: "Blacksmithing", tree02: "Auxiliary Optics", tree03: "Repair Crew", tree04: "Reserve Cannon", tree05: "Servomech Swarm",
			tree10: "Welding", tree11: "Thermal Paste", tree12: "Thermite", tree13: "Fire Ants",// tree14: "Air Resistance", tree15: "Air Support",
			tree20: "Mandibles", tree21: "Anthill", tree22: "Delegate", tree23: "Soldier Ants",/* tree24: "Sound Boost", tree25: "Straight Up Evil"*/
		},
		weightkg: 8,
	},
	delphox: {
		inherit: true,
		color: "Arcanist",
		eggGroups: ["Major", "Minor", "3"],
		abilities: {
			skill: "Tarots",
					/*tree00: "Laser Proficency", tree01: "Space Modulator", tree02: "Pew Pew Pew", tree03: "Loophole", tree04: "Mothership", //tree05: "Sonic Shock",
					tree10: "Probing", tree11: "Surveillance Drone", //tree12: "Maneuver", tree13: "Stacking", tree14: "Air Resistance", tree15: "Air Support",
					tree20: "Noosphere", tree21: "Binary Signal", /*tree22: "Long Range", tree23: "Aerial Noise", tree24: "Sound Boost", tree25: "Straight Up Evil"*/},
		weightkg: 7,
	},
	noivern: {
		inherit: true,
		color: "Pilot",
		eggGroups: ["Saviour", "Expertise", "Versatile"],
		abilities: {
			skill: "Sonar",
			tree00: "Dampener", tree01: "Slipstream", tree02: "Power of Friendship", tree03: "Harmony", tree04: "Centerpiece", tree05: "Sonic Shock",
			tree10: "Air Vents", tree11: "Regulation", tree12: "Maneuver", tree13: "Stacking", tree14: "Air Resistance", tree15: "Air Support",
			tree20: "Sonic Precision", tree21: "Draconian Rage", tree22: "Long Range", tree23: "Aerial Noise", tree24: "Sound Boost", tree25: "Straight Up Evil"
		},
		weightkg: 7,
	},
	typenull: {
		inherit: true,
		types: ["Steel"],
		color: "Construct",
		eggGroups: ["1", "2", "3"],
		abilities: {
			skill: "Placeholder",
			//tree00: "And Ever", tree01: "It Never Ends", tree02: "Emotional Support", //tree03: "Harmony", tree04: "Centerpiece", tree05: "Sonic Shock",
			//tree10: "Prepping", tree11: "Safespot", //tree12: "Maneuver", tree13: "Stacking", tree14: "Air Resistance", tree15: "Air Support",
			/*tree20: "Hamster Wheel", /*tree21: "Draconian Rage", tree22: "Long Range", tree23: "Aerial Noise", tree24: "Sound Boost", tree25: "Straight Up Evil"*/
		},
		weightkg: 6,
	},
	thievul: {
		inherit: true,
		color: "Thief",
		eggGroups: ["Hitman", "Friends In High Places", "Filthy Rich"],
		abilities: {
			skill: "Money Is Power",
			tree00: "Bounty", tree01: "Family Heirloom", tree02: "Assassination", tree03: "Life Sentence", tree04: "Making a Killing", tree05: "Knives Out",
			tree10: "Inheritance", tree11: "Cheapskate", tree12: "SpA Down Res", tree13: "Investment Banker",// tree14: "Air Resistance", tree15: "Air Support",
			tree20: "Skilled Gambler", tree21: "Burst Boost", tree22: "Moneybags", tree23: "Wealth Beyond Measure",/* tree24: "Sound Boost", tree25: "Straight Up Evil"*/
		},
		weightkg: 7,
	},
	perrserker: {
		inherit: true,
		color: "123",
		eggGroups: ["1", "2", "3"],
		abilities: {
			skill: "Placeholder",
			tree00: "Headbanging", tree01: "Death Metal",// tree02: "Emotional Support", //tree03: "Harmony", tree04: "Centerpiece", tree05: "Sonic Shock",
			//tree10: "Prepping", tree11: "Safespot", //tree12: "Maneuver", tree13: "Stacking", tree14: "Air Resistance", tree15: "Air Support",
			/*tree20: "Hamster Wheel", /*tree21: "Draconian Rage", tree22: "Long Range", tree23: "Aerial Noise", tree24: "Sound Boost", tree25: "Straight Up Evil"*/
		},
		weightkg: 6,
	},
};
