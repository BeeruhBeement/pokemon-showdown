import { ModdedDex } from "../../../sim/dex";

export function learnsetUpdate(dex: ModdedDex) {
	dex.modData("Learnsets", "caterpie").learnset.strugglebug = ["3L1"];
	dex.modData("Learnsets", "caterpie").learnset.absorb = ["3L1"];
	dex.modData("Learnsets", "caterpie").learnset.infestation = ["3L1"];
	dex.modData("Learnsets", "caterpie").learnset.silverwind = ["3L1"];
	dex.modData("Learnsets", "caterpie").learnset.headbutt = ["3L1"];
	
	dex.modData("Learnsets", "weedle").learnset.acid = ["3L1"];
	dex.modData("Learnsets", "weedle").learnset.smog = ["3L1"];
	dex.modData("Learnsets", "weedle").learnset.leer = ["3L1"];
	dex.modData("Learnsets", "weedle").learnset.pounce = ["3L1"];
	dex.modData("Learnsets", "weedle").learnset.furyattack = ["3L1"];
	dex.modData("Learnsets", "weedle").learnset.peck = ["3L1"];
	
	dex.modData("Learnsets", "kakuna").learnset.poisonpowder = ["3L1"];
	dex.modData("Learnsets", "weedle").learnset.headbutt = ["3L1"];
	
	dex.modData("Learnsets", "magikarp").learnset.rage = ["3L1"];

	dex.modData("Learnsets", "wurmple").learnset.lunge = ["3L14"];

	dex.modData("Learnsets", "silcoon").learnset.fakeout = ["3L1"];

	dex.modData("Learnsets", "cascoon").learnset.wrap = ["3L1"];
	
	dex.modData("Learnsets", "kricketot").learnset.absorb = ["3L9"];
	dex.modData("Learnsets", "kricketot").learnset.tackle = ["3L14"];
	
	dex.modData("Learnsets", "burmy").learnset.irondefense = ["3L14"];
	
	dex.modData("Learnsets", "cosmog").learnset.wish = ["3L14"];
}