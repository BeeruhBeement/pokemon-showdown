import { Pokedex as BasePokedex } from '../../pokedex';
import { ModdedLearnsetData } from "../../../sim/dex-species";

export const Learnsets: {[k: string]: ModdedLearnsetData} = {
	houndstone: {
		learnset: {
			bite: ["9L6"],
			bodypress: ["9M"],
			bulldoze: ["9M"],
			charm: ["9M", "9L51"],
			confuseray: ["9M"],
			crunch: ["9M", "9L28"],
			dig: ["9M", "9L16"],
			doubleedge: ["9M", "9L58"],
			endeavor: ["9M"],
			endure: ["9M"],
			facade: ["9M"],
			firefang: ["9M"],
			gigaimpact: ["9M"],
			growl: ["9L1"],
			headbutt: ["9L12"],
			helpinghand: ["9M", "9L41"],
			hex: ["9M"],
			hyperbeam: ["9M"],
			icefang: ["9M"],
			lick: ["9L3"],
			mudshot: ["9M"],
			mudslap: ["9M"],
			nightshade: ["9M"],
			painsplit: ["9M"],
			phantomforce: ["9M", "9L46"],
			playrough: ["9M", "9L36"],
			//poltergeist: ["9M"],
			psychicfangs: ["9M"],
			raindance: ["9M"],
			rest: ["9M", "9L24"],
			roar: ["9M", "9L9"],
			rockcrunch: ["9M"],
			rockslide: ["9M"],
			rocktomb: ["9M"],
			sandstorm: ["9M"],
			scaryface: ["9M"],
			shadowball: ["9M"],
			sleeptalk: ["9M"],
			snarl: ["9M"],
			soulchomp: ["9M"],
			stompingtantrum: ["9M"],
			stoneedge: ["9M"],
			sunnyday: ["9M"],
			tackle: ["9L1"],
			tailwhip: ["9L6"],
			takedown: ["9M"],
			thief: ["9M"],
			thunderfang: ["9M"],
			uproar: ["9M"],
			willowisp: ["9M"],
		},
	},
};

/*for (const mon in BasePokedex) {
	const id = mon as keyof typeof Learnsets;

	Learnsets[id] = {
		inherit: undefined,
		learnset: {},
	};
}*/