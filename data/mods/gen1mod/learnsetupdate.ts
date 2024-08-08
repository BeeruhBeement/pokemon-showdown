import { ModdedDex } from "../../../sim/dex";

export function learnsetUpdate(dex: ModdedDex) {
	dex.modData('Learnsets', 'porygon').learnset.megabyte = ['3L1'];
	dex.modData('Learnsets', 'porygon').learnset.lagblast = ['3L1'];
	dex.modData('Learnsets', 'lickitung').learnset.bounce = ['3L1'];
	dex.modData('Learnsets', 'flareon').learnset.glassshards = ['3L1'];
}