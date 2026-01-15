import { ModdedItemData } from "../../../sim/dex-items";

export const Items: {[k: string]: ModdedItemData} = {
	clefablite: {
		inherit: true,
		isNonstandard: null,
	},
	victreebelite: {
		inherit: true,
		isNonstandard: null,
	},
	starminite: {
		inherit: true,
		isNonstandard: null,
	},
	dragoninite: {
		inherit: true,
		isNonstandard: null,
	},
	meganiumite: {
		inherit: true,
		isNonstandard: null,
	},
	feraligite: {
		inherit: true,
		isNonstandard: null,
	},
	skarmorite: {
		inherit: true,
		isNonstandard: null,
	},
	froslassite: {
		inherit: true,
		isNonstandard: null,
	},
	emboarite: {
		inherit: true,
		isNonstandard: null,
	},
	excadrite: {
		inherit: true,
		isNonstandard: null,
	},
	scolipite: {
		inherit: true,
		isNonstandard: null,
	},
	scraftinite: {
		inherit: true,
		isNonstandard: null,
	},
	eelektrossite: {
		inherit: true,
		isNonstandard: null,
	},
	chandelurite: {
		inherit: true,
		isNonstandard: null,
	},
	chesnaughtite: {
		inherit: true,
		isNonstandard: null,
	},
	delphoxite: {
		inherit: true,
		isNonstandard: null,
	},
	greninjite: {
		inherit: true,
		isNonstandard: null,
	},
	pyroarite: {
		inherit: true,
		isNonstandard: null,
	},
	floettite: {
		inherit: true,
		isNonstandard: null,
	},
	malamarite: {
		inherit: true,
		isNonstandard: null,
	},
	barbaracite: {
		inherit: true,
		isNonstandard: null,
	},
	dragalgite: {
		inherit: true,
		isNonstandard: null,
	},
	hawluchanite: {
		inherit: true,
		isNonstandard: null,
	},
	zygardite: {
		inherit: true,
		isNonstandard: null,
	},
	drampanite: {
		inherit: true,
		isNonstandard: null,
	},
	falinksite: {
		inherit: true,
		isNonstandard: null,
	},
	raichunitex: {
		inherit: true,
		isNonstandard: null,
	},
	raichunitey: {
		inherit: true,
		isNonstandard: null,
	},
	chimechite: {
		inherit: true,
		isNonstandard: null,
	},
	lucarionitez: {
		inherit: true,
		isNonstandard: null,
	},
	zeraorite: {
		inherit: true,
		isNonstandard: null,
	},
	baxcalibrite: {
		inherit: true,
		isNonstandard: null,
	},
	absolitez: {
		inherit: true,
		isNonstandard: null,
	},
	staraptite: {
		inherit: true,
		isNonstandard: null,
	},
	garchompitez: {
		inherit: true,
		isNonstandard: null,
	},
	heatranite: {
		inherit: true,
		isNonstandard: null,
	},
	darkranite: {
		inherit: true,
		isNonstandard: null,
	},
	golurkite: {
		inherit: true,
		isNonstandard: null,
	},
	meowsticite: {
		inherit: true,
		isNonstandard: null,
	},
	crabominite: {
		inherit: true,
		isNonstandard: null,
	},
	golisopite: {
		inherit: true,
		isNonstandard: null,
	},
	magearnite: {
		inherit: true,
		isNonstandard: null,
	},
	tatsugirinite: {
		inherit: true,
		isNonstandard: null,
	},
	glimmoranite: {
		inherit: true,
		isNonstandard: null,
	},
	scovillainite: {
		inherit: true,
		isNonstandard: null,
	},
	venusauriteg: {
		name: "Venusaurite G",
		spritenum: 608,
		megaStone: { "Venusaur": "Venusaur-Mega-G" },
		itemUser: ["Venusaur"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
	},
	charizarditeg: {
		name: "Charizardite G",
		spritenum: 586,
		megaStone: { "Charizard": "Charizard-Mega-G" },
		itemUser: ["Charizard"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
	},
	blastoisiniteg: {
		name: "Blastoisinite G",
		spritenum: 583,
		megaStone: { "Blastoise": "Blastoise-Mega-G" },
		itemUser: ["Blastoise"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
	},
	butterfrite: {
		name: "Butterfrite",
		megaStone: { "Butterfree": "Butterfree-Mega" },
		itemUser: ["Butterfree"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	pikachunite: {
		name: "Pikachunite",
		megaStone: { "Pikachu": "Pikachu-Mega" },
		itemUser: ["Pikachu"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	meowthite: {
		name: "Meowthite",
		megaStone: { "Meowth": "Meowth-Mega" },
		itemUser: ["Meowth"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	machampite: {
		name: "Machampite",
		megaStone: { "Machamp": "Machamp-Mega" },
		itemUser: ["Machamp"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	gengariteg: {
		name: "Gengarite G",
		megaStone: { "Gengar": "Gengar-Mega-G" },
		itemUser: ["Gengar"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	kinglerite: {
		name: "Kinglerite",
		megaStone: { "Kingler": "Kingler-Mega" },
		itemUser: ["Kingler"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	laprasite: {
		name: "Laprasite",
		megaStone: { "Lapras": "Lapras-Mega" },
		itemUser: ["Lapras"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	eeveenite: {
		name: "Eeveenite",
		megaStone: { "Eevee": "Eevee-Mega" },
		itemUser: ["Eevee"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	snorlaxite: {
		name: "Snorlaxite",
		megaStone: { "Snorlax": "Snorlax-Mega" },
		itemUser: ["Snorlax"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	garbodorite: {
		name: "Garbodorite",
		megaStone: { "Garbodor": "Garbodor-Mega" },
		itemUser: ["Garbodor"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	melmetalite: {
		name: "Melmetalite",
		megaStone: { "Melmetal": "Melmetal-Mega" },
		itemUser: ["Melmetal"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	rillaboomite: {
		name: "Rillaboomite",
		megaStone: { "Rillaboom": "Rillaboom-Mega" },
		itemUser: ["Rillaboom"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	cinderacite: {
		name: "Cinderacite",
		megaStone: { "Cinderace": "Cinderace-Mega" },
		itemUser: ["Cinderace"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	inteleonite: {
		name: "Inteleonite",
		megaStone: { "Inteleon": "Inteleon-Mega" },
		itemUser: ["Inteleon"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	corviknite: {
		name: "Corviknite",
		megaStone: { "Corviknight": "Corviknight-Mega" },
		itemUser: ["Corviknight"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	orbeetlite: {
		name: "Orbeetlite",
		megaStone: { "Orbeetle": "Orbeetle-Mega" },
		itemUser: ["Orbeetle"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	drednawite: {
		name: "Drednawite",
		megaStone: { "Drednaw": "Drednaw-Mega" },
		itemUser: ["Drednaw"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	coalossalite: {
		name: "Coalossalite",
		megaStone: { "Coalossal": "Coalossal-Mega" },
		itemUser: ["Coalossal"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	flapplite: {
		name: "Flapplite",
		megaStone: { "Flapple": "Flapple-Mega" },
		itemUser: ["Flapple"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	appletunite: {
		name: "Appletunite",
		megaStone: { "Appletun": "Appletun-Mega" },
		itemUser: ["Appletun"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	sandacondite: {
		name: "Sandacondite",
		megaStone: { "Sandaconda": "Sandaconda-Mega" },
		itemUser: ["Sandaconda"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	toxtricitite: {
		name: "Toxtricitite",
		megaStone: { "Toxtricity": "Toxtricity-Mega" },
		itemUser: ["Toxtricity"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	centiskorchite: {
		name: "Centiskorchite",
		megaStone: { "Centiskorch": "Centiskorch-Mega" },
		itemUser: ["Centiskorch"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	hatterenite: {
		name: "Hatterenite",
		megaStone: { "Hatterene": "Hatterene-Mega" },
		itemUser: ["Hatterene"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	grimmsnarite: {
		name: "Grimmsnarite",
		megaStone: { "Grimmsnarl": "Grimmsnarl-Mega" },
		itemUser: ["Grimmsnarl"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	alcremite: {
		name: "Alcremite",
		megaStone: { "Alcremie": "Alcremie-Mega" },
		itemUser: ["Alcremie"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	copperajite: {
		name: "Copperajite",
		megaStone: { "Copperajah": "Copperajah-Mega" },
		itemUser: ["Copperajah"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	duraludonite: {
		name: "Duraludonite",
		megaStone: { "Duraludon": "Duraludon-Mega" },
		itemUser: ["Duraludon"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	wickedurshifite: {
		name: "Wicked Urshifite",
		megaStone: { "Urshifu": "Urshifu-Mega" },
		itemUser: ["Urshifu"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
	surgingurshifite: {
		name: "Surging Urshifite",
		megaStone: { "Urshifu-Rapid-Strike": "Urshifu-Rapid-Strike-Mega" },
		itemUser: ["Urshifu-Rapid-Strike"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		}
	},
};
