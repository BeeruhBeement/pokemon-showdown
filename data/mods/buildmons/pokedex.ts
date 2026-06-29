import { ModdedSpeciesData } from "../../../sim/dex-species";

export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	lapras: {
		inherit: true,
		abilities: { skill: "Double Tap", 0: "Telepathy", 1: "Hydration", 4: "Ride the Wave" },
	},
	escavalier: {
		inherit: true,
		abilities: { skill: "Divine Blessing", 0: "Justified", 1: "Cutting Edge", 2: "Exoskeleton", 4: "Duelist" },
	},
	coalossal: {
		inherit: true,
		abilities: { skill: "Coal Mines", 2: "Pain Train", 4: "Explosive Charge" },
	},
	grimmsnarl: {
		inherit: true,
		abilities: { skill: "Double Tap", 0: "Tangling Hair", 2: "Prankster" },
	},
};
