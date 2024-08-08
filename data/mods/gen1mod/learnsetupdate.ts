import { ModdedDex } from "../../../sim/dex";

export function learnsetUpdate(dex: ModdedDex) {
	dex.modData('Learnsets', 'porygon').learnset.megabyte = ['1L1'];
	dex.modData('Learnsets', 'porygon').learnset.lagblast = ['1L1'];
	dex.modData('Learnsets', 'lickitung').learnset.bounce = ['1L1'];
	dex.modData('Learnsets', 'flareon').learnset.glassshards = ['1L1'];
}