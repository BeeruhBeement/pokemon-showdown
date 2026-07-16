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
		shortDesc: "If held by a Venusaur, this item allows it to Mega Evolve in battle.",
	},
	charizarditeg: {
		name: "Charizardite G",
		spritenum: 586,
		megaStone: { "Charizard": "Charizard-Mega-G" },
		itemUser: ["Charizard"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Charizard, this item allows it to Mega Evolve in battle.",
	},
	blastoisiniteg: {
		name: "Blastoisinite G",
		spritenum: 583,
		megaStone: { "Blastoise": "Blastoise-Mega-G" },
		itemUser: ["Blastoise"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Blastoise, this item allows it to Mega Evolve in battle.",
	},
	butterfrite: {
		name: "Butterfrite",
		megaStone: { "Butterfree": "Butterfree-Mega" },
		itemUser: ["Butterfree"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Butterfree, this item allows it to Mega Evolve in battle.",
	},
	pikachunite: {
		name: "Pikachunite",
		megaStone: { "Pikachu": "Pikachu-Mega" },
		itemUser: ["Pikachu"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Pikachu, this item allows it to Mega Evolve in battle.",
	},
	meowthite: {
		name: "Meowthite",
		megaStone: { "Meowth": "Meowth-Mega" },
		itemUser: ["Meowth"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Meowth, this item allows it to Mega Evolve in battle.",
	},
	machampite: {
		name: "Machampite",
		megaStone: { "Machamp": "Machamp-Mega" },
		itemUser: ["Machamp"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Machamp, this item allows it to Mega Evolve in battle.",
	},
	gengariteg: {
		name: "Gengarite G",
		megaStone: { "Gengar": "Gengar-Mega-G" },
		itemUser: ["Gengar"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Gengar, this item allows it to Mega Evolve in battle.",
	},
	kinglerite: {
		name: "Kinglerite",
		megaStone: { "Kingler": "Kingler-Mega" },
		itemUser: ["Kingler"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Kingler, this item allows it to Mega Evolve in battle.",
	},
	laprasite: {
		name: "Laprasite",
		megaStone: { "Lapras": "Lapras-Mega" },
		itemUser: ["Lapras"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Lapras, this item allows it to Mega Evolve in battle.",
	},
	eeveenite: {
		name: "Eeveenite",
		megaStone: { "Eevee": "Eevee-Mega" },
		itemUser: ["Eevee"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by an Eevee, this item allows it to Mega Evolve in battle.",
	},
	snorlaxite: {
		name: "Snorlaxite",
		megaStone: { "Snorlax": "Snorlax-Mega" },
		itemUser: ["Snorlax"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Snorlax, this item allows it to Mega Evolve in battle.",
	},
	garbodorite: {
		name: "Garbodorite",
		megaStone: { "Garbodor": "Garbodor-Mega" },
		itemUser: ["Garbodor"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Garbodor, this item allows it to Mega Evolve in battle.",
	},
	melmetalite: {
		name: "Melmetalite",
		megaStone: { "Melmetal": "Melmetal-Mega" },
		itemUser: ["Melmetal"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Melmetal, this item allows it to Mega Evolve in battle.",
	},
	rillaboomite: {
		name: "Rillaboomite",
		megaStone: { "Rillaboom": "Rillaboom-Mega" },
		itemUser: ["Rillaboom"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Rillaboom, this item allows it to Mega Evolve in battle.",
	},
	cinderacite: {
		name: "Cinderacite",
		megaStone: { "Cinderace": "Cinderace-Mega" },
		itemUser: ["Cinderace"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Cinderace, this item allows it to Mega Evolve in battle.",
	},
	inteleonite: {
		name: "Inteleonite",
		megaStone: { "Inteleon": "Inteleon-Mega" },
		itemUser: ["Inteleon"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by an Inteleon, this item allows it to Mega Evolve in battle.",
	},
	corviknite: {
		name: "Corviknite",
		megaStone: { "Corviknight": "Corviknight-Mega" },
		itemUser: ["Corviknight"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Corviknight, this item allows it to Mega Evolve in battle.",
	},
	orbeetlite: {
		name: "Orbeetlite",
		megaStone: { "Orbeetle": "Orbeetle-Mega" },
		itemUser: ["Orbeetle"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by an Orbeetle, this item allows it to Mega Evolve in battle.",
	},
	drednawite: {
		name: "Drednawite",
		megaStone: { "Drednaw": "Drednaw-Mega" },
		itemUser: ["Drednaw"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Drednaw, this item allows it to Mega Evolve in battle.",
	},
	coalossalite: {
		name: "Coalossalite",
		megaStone: { "Coalossal": "Coalossal-Mega" },
		itemUser: ["Coalossal"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Coalossal, this item allows it to Mega Evolve in battle.",
	},
	flapplite: {
		name: "Flapplite",
		megaStone: { "Flapple": "Flapple-Mega" },
		itemUser: ["Flapple"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Flapple, this item allows it to Mega Evolve in battle.",
	},
	appletunite: {
		name: "Appletunite",
		megaStone: { "Appletun": "Appletun-Mega" },
		itemUser: ["Appletun"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by an Appletun, this item allows it to Mega Evolve in battle.",
	},
	sandacondite: {
		name: "Sandacondite",
		megaStone: { "Sandaconda": "Sandaconda-Mega" },
		itemUser: ["Sandaconda"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Sandaconda, this item allows it to Mega Evolve in battle.",
	},
	toxtricitite: {
		name: "Toxtricitite",
		megaStone: {
			"Toxtricity": "Toxtricity-Mega",
			"Toxtricity-Low-Key": "Toxtricity-Mega",
		},
		itemUser: ["Toxtricity"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Toxtricity, this item allows it to Mega Evolve in battle.",
	},
	centiskorchite: {
		name: "Centiskorchite",
		megaStone: { "Centiskorch": "Centiskorch-Mega" },
		itemUser: ["Centiskorch"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Centiskorch, this item allows it to Mega Evolve in battle.",
	},
	hatterenite: {
		name: "Hatterenite",
		megaStone: { "Hatterene": "Hatterene-Mega" },
		itemUser: ["Hatterene"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Hatterene, this item allows it to Mega Evolve in battle.",
	},
	grimmsnarite: {
		name: "Grimmsnarite",
		megaStone: { "Grimmsnarl": "Grimmsnarl-Mega" },
		itemUser: ["Grimmsnarl"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Grimmsnarl, this item allows it to Mega Evolve in battle.",
	},
	alcremite: {
		name: "Alcremite",
		megaStone: { "Alcremie": "Alcremie-Mega" },
		itemUser: ["Alcremie"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by an Alcremie, this item allows it to Mega Evolve in battle.",
	},
	copperajite: {
		name: "Copperajite",
		megaStone: { "Copperajah": "Copperajah-Mega" },
		itemUser: ["Copperajah"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Copperajah, this item allows it to Mega Evolve in battle.",
	},
	duraludonite: {
		name: "Duraludonite",
		megaStone: { "Duraludon": "Duraludon-Mega" },
		itemUser: ["Duraludon"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Duraludon, this item allows it to Mega Evolve in battle.",
	},
	wickedurshifite: {
		name: "Wicked Urshifite",
		megaStone: { "Urshifu": "Urshifu-Mega" },
		itemUser: ["Urshifu"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by an Urshifu, this item allows it to Mega Evolve in battle.",
	},
	surgingurshifite: {
		name: "Surging Urshifite",
		megaStone: { "Urshifu": "Urshifu-Rapid-Strike-Mega" },
		itemUser: ["Urshifu-Rapid-Strike"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by an Urshifu-Rapid-Strike, this item allows it to Mega Evolve in battle.",
	},
	leek: {
		inherit: true,
		onModifyCritRatio(critRatio, user) {},
		megaStone: { "Meloetta": "Meloetta-Mega" },
		itemUser: ["Meloetta"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by an Meloetta, this item allows it to Mega Evolve in battle.",
		num: 259,
		gen: 9,
		isNonstandard: null,
	},
	absolutedrive: {
		inherit: true,
		onModifyCritRatio(critRatio, user) {},
		megaStone: { "Genesect": "Genesect-Mega" },
		itemUser: ["Genesect"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by an Genesect, this item allows it to Mega Evolve in battle.",
		num: 259,
		gen: 9,
		isNonstandard: null,
	},
	
	arbokite: {
		name: "Arbokite",
		megaStone: { "Arbok": "Arbok-Mega" },
		itemUser: ["Arbok"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by an Arbok, this item allows it to Mega Evolve in battle.",
	},
	nidoqueenite: {
		name: "Nidoqueenite",
		megaStone: { "Nidoqueen": "Nidoqueen-Mega" },
		itemUser: ["Nidoqueen"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Nidoqueen, this item allows it to Mega Evolve in battle.",
	},
	nidokingite: {
		name: "Nidokingite",
		megaStone: { "Nidoking": "Nidoking-Mega" },
		itemUser: ["Nidoking"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Nidoking, this item allows it to Mega Evolve in battle.",
	},
	arcanite: {
		name: "Arcanite",
		megaStone: { "Arcanine": "Arcanine-Mega" },
		itemUser: ["Arcanine"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by an Arcanine, this item allows it to Mega Evolve in battle.",
	},
	dittonite: {
		name: "Dittonite",
		megaStone: { "Ditto": "Ditto-Mega" },
		itemUser: ["Ditto"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Ditto, this item allows it to Mega Evolve in battle.",
	},
	sunflorite: {
		name: "Sunflorite",
		megaStone: { "Sunflora": "Sunflora-Mega" },
		itemUser: ["Sunflora"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Sunflora, this item allows it to Mega Evolve in battle.",
	},
	slowkingite: {
		name: "Slowkingite",
		megaStone: { "Slowking": "Slowking-Mega" },
		itemUser: ["Slowking"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Slowking, this item allows it to Mega Evolve in battle.",
	},
	kingdranite: {
		name: "Kingdranite",
		megaStone: { "Kingdra": "Kingdra-Mega" },
		itemUser: ["Kingdra"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Kingdra, this item allows it to Mega Evolve in battle.",
	},
	grumpigite: {
		name: "Grumpigite",
		megaStone: { "Grumpig": "Grumpig-Mega" },
		itemUser: ["Grumpig"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Grumpig, this item allows it to Mega Evolve in battle.",
	},
	flygonite: {
		name: "Flygonite",
		megaStone: { "Flygon": "Flygon-Mega" },
		itemUser: ["Flygon"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Flygon, this item allows it to Mega Evolve in battle.",
	},
	armaldonite: {
		name: "Armaldonite",
		megaStone: { "Armaldo": "Armaldo-Mega" },
		itemUser: ["Armaldo"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by an Armaldo, this item allows it to Mega Evolve in battle.",
	},
	kecleonite: {
		name: "Kecleonite",
		megaStone: { "Kecleon": "Kecleon-Mega" },
		itemUser: ["Kecleon"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Kecleon, this item allows it to Mega Evolve in battle.",
	},
	luvdiscite: {
		name: "Luvdiscite",
		megaStone: { "Luvdisc": "Luvdisc-Mega" },
		itemUser: ["Luvdisc"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Luvdisc, this item allows it to Mega Evolve in battle.",
	},
	jirachite: {
		name: "Jirachite",
		megaStone: { "Jirachi": "Jirachi-Mega" },
		itemUser: ["Jirachi"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Jirachi, this item allows it to Mega Evolve in battle.",
	},
	drapionite: {
		name: "Drapionite",
		megaStone: { "Drapion": "Drapion-Mega" },
		itemUser: ["Drapion"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Drapion, this item allows it to Mega Evolve in battle.",
	},
	simisagite: {
		name: "Simisagite",
		megaStone: { "Simisage": "Simisage-Mega" },
		itemUser: ["Simisage"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Simisage, this item allows it to Mega Evolve in battle.",
	},
	simisearite: {
		name: "Simisearite",
		megaStone: { "Simisear": "Simisear-Mega" },
		itemUser: ["Simisear"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Simisear, this item allows it to Mega Evolve in battle.",
	},
	simipourite: {
		name: "Simipourite",
		megaStone: { "Simipour": "Simipour-Mega" },
		itemUser: ["Simipour"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Simipour, this item allows it to Mega Evolve in battle.",
	},
	musharnite: {
		name: "Musharnite",
		megaStone: { "Musharna": "Musharna-Mega" },
		itemUser: ["Musharna"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Musharna, this item allows it to Mega Evolve in battle.",
	},
	vanilluxite: {
		name: "Vanilluxite",
		megaStone: { "Vanilluxe": "Vanilluxe-Mega" },
		itemUser: ["Vanilluxe"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Vanilluxe, this item allows it to Mega Evolve in battle.",
	},
	orangurite: {
		name: "Orangurite",
		megaStone: { "Oranguru": "Oranguru-Mega" },
		itemUser: ["Oranguru"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Oranguru, this item allows it to Mega Evolve in battle.",
	},
	passimianite: {
		name: "Passimianite",
		megaStone: { "Passimian": "Passimian-Mega" },
		itemUser: ["Passimian"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Passimian, this item allows it to Mega Evolve in battle.",
	},
	boltundite: {
		name: "Boltundite",
		megaStone: { "Boltund": "Boltund-Mega" },
		itemUser: ["Boltund"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Boltund, this item allows it to Mega Evolve in battle.",
	},
	spidopsite: {
		name: "Spidopsite",
		megaStone: { "Spidops": "Spidops-Mega" },
		itemUser: ["Spidops"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Spidops, this item allows it to Mega Evolve in battle.",
	},
	dachsbunite: {
		name: "Dachsbunite",
		megaStone: { "Dachsbun": "Dachsbun-Mega" },
		itemUser: ["Dachsbun"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Dachsbun, this item allows it to Mega Evolve in battle.",
	},
	arbolivite: {
		name: "Arbolivite",
		megaStone: { "Arboliva": "Arboliva-Mega" },
		itemUser: ["Arboliva"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Arboliva, this item allows it to Mega Evolve in battle.",
	},
	squawkabillite: {
		name: "Squawkabillite",
		megaStone: { "Squawkabilly": "Squawkabilly-Mega" },
		itemUser: ["Squawkabilly"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by a Squawkabilly, this item allows it to Mega Evolve in battle.",
	},
	ampharosizez: {
		name: "Ampharosite Z",
		megaStone: { "Ampharos": "Ampharos-Mega-Z" },
		itemUser: ["Ampharos"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		shortDesc: "If held by an Ampharos, this item allows it to Mega Evolve in battle.",
	},
};
