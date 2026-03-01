import { hasUncaughtExceptionCaptureCallback } from "process";
import { ModdedLearnsetData } from "../../../sim/dex-species";

export const Learnsets: {[k: string]: ModdedLearnsetData} = {
	tyrogue: {
		learnset: {},
	},
	hitmonlee: {
		learnset: {
			highjumpkick: ["9M"],
			jumpkick: ["9M"],
			blazekick: ["9M"],
			doubleedge: ["9M"],
			fakeout: ["9M"],
			stompingtantrum: ["9M"],
			stoneedge: ["9M"],
			focuspunch: ["9M"],
			swordsdance: ["9M"],
			focusblast: ["9M"],
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
			roost: ["9M"],
			drillpeck: ["9M"],
			dualwingbeat: ["9M"],
			ironhead: ["9M"],
			bodypress: ["9M"],
			focusenergy: ["9M"],
			airslash: ["9M"],
			flashcannon: ["9M"],
			steelwing: ["9M"],
		},
	},
	nosepass: {
		learnset: {},
	},
	probopass: {
		learnset: {
			thunderbolt: ["9M"],
			thunder: ["9M"],
			voltswitch: ["9M"],
			earthpower: ["9M"],
			stealthrock: ["9M"],
			rockslide: ["9M"],
			flashcannon: ["9M"],
			irondefense: ["9M"],
			ironhead: ["9M"],
			gyroball: ["9M"],
			powergem: ["9M"],
			sandstorm: ["9M"],
			thunderwave: ["9M"],
			painsplit: ["9M"],
		},
	},
	yamask: {
		learnset: {},
	},
	cofagrigus: {
		learnset: {
			hex: ["9M"],
			bodypress: ["9M"],
			shadowball: ["9M"],
			painsplit: ["9M"],
			healblock: ["9M"],
			protect: ["9M"],
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
			raindance: ["9M"],
			gigadrain: ["9M"],
			surf: ["9M"],
			seedbomb: ["9M"],
			waterfall: ["9M"],
			protect: ["9M"],
			leechseed: ["9M"],
			hypervoice: ["9M"],
		},
	},
	cutiefly: {
		learnset: {},
	},
	ribombee: {
		learnset: {
			moonblast: ["9M"],
			bugbuzz: ["9M"],
			dazzlinggleam: ["9M"],
			stunspore: ["9M"],
			energyball: ["9M"],
			psychicnoise: ["9M"],
			aromatherapy: ["9M"],
			roost: ["9M"],
			powder: ["9M"],
			uturn: ["9M"],
		},
	},
	houndour: {
		learnset: {},
	},
	houndoom: {
		learnset: {
			sunnyday: ["9M"],
			heatwave: ["9M"],
			inferno: ["9M"],
			flamethrower: ["9M"],
			darkpulse: ["9M"],
			sludgebomb: ["9M"],
			taunt: ["9M"],
			crunch: ["9M"],
			suckerpunch: ["9M"],
			firefang: ["9M"],
			willowisp: ["9M"],
			pursuit: ["9M"],
		},
	},
	buizel: {
		learnset: {},
	},
	floatzel: {
		learnset: {
			aquajet: ["9M"],
			liquidation: ["9M"],
			flipturn: ["9M"],
			bulkup: ["9M"],
			icepunch: ["9M"],
			raindance: ["9M"],
			surf: ["9M"],
		},
	},
};
