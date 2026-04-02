import { crypto_box_MACBYTES } from "sodium-native";
import { ModdedSpeciesData } from "../../../sim/dex-species";

export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	poliwrath: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	rapidashgalar: {
		inherit: true,
		abilities: { 0: "Double Down", 1: "Perplexing" }
	},
	seaking: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	crobat: {
		inherit: true,
		abilities: { 0: "Leecher", 1: "Vampiric" }
	},
	granbull: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	donphan: {
		inherit: true,
		abilities: { 0: "Scrappy" }
	},
	shiftry: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	masquerain: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	exploud: {
		inherit: true,
		abilities: { 0: "Scrappy" }
	},
	hariyama: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	sableye: {
		inherit: true,
		baseStats: { hp: 70, atk: 95, def: 95, spa: 85, spd: 85, spe: 50 },
		abilities: { 0: "Greedy", 1: "Soul Brand" }
	},
	manectric: {
		inherit: true,
		baseStats: { hp: 70, atk: 95, def: 60, spa: 105, spd: 60, spe: 115 },
		abilities: { 0: "Double Down" }
	},
	camerupt: {
		inherit: true,
		baseStats: { hp: 95, atk: 100, def: 70, spa: 105, spd: 75, spe: 40 },
		abilities: { 0: "Searing Insight" }
	},
	claydol: {
		inherit: true,
		abilities: { 0: "Searing Insight", 1: "Perplexing" }
	},
	rampardos: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	bastiodon: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	drifblim: {
		inherit: true,
		abilities: { 0: "Double Down", 1: "Heat Engine" }
	},
	drapion: {
		inherit: true,
		abilities: { 0: "Plaguebearer" }
	},
	abomasnow: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	simisage: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	simisear: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	simipour: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	seismitoad: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	vanilluxe: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	slurpuff: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	toucannon: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	shiinotic: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	bewear: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	turtonator: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	togedemaru: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	dubwool: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	flapple: {
		inherit: true,
		abilities: { 0: "Scrappy" }
	},
	perrserker: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	scovillain: {
		inherit: true,
		abilities: { 0: "Heat Engine", 1: "Double Down" }
	},
	wugtrio: {
		inherit: true,
		abilities: { 0: "Double Down" }
	},
	bombirdier: {
		inherit: true,
		abilities: { 0: "Sniper" }
	},
	houndstone: {
		inherit: true,
		types: ["Ghost", "Rock"],
		abilities: { 0: "Entombing Jaws" }
	},
};
