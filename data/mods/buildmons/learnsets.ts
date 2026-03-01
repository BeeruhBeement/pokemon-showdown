import { hasUncaughtExceptionCaptureCallback } from "process";
import { ModdedLearnsetData } from "../../../sim/dex-species";

export const Learnsets: {[k: string]: ModdedLearnsetData} = {
	tyrogue: {
		learnset: {},
	},
	hitmonlee: {
		learnset: {
			highjumpkick: ["3M"],
			jumpkick: ["3M"],
			blazekick: ["3M"],
			doubleedge: ["3M"],
			fakeout: ["3M"],
			stompingtantrum: ["3M"],
			stoneedge: ["3M"],
			focuspunch: ["3M"],
			swordsdance: ["3M"],
			focusblast: ["3M"],
		},
	},
	rookidee: {
		learnset: {},
	},
	corvisquire: {
		learnset: {},
	},
	corviknight: {
		learnset: {
			roost: ["3M"],
			drillpeck: ["3M"],
			dualwingbeat: ["3M"],
			ironhead: ["3M"],
			bodypress: ["3M"],
			focusenergy: ["3M"],
			airslash: ["3M"],
			flashcannon: ["3M"],
			steelwing: ["3M"],
		},
	},
	nosepass: {
		learnset: {},
	},
	probopass: {
		learnset: {
			thunderbolt: ["3M"],
			thunder: ["3M"],
			voltswitch: ["3M"],
			earthpower: ["3M"],
			stealthrock: ["3M"],
			rockslide: ["3M"],
			flashcannon: ["3M"],
			irondefense: ["3M"],
			ironhead: ["3M"],
			gyroball: ["3M"],
			powergem: ["3M"],
			sandstorm: ["3M"],
			thunderwave: ["3M"],
			painsplit: ["3M"],
		},
	},
	yamask: {
		learnset: {},
	},
	cofagrigus: {
		learnset: {
			hex: ["3M"],
			bodypress: ["3M"],
			shadowball: ["3M"],
			painsplit: ["3M"],
			healblock: ["3M"],
			protect: ["3M"],
		},
	},
	lotad: {
		learnset: {},
	},
	lombre: {
		learnset: {},
	},
	ludicolo: {
		learnset: {
			raindance: ["3M"],
			gigadrain: ["3M"],
			surf: ["3M"],
			seedbomb: ["3M"],
			waterfall: ["3M"],
			protect: ["3M"],
			leechseed: ["3M"],
			hypervoice: ["3M"],
		},
	},
	cutiefly: {
		learnset: {},
	},
	ribombee: {
		learnset: {
			moonblast: ["3M"],
			bugbuzz: ["3M"],
			dazzlinggleam: ["3M"],
			stunspore: ["3M"],
			energyball: ["3M"],
			psychicnoise: ["3M"],
			aromatherapy: ["3M"],
			roost: ["3M"],
			powder: ["3M"],
			uturn: ["3M"],
		},
	},
	houndour: {
		learnset: {},
	},
	houndoom: {
		learnset: {
			sunnyday: ["3M"],
			heatwave: ["3M"],
			inferno: ["3M"],
			flamethrower: ["3M"],
			darkpulse: ["3M"],
			sludgebomb: ["3M"],
			taunt: ["3M"],
			crunch: ["3M"],
			suckerpunch: ["3M"],
			firefang: ["3M"],
			willowisp: ["3M"],
			pursuit: ["3M"],
		},
	},
	buizel: {
		learnset: {},
	},
	floatzel: {
		learnset: {
			aquajet: ["3M"],
			liquidation: ["3M"],
			flipturn: ["3M"],
			bulkup: ["3M"],
			icepunch: ["3M"],
			raindance: ["3M"],
			surf: ["3M"],
		},
	},
};
