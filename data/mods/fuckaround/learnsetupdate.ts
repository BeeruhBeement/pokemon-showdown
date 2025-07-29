import { ModdedDex } from "../../../sim/dex";

export function learnsetUpdate(dex: ModdedDex) {
	dex.modData("Learnsets", "tsareena").learnset.icebeam = ["3M"];
	dex.modData("Learnsets", "tsareena").learnset.bulkup = ["3M"];

	dex.modData("Learnsets", "sawsbuck").learnset.icebeam = ["3M"];
	dex.modData("Learnsets", "sawsbuck").learnset.ceaselessedge = ["3M"];
	dex.modData("Learnsets", "sawsbuck").learnset.crunch = ["3M"];
	dex.modData("Learnsets", "sawsbuck").learnset.dazzlinggleam = ["3M"];
	dex.modData("Learnsets", "sawsbuck").learnset.playrough = ["3M"];
	delete dex.modData('Learnsets', 'sawsbuck').learnset.synthesis;
}