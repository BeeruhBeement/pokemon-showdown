import { ModdedDex } from "../../../sim/dex";

export function learnsetUpdate(dex: ModdedDex) {
	dex.modData("Learnsets", "tsareena").learnset.icebeam = ["9M"];
	dex.modData("Learnsets", "tsareena").learnset.bulkup = ["9M"];

	dex.modData("Learnsets", "sawsbuck").learnset.icebeam = ["9M"];
	dex.modData("Learnsets", "sawsbuck").learnset.ceaselessedge = ["9M"];
	dex.modData("Learnsets", "sawsbuck").learnset.crunch = ["9M"];
	dex.modData("Learnsets", "sawsbuck").learnset.dazzlinggleam = ["9M"];
	dex.modData("Learnsets", "sawsbuck").learnset.playrough = ["9M"];
	delete dex.modData('Learnsets', 'sawsbuck').learnset.synthesis;
}