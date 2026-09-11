import { ModdedDex } from "../../../sim/dex";

export function learnsetUpdate(dex: ModdedDex) {
	dex.modData("Learnsets", "lapras").learnset.deepfreeze = ["9M"];
	dex.modData("Learnsets", "lapras").learnset.frostbite = ["9M"];
	dex.modData("Learnsets", "lapras").learnset.iceterrain = ["9M"];

	dex.modData("Learnsets", "escavalier").learnset.fightingterrain = ["9M"];
	dex.modData("Learnsets", "escavalier").learnset.morningstar = ["9M"];
	dex.modData("Learnsets", "escavalier").learnset.steelterrain = ["9M"];
	dex.modData("Learnsets", "escavalier").learnset.stingerlance = ["9M"];
	
	dex.modData("Learnsets", "coalossal").learnset.heatsink = ["9M"];
}