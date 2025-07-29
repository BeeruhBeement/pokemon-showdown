import { ModdedDex } from "../../../sim/dex";

export function learnsetUpdate(dex: ModdedDex) {
	dex.modData("Learnsets", "tsareena").learnset.icebeam = ["9M"];
	dex.modData("Learnsets", "tsareena").learnset.bulkup = ["9M"];
	dex.modData("Learnsets", "tsareena").learnset.machpunch = ["9M"];
	
	dex.modData("Learnsets", "magearna").learnset.vacuumwave = ["9M"];
	dex.modData("Learnsets", "magearna").learnset.drainpunch = ["9M"];

	dex.modData("Learnsets", "sawsbuck").learnset.icebeam = ["9M"];
	dex.modData("Learnsets", "sawsbuck").learnset.ceaselessedge = ["9M"];
	dex.modData("Learnsets", "sawsbuck").learnset.crunch = ["9M"];
	dex.modData("Learnsets", "sawsbuck").learnset.dazzlinggleam = ["9M"];
	dex.modData("Learnsets", "sawsbuck").learnset.playrough = ["9M"];
	delete dex.modData('Learnsets', 'sawsbuck').learnset.synthesis;
	
	dex.modData("Learnsets", "sneasel").learnset.bulleptunch = ["9M"];
	dex.modData("Learnsets", "sneasel").learnset.machpunch = ["9M"];
	dex.modData("Learnsets", "sneasel").learnset.drainpunch = ["9M"];
	dex.modData("Learnsets", "sneasel").learnset.bulkup = ["9M"];
	dex.modData("Learnsets", "sneasel").learnset.doomdesire = ["9M"];
	
	dex.modData("Learnsets", "copperajah").learnset.boomburst = ["9M"];
	dex.modData("Learnsets", "copperajah").learnset.powergem = ["9M"];
	dex.modData("Learnsets", "copperajah").learnset.meteorbeam = ["9M"];
	
	dex.modData("Learnsets", "xatu").learnset.psychicnoise = ["9M"];
	dex.modData("Learnsets", "xatu").learnset.flashcannon = ["9M"];
	dex.modData("Learnsets", "xatu").learnset.steelbeam = ["9M"];
	dex.modData("Learnsets", "xatu").learnset.tachyoncutter = ["9M"];
	dex.modData("Learnsets", "xatu").learnset.voltswitch = ["9M"];
}