import { ModdedSpeciesData } from "../../../sim/dex-species";

export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	charmander: {
		inherit: true,
		abilities: {0: "Blaze", 1: "Solar Power"},
	},
	charmeleon: {
		inherit: true,
		abilities: {0: "Blaze", 1: "Solar Power"},
	},
	charizard: {
		inherit: true,
		abilities: {0: "Blaze", 1: "Solar Power"},
	},
	squrtile: {
		inherit: true,
		abilities: {0: "Torrent", 1: "Skill Link"},
	},
	wartortle: {
		inherit: true,
		abilities: {0: "Torrent", 1: "Skill Link"},
	},
	blastoise: {
		inherit: true,
		types: ["Water", "Steel"],
		abilities: {0: "Torrent", 1: "Skill Link"},
	},
	caterpie: {
		inherit: true,
	},
	metapod: {
		inherit: true,
	},
	butterfree: {
		inherit: true,
		baseStats: {hp: 60, atk: 45, def: 60, spa: 90, spd: 80, spe: 80},
		abilities: {0: "Compound Eyes", 1: "Heart Veil"},
	},
	weedle: {
		inherit: true,
	},
	kakuna: {
		inherit: true,
	},
	beedrill: {
		inherit: true,
		baseStats: {hp: 65, atk: 90, def: 40, spa: 45, spd: 80, spe: 95},
		abilities: {0: "Swarm", 1: "Vanguard"},
	},
	pidgey: {
		inherit: true,
	},
	pidgeotto: {
		inherit: true,
	},
	pidgeot: {
		inherit: true,
		baseStats: {hp: 83, atk: 80, def: 75, spa: 70, spd: 70, spe: 101},
	},
	rattata: {
		inherit: true,
		abilities: {0: "Strong Jaw", 1: "Guts"},
	},
	rattataalola: {
		inherit: true,
		gen: 3,
		abilities: {0: "Strong Jaw", 1: "Thick Fat"},
	},
	raticate: {
		inherit: true,
		abilities: {0: "Strong Jaw", 1: "Guts"},
	},
	raticatealola: {
		inherit: true,
		gen: 3,
		abilities: {0: "Strong Jaw", 1: "Thick Fat"},
	},
	spearow: {
		inherit: true,
	},
	fearow: {
		inherit: true,
		baseStats: {hp: 75, atk: 100, def: 65, spa: 61, spd: 61, spe: 100},
		abilities: {0: "Piercing"},
	},
	ekans: {
		inherit: true,
	},
	arbok: {
		inherit: true,
		baseStats: {hp: 60, atk: 95, def: 69, spa: 65, spd: 79, spe: 80},
	},
	pichu: {
		inherit: true,
	},
	pikachu: {
		inherit: true,
		baseStats: {hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90},
	},
	pikachucosplay: {
		inherit: true,
		gen: 3,
		abilities: {0: "Static"},
	},
	pikachurockstar: {
		inherit: true,
		gen: 3,
		abilities: {0: "Static"},
	},
	pikachubelle: {
		inherit: true,
		gen: 3,
		abilities: {0: "Static"},
	},
	pikachupopstar: {
		inherit: true,
		gen: 3,
		abilities: {0: "Static"},
	},
	pikachuphd: {
		inherit: true,
		gen: 3,
		abilities: {0: "Static"},
	},
	pikachulibre: {
		inherit: true,
		gen: 3,
		abilities: {0: "Static"},
	},
	raichu: {
		inherit: true,
		baseStats: {hp: 50, atk: 80, def: 55, spa: 80, spd: 60, spe: 100},
	},
	raichualola: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 50, atk: 75, def: 50, spa: 85, spd: 65, spe: 100},
		abilities: {0: "Static"},
	},
	sandshrew: {
		inherit: true,
		abilities: {0: "Sand Rush", 1: "Rough Skin"},
	},
	sandshrewalola: {
		inherit: true,
		gen: 3,
		abilities: {0: "Slush Rush", 1: "Rough Skin"},
	},
	sandslash: {
		inherit: true,
		abilities: {0: "Sand Rush", 1: "Rough Skin"},
	},
	sandslashalola: {
		inherit: true,
		gen: 3,
		abilities: {0: "Slush Rush", 1: "Rough Skin"},
	},
	nidoranf: {
		inherit: true,
	},
	nidorina: {
		inherit: true,
	},
	nidoqueen: {
		inherit: true,
		baseStats: {hp: 90, atk: 92, def: 87, spa: 75, spd: 85, spe: 76},
	},
	nidoranm: {
		inherit: true,
	},
	nidorino: {
		inherit: true,
	},
	nidoking: {
		inherit: true,
		baseStats: {hp: 81, atk: 102, def: 77, spa: 85, spd: 75, spe: 85},
	},
	cleffa: {
		inherit: true,
		types: ["Fairy"],
	},
	clefairy: {
		inherit: true,
		types: ["Fairy"],
	},
	clefable: {
		inherit: true,
		types: ["Fairy"],
		baseStats: {hp: 95, atk: 70, def: 73, spa: 95, spd: 90, spe: 60},
	},
	igglybuff: {
		inherit: true,
		types: ["Sound", "Fairy"],
	},
	jigglypuff: {
		inherit: true,
		types: ["Sound", "Fairy"],
	},
	wigglytuff: {
		inherit: true,
		types: ["Sound", "Fairy"],
		baseStats: {hp: 140, atk: 70, def: 55, spa: 85, spd: 60, spe: 45},
	},
	vulpix: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Solar Power"},
	},
	vulpixalola: {
		inherit: true,
		gen: 3,
		abilities: {0: "Snow Cloak", 1: "Snow Warning"},
	},
	ninetales: {
		inherit: true,
		types: ["Fire", "Fairy"],
		abilities: {0: "Flash Fire", 1: "Drought"},
	},
	ninetalesalola: {
		inherit: true,
		gen: 3,
		abilities: {0: "Snow Cloak", 1: "Snow Warning"},
	},
	zubat: {
		inherit: true,
	},
	golbat: {
		inherit: true,
	},
	crobat: {
		inherit: true,
	},
	oddish: {
		inherit: true,
		abilities: {0: "Effect Spore"},
	},
	gloom: {
		inherit: true,
		abilities: {0: "Effect Spore"},
	},
	vileplume: {
		inherit: true,
		baseStats: {hp: 75, atk: 80, def: 85, spa: 110, spd: 90, spe: 50},
		abilities: {0: "Effect Spore"},
	},
	bellossom: {
		inherit: true,
		baseStats: {hp: 75, atk: 80, def: 95, spa: 90, spd: 100, spe: 50},
	},
	paras: {
		inherit: true,
	},
	parasect: {
		inherit: true,
		types: ["Bug", "Ghost"],
		baseStats: {hp: 60, atk: 95, def: 120, spa: 60, spd: 80, spe: 30},
	},
	parasong: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 60, atk: 95, def: 80, spa: 60, spd: 120, spe: 30},
	},
	venonat: {
		inherit: true,
	},
	venomoth: {
		inherit: true,
	},
	diglett: {
		inherit: true,
	},
	diglettalola: {
		inherit: true,
		gen: 3,
	},
	dugtrio: {
		inherit: true,
		baseStats: {hp: 35, atk: 100, def: 50, spa: 50, spd: 70, spe: 120},
	},
	dugtrioalola: {
		inherit: true,
		gen: 3,
	},
	meowth: {
		inherit: true,
		gen: 3,
	},
	meowthalola: {
		inherit: true,
		gen: 3,
	},
	meowthgalar: {
		inherit: true,
		gen: 3,
	},
	persian: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 65, atk: 85, def: 60, spa: 80, spd: 65, spe: 115},
	},
	persianalola: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 65, atk: 75, def: 60, spa: 90, spd: 65, spe: 115},
	},
	perrserker: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 75, atk: 110, def: 100, spa: 60, spd: 75, spe: 50},
	},
	poliwag: {
		inherit: true,
	},
	poliwhirl: {
		inherit: true,
		gen: 3,
	},
	poliwrath: {
		inherit: true,
		baseStats: {hp: 90, atk: 95, def: 95, spa: 70, spd: 90, spe: 70},
		abilities: {0: "No Guard", 1: "Damp"},
	},
	politoed: {
		inherit: true,
		baseStats: {hp: 90, atk: 75, def: 75, spa: 90, spd: 110, spe: 70},
		types: ["Water", "Sound"],
	},
	geodude: {
		inherit: true,
	},
	geodudealola: {
		inherit: true,
		gen: 3,
	},
	graveler: {
		inherit: true,
	},
	graveleralola: {
		inherit: true,
		gen: 3,
	},
	golem: {
		inherit: true,
		baseStats: {hp: 80, atk: 120, def: 130, spa: 55, spd: 65, spe: 45},
	},
	golemalola: {
		inherit: true,
		gen: 3,
	},
	ponyta: {
		inherit: true,
	},
	ponytagalar: {
		inherit: true,
		gen: 3,
	},
	rapidash: {
		inherit: true,
		baseStats: {hp: 65, atk: 100, def: 70, spa: 80, spd: 80, spe: 115},
	},
	rapidashgalar: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 65, atk: 100, def: 70, spa: 80, spd: 80, spe: 115},
	},
	farfetchd: {
		inherit: true,
		baseStats: {hp: 52, atk: 90, def: 55, spa: 58, spd: 62, spe: 90},
	},
	farfetchdgalar: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 52, atk: 95, def: 55, spa: 58, spd: 62, spe: 55},
		abilities: {0: "Keen Eye", 1: "Inner Focus"},
	},
	sirfetchd: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 62, atk: 125, def: 85, spa: 68, spd: 82, spe: 65},
		abilities: {0: "Keen Eye", 1: "Inner Focus"},
	},
	doduo: {
		inherit: true,
	},
	dodrio: {
		inherit: true,
		baseStats: {hp: 60, atk: 110, def: 70, spa: 60, spd: 60, spe: 110},
	},
	seel: {
		inherit: true,
		abilities: {0: "Thick Fat"},
	},
	dewgong: {
		inherit: true,
		abilities: {0: "Thick Fat"},
	},
	grimer: {
		inherit: true,
	},
	grimeralola: {
		inherit: true,
		gen: 3,
		abilities: {0: "Stench", 1: "Sticky Hold"},
	},
	muk: {
		inherit: true,
	},
	mukalola: {
		inherit: true,
		gen: 3,
		abilities: {0: "Stench", 1: "Sticky Hold"},
	},
	onix: {
		inherit: true,
		baseStats: {hp: 45, atk: 65, def: 160, spa: 30, spd: 45, spe: 70},
	},
	steelix: {
		inherit: true,
	},
	krabby: {
		inherit: true,
	},
	kingler: {
		inherit: true,
	},
	voltorb: {
		inherit: true,
		types: ["Electric", "Sound"],
	},
	voltorbhisui: {
		inherit: true,
		gen: 3,
	},
	electrode: {
		inherit: true,
		types: ["Electric", "Sound"],
		baseStats: {hp: 60, atk: 50, def: 70, spa: 80, spd: 80, spe: 150},
	},
	electrodehisui: {
		inherit: true,
		gen: 3,
	},
	tyrogue: {
		inherit: true,
	},
	hitmonchan: {
		inherit: true,
	},
	hitmonlee: {
		inherit: true,
	},
	hitmontop: {
		inherit: true,
		abilities: {0: "Intimidate"},
	},
	tangela: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Regenerator"},
		baseStats: {hp: 65, atk: 55, def: 115, spa: 100, spd: 40, spe: 60},
	},
	tangrowth: {
		inherit: true,
		gen: 3,
		abilities: {0: "Tangling Hair", 1: "Regenerator"},
		baseStats: {hp: 90, atk: 65, def: 125, spa: 110, spd: 50, spe: 50},
	},
	goldeen: {
		inherit: true,
		abilities: {0: "Lightning Rod", 1: "Water Veil"},
	},
	seaking: {
		inherit: true,
		abilities: {0: "Lightning Rod", 1: "Water Veil"},
	},
	mimejr: {
		inherit: true,
		gen: 3,
		types: ["Psychic", "Fairy"],
		abilities: {0: "Soundproof", 1: "Technician"},
	},
	mrmime: {
		inherit: true,
		types: ["Psychic", "Fairy"],
		abilities: {0: "Soundproof", 1: "Technician"},
	},
	smoochum: {
		inherit: true,
		abilities: {0: "Oblivious", 1: "Hydration"},
	},
	jynx: {
		inherit: true,
		abilities: {0: "Oblivious", 1: "Dry Skin"},
	},
	kisscope: {
		inherit: true,
		gen: 3,
		abilities: {0: "Sniper", 1: "Dry Skin"},
	},
	magby: {
		inherit: true,
	},
	magmar: {
		inherit: true,
	},
	magmortar: {
		inherit: true,
		gen: 3,
	},
	elekid: {
		inherit: true,
	},
	electabuzz: {
		inherit: true,
	},
	electivire: {
		inherit: true,
		gen: 3,
		types: ["Electric", "Fighting"],
	},
	pinsir: {
		inherit: true,
		abilities: {0: "Hyper Cutter", 1: "Chrysalis"},
	},
	tauros: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Adrenaline"},
	},
	taurospaldeacombat: {
		inherit: true,
		gen: 3,
	},
	taurospaldeablaze: {
		inherit: true,
		gen: 3,
		abilities: {0: "Intimidate", 1: "Flame Body"},
	},
	taurospaldeaaqua: {
		inherit: true,
		gen: 3,
		abilities: {0: "Intimidate", 1: "Swift Swim"},
	},
	magikarp: {
		inherit: true,
	},
	gyarados: {
		inherit: true,
	},
	ditto: {
		inherit: true,
		abilities: {0: "Imposter"},
	},
	aerodactyl: {
		inherit: true,
	},
	munchlax: {
		inherit: true,
		gen: 3,
	},
	snorlax: {
		inherit: true,
	},
	chikorita: {
		inherit: true,
		abilities: {0: "Overgrow", 1: "Regenerator"},
	},
	bayleef: {
		inherit: true,
		abilities: {0: "Overgrow", 1: "Regenerator"},
	},
	meganium: {
		inherit: true,
		abilities: {0: "Overgrow", 1: "Regenerator"},
	},
	cyndaquill: {
		inherit: true,
		abilities: {0: "Blaze", 1: "Flash Fire"},
	},
	quilava: {
		inherit: true,
		types: ["Fire", "Ground"],
		abilities: {0: "Blaze", 1: "Flash Fire"},
	},
	typhlosion: {
		inherit: true,
		types: ["Fire", "Ground"],
		abilities: {0: "Blaze", 1: "Flash Fire"},
	},
	sentret: {
		inherit: true,
	},
	furret: {
		inherit: true,
	},
	hoothoot: {
		inherit: true,
		types: ["Ghost", "Flying"],
		abilities: {0: "Insomnia", 1: "Tinted Lens"},
	},
	noctowl: {
		inherit: true,
		types: ["Ghost", "Flying"],
		baseStats: {hp: 100, atk: 50, def: 50, spa: 86, spd: 96, spe: 70},
		abilities: {0: "Insomnia", 1: "Tinted Lens"},
	},
	ledyba: {
		inherit: true,
	},
	ledian: {
		inherit: true,
		types: ["Bug", "Fighting"],
		baseStats: {hp: 55, atk: 75, def: 50, spa: 55, spd: 110, spe: 85},
		abilities: {0: "Superhero", 1: "Iron Fist"},
	},
	chinchou: {
		inherit: true,
	},
	lanturn: {
		inherit: true,
	},
	togepi: {
		inherit: true,
		types: ["Fairy"],
	},
	togetic: {
		inherit: true,
		types: ["Fairy", "Flying"],
	},
	azurill: {
		inherit: true,
		types: ["Normal", "Fairy"],
	},
	marill: {
		inherit: true,
		types: ["Water", "Fairy"],
	},
	azumarill: {
		inherit: true,
		types: ["Water", "Fairy"],
	},
	bonsly: {
		inherit: true,
		gen: 3,
	},
	sudowoodo: {
		inherit: true,
	},
	yanma: {
		inherit: true,
	},
	yanmega: {
		inherit: true,
		gen: 3,
		types: ["Bug", "Dragon"],
		abilities: {0: "Speed Boost", 1: "Compound Eyes"},
	},
	murkrow: {
		inherit: true,
		abilities: {0: "Insomnia", 1: "Technician"},
	},
	honchkrow: {
		inherit: true,
		gen: 3,
		abilities: {0: "Thick Fat", 1: "Executioner"},
	},
	misdreavus: {
		inherit: true,
		types: ["Ghost", "Fairy"],
	},
	mismagius: {
		inherit: true,
		gen: 3,
		types: ["Ghost", "Fairy"],
	},
	snubbull: {
		inherit: true,
		types: ["Fairy"],
	},
	granbull: {
		inherit: true,
		types: ["Fairy"],
	},
	qwilfish: {
		inherit: true,
		baseStats: {hp: 65, atk: 95, def: 85, spa: 55, spd: 55, spe: 85},
	},
	qwilfishhisui: {
		inherit: true,
		gen: 3,
	},
	overqwil: {
		inherit: true,
		gen: 3,
	},
	sneasel: {
		inherit: true,
	},
	teddiursa: {
		inherit: true,
		abilities: {0: "Guts", 1: "Miracle Guard"},
	},
	ursaring: {
		inherit: true,
		types: ["Ground", "Normal"],
		abilities: {0: "Guts", 1: "Miracle Guard"},
	},
	ursaluna: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 110, atk: 140, def: 95, spa: 75, spd: 80, spe: 50},
		abilities: {0: "Guts", 1: "Miracle Guard"},
	},
	ursalunabloodmoon: {
		inherit: true,
		gen: 3,
		types: ["Ground", "Sound"],
		abilities: {0: "Miracle Guard"}
	},
	slugma: {
		inherit: true,
		gen: 3,
		abilities: {0: "Weak Armor", 1: "Flame Body"},
	},
	magcargo: {
		inherit: true,
		abilities: {0: "Weak Armor", 1: "Flame Body"},
		baseStats: {hp: 60, atk: 70, def: 120, spa: 90, spd: 80, spe: 30},
	},
	swinub: {
		inherit: true,
		abilities: {0: "Oblivious", 1: "Thick Fat"},
	},
	piloswine: {
		inherit: true,
		abilities: {0: "Oblivious", 1: "Thick Fat"},
	},
	mamoswine: {
		inherit: true,
		gen: 3,
		abilities: {0: "Oblivious", 1: "Thick Fat"},
		baseStats: {hp: 100, atk: 120, def: 80, spa: 70, spd: 60, spe: 80},
	},
	remoraid: {
		inherit: true,
	},
	octillery: {
		inherit: true,
		baseStats: {hp: 75, atk: 105, def: 85, spa: 105, spd: 85, spe: 25},
	},
	mantyke: {
		inherit: true,
		gen: 3,
	},
	mantine: {
		inherit: true,
		baseStats: {hp: 85, atk: 40, def: 70, spa: 80, spd: 140, spe: 70},
	},
	stantler: {
		inherit: true,
		types: ["Normal", "Ice"],
		abilities: {0: "Intimidate", 1: "Sap Sipper"},
	},
	wyrdeer: {
		inherit: true,
		gen: 3,
		types: ["Psychic", "Ice"],
		abilities: {0: "Intimidate", 1: "Sap Sipper"},
	},
	smeargle: {
		inherit: true,
		abilities: {0: "Trace", 1: "Technician"},
		baseStats: {hp: 55, atk: 30, def: 35, spa: 30, spd: 45, spe: 75},
	},
	raikou: {
		inherit: true,
		abilities: {0: "Galvanize"},
	},
	entei: {
		inherit: true,
		abilities: {0: "Immolate"},
	},
	suicune: {
		inherit: true,
		abilities: {0: "Drench"},
	},
	mudkip: {
		inherit: true,
		abilities: {0: "Torrent", 1: "Regenerator"},
	},
	marshtomp: {
		inherit: true,
		abilities: {0: "Torrent", 1: "Regenerator"},
	},
	swampert: {
		inherit: true,
		abilities: {0: "Torrent", 1: "Regenerator"},
	},
	poochyena: {
		inherit: true,
	},
	mightyena: {
		inherit: true,
		baseStats: {hp: 75, atk: 95, def: 70, spa: 70, spd: 70, spe: 95},
		abilities: {0: "Intimidate", 1: "Strong Jaw"},
	},
	zigzagoon: {
		inherit: true,
		abilities: {0: "Pickup", 1: "Gluttony"},
	},
	zigzagoongalar: {
		inherit: true,
		gen: 3,
		abilities: {0: "Pickup", 1: "Gluttony"},
	},
	linoone: {
		inherit: true,
		abilities: {0: "Reckless", 1: "Gluttony"},
	},
	linoonegalar: {
		inherit: true,
		gen: 3,
		abilities: {0: "Reckless", 1: "Gluttony"},
	},
	obstagoon: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 83, atk: 90, def: 91, spa: 60, spd: 81, spe: 95},
		abilities: {0: "Reckless", 1: "Guts"},
	},
	shiftry: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Wind Rider"},
	},
	wingull: {
		inherit: true,
		abilities: {0: "Keen Eye", 1: "Water Absorb"},
	},
	pelipper: {
		inherit: true,
		abilities: {0: "Keen Eye", 1: "Drizzle"},
	},
	ralts: {
		inherit: true,
		types: ["Psychic", "Fairy"],
	},
	kirlia: {
		inherit: true,
		types: ["Psychic", "Fairy"],
	},
	gardevoir: {
		inherit: true,
		types: ["Psychic", "Fairy"],
	},
	gallade: {
		inherit: true,
		gen: 3,
		abilities: {0: "Inner Focus", 1: "Sharpness"},
	},
	surskit: {
		inherit: true,
	},
	masquerain: {
		inherit: true,
		baseStats: {hp: 70, atk: 60, def: 62, spa: 100, spd: 82, spe: 80},
		types: ["Bug", "Water"],
	},
	nincada: {
		inherit: true,
	},
	ninjask: {
		inherit: true,
	},
	shedinja: {
		inherit: true,
	},
	whismur: {
		inherit: true,
		types: ["Sound"],
	},
	loudred: {
		inherit: true,
		types: ["Sound"],
	},
	exploud: {
		inherit: true,
		types: ["Sound"],
		baseStats: {hp: 104, atk: 91, def: 63, spa: 91, spd: 73, spe: 68},
	},
	skitty: {
		inherit: true,
	},
	delcatty: {
		inherit: true,
		baseStats: {hp: 70, atk: 85, def: 65, spa: 65, spd: 65, spe: 90},
	},
	sableye: {
		inherit: true,
		abilities: {0: "Pixie Veil", 1: "Stall"},
		baseStats: {hp: 80, atk: 65, def: 75, spa: 65, spd: 75, spe: 50},
	},
	mawile: {
		inherit: true,
		types: ["Steel", "Fairy"],
		baseStats: {hp: 60, atk: 85, def: 85, spa: 65, spd: 65, spe: 50},
	},
	aron: {
		inherit: true,
		abilities: {0: "Sturdy", 1: "Rock Head"},
	},
	lairon: {
		inherit: true,
		abilities: {0: "Sturdy", 1: "Rock Head"},
	},
	aggron: {
		inherit: true,
		abilities: {0: "Solid Rock", 1: "Rock Head"},
	},
	electrike: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Lightning Rod"},
	},
	manectric: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Lightning Rod"},
	},
	plusle: {
		inherit: true,
	},
	minun: {
		inherit: true,
	},
	volbeat: {
		inherit: true,
		types: ["Bug", "Electric"],
		baseStats: {hp: 65, atk: 73, def: 75, spa: 67, spd: 85, spe: 85},
	},
	illumise: {
		inherit: true,
		types: ["Bug", "Electric"],
		baseStats: {hp: 65, atk: 67, def: 75, spa: 73, spd: 85, spe: 85},
	},
	gulpin: {
		inherit: true,
	},
	swalot: {
		inherit: true,
	},
	numel: {
		inherit: true,
	},
	camerupt: {
		inherit: true,
		baseStats: {hp: 90, atk: 100, def: 70, spa: 105, spd: 75, spe: 40},
	},
	cacnea: {
		inherit: true,
		abilities: {0: "Sand Veil", 1: "Sand Rush"},
	},
	carvanha: {
		inherit: true,
		abilities: {0: "Rough Skin", 1: "Speed Boost"},
	},
	sharpedo: {
		inherit: true,
		abilities: {0: "Rough Skin", 1: "Speed Boost"},
	},
	cacturne: {
		inherit: true,
		abilities: {0: "Quick Draw", 1: "Sand Rush"},
	},
	zangoose: {
		inherit: true,
		abilities: {0: "Toxic Boost"},
	},
	seviper: {
		inherit: true,
		baseStats: {hp: 73, atk: 100, def: 60, spa: 100, spd: 60, spe: 85},
		abilities: {0: "Merciless"},
	},
	lunatone: {
		inherit: true,
		types: ["Rock", "Ghost"],
		baseStats: {hp: 90, atk: 55, def: 65, spa: 95, spd: 85, spe: 70},
		abilities: {0: "Levitate", 1: "Moonrise"},
	},
	solrock: {
		inherit: true,
		types: ["Rock", "Fire"],
		baseStats: {hp: 90, atk: 95, def: 85, spa: 55, spd: 65, spe: 70},
		abilities: {0: "Levitate", 1: "Drought"},
	},
	corphish: {
		inherit: true,
	},
	crawdaunt: {
		inherit: true,
		abilities: {0: "Hyper Cutter", 1: "Adrenaline"},
	},
	castform: {
		inherit: true,
		baseStats: {hp: 90, atk: 70, def: 70, spa: 70, spd: 70, spe: 90},
		otherFormes: ["Castform-Sunny", "Castform-Rainy", "Castform-Snowy", "Castform-Sandy"],
		formeOrder: ["Castform", "Castform-Sunny", "Castform-Rainy", "Castform-Snowy", "Castform-Sandy"],
	},
	castformsunny: {
		inherit: true,
		baseStats: {hp: 90, atk: 70, def: 70, spa: 100, spd: 70, spe: 90},
	},
	castformrainy: {
		inherit: true,
		baseStats: {hp: 90, atk: 70, def: 70, spa: 70, spd: 100, spe: 90},
	},
	castformsnowy: {
		inherit: true,
		baseStats: {hp: 90, atk: 70, def: 100, spa: 70, spd: 70, spe: 90},
	},
	castformsandy: {
		inherit: true,
		baseStats: {hp: 90, atk: 100, def: 70, spa: 70, spd: 70, spe: 90},
	},
	kecleon: {
		inherit: true,
		abilities: {0: "Color Change", 1: "Protean"},
		baseStats: {hp: 60, atk: 80, def: 70, spa: 80, spd: 120, spe: 40},
	},
	shuppet: {
		inherit: true,
		types: ["Ghost", "Normal"],
		abilities: {0: "Insomnia", 1: "Aftermath"},
	},
	banette: {
		inherit: true,
		types: ["Ghost", "Normal"],
		abilities: {0: "Insomnia", 1: "Aftermath"},
		baseStats: {hp: 64, atk: 115, def: 65, spa: 85, spd: 63, spe: 73},
	},
	chingling: {
		inherit: true,
		gen: 3,
		types: ["Psychic", "Sound"],
		abilities: {0: "Levitate", 1: "Soundproof"},
	},
	chimecho: {
		inherit: true,
		types: ["Psychic", "Sound"],
		abilities: {0: "Levitate", 1: "Soundproof"},
		baseStats: {hp: 75, atk: 50, def: 80, spa: 95, spd: 90, spe: 65},
	},
	absol: {
		inherit: true,
		types: ["Dark", "Fairy"],
		abilities: {0: "Jinxed"},
	},
	snorunt: {
		inherit: true,
		abilities: {0: "Inner Focus", 1: "Ice Body"},
	},
	glalie: {
		inherit: true,
		types: ["Ice", "Dark"],
		gender: "M",
		baseStats: {hp: 90, atk: 70, def: 90, spa: 70, spd: 90, spe: 70},
		abilities: {0: "Inner Focus", 1: "Solid Rock"},
		evoType: "useItem",
		evoItem: "Dusk Stone",
	},
	froslass: {
		inherit: true,
		gen: 3,
		abilities: {0: "Inner Focus", 1: "Snow Cloak"},
	},
	clamperl: {
		inherit: true,
		baseStats: {hp: 45, atk: 64, def: 85, spa: 74, spd: 55, spe: 32},
	},
	huntail: {
		inherit: true,
		abilities: {0: "Strong Jaw"},
	},
	gorebyss: {
		inherit: true,
	},
	luvdisc: {
		inherit: true,
		types: ["Water", "Fairy"],
		baseStats: {hp: 73, atk: 50, def: 65, spa: 70, spd: 85, spe: 97},
		abilities: {0: "Swift Swim", 1: "Heart Veil"},
	},
	cranidos: {
		inherit: true,
		gen: 3,
		abilities: {0: "Mold Breaker", 1: "Rock Head"},
	},
	rampardos: {
		inherit: true,
		gen: 3,
		abilities: {0: "Mold Breaker", 1: "Rock Head"},
		baseStats: {hp: 97, atk: 165, def: 60, spa: 65, spd: 50, spe: 68},
	},
	shieldon: {
		inherit: true,
		gen: 3,
	},
	bastiodon: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 70, atk: 52, def: 168, spa: 47, spd: 138, spe: 30},
	},
	stunky: {
		inherit: true,
		gen: 3,
	},
	skuntank: {
		inherit: true,
		gen: 3,
	},
	bronzor: {
		inherit: true,
		gen: 3,
	},
	bronzong: {
		inherit: true,
		gen: 3,
	},
	chatot: {
		inherit: true,
		gen: 3,
		types: ["Sound", "Flying"],
	},
	riolu: {
		inherit: true,
		gen: 3,
		abilities: {0: "Inner Focus"},
	},
	lucario: {
		inherit: true,
		gen: 3,
		abilities: {0: "Inner Focus"},
	},
	snover: {
		inherit: true,
		gen: 3,
	},
	abomasnow: {
		inherit: true,
		gen: 3,
	},
	phione: {
		inherit: true,
		gen: 3,
		types: ["Water", "Fairy"],
		abilities: {0: "Swift Swim", 1: "Water Absorb"},
		baseStats: {hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85},
	},
	tepig: {
		inherit: true,
		gen: 3,
		abilities: {0: "Blaze", 1: "Thick Fat"},
	},
	pignite: {
		inherit: true,
		gen: 3,
		abilities: {0: "Blaze", 1: "Thick Fat"},
	},
	emboar: {
		inherit: true,
		gen: 3,
		abilities: {0: "Blaze", 1: "Thick Fat"},
	},
	pansage: {
		inherit: true,
		gen: 3,
		abilities: {0: "Gluttony"},
	},
	simisage: {
		inherit: true,
		gen: 3,
		abilities: {0: "Gluttony"},
	},
	pansear: {
		inherit: true,
		gen: 3,
		abilities: {0: "Gluttony"},
	},
	simisear: {
		inherit: true,
		gen: 3,
		abilities: {0: "Gluttony"},
	},
	panpour: {
		inherit: true,
		gen: 3,
		abilities: {0: "Gluttony"},
	},
	simipour: {
		inherit: true,
		gen: 3,
		abilities: {0: "Gluttony"},
	},
	munna: {
		inherit: true,
		gen: 3,
		abilities: {0: "Synchronize", 1: "Insomnia"},
	},
	musharna: {
		inherit: true,
		gen: 3,
		abilities: {0: "Synchronize", 1: "Psychic Surge"},
	},
	roggenrola: {
		inherit: true,
		gen: 3,
		abilities: {0: "Weak Armor", 1: "Sturdy"},
	},
	boldore: {
		inherit: true,
		gen: 3,
		abilities: {0: "Weak Armor", 1: "Sturdy"},
	},
	gigalith: {
		inherit: true,
		gen: 3,
		abilities: {0: "Stonebreaker", 1: "Sand Stream"},
	},
	throh: {
		inherit: true,
		gen: 3,
	},
	sewaddle: {
		inherit: true,
		gen: 3,
	},
	swadloon: {
		inherit: true,
		gen: 3,
	},
	leavanny: {
		inherit: true,
		gen: 3,
	},
	ducklett: {
		inherit: true,
		gen: 3,
		abilities: {0: "Keen Eye", 1: "Water Veil"},
	},
	swanna: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 85, atk: 97, def: 63, spa: 97, spd: 63, spe: 98},
		abilities: {0: "Keen Eye", 1: "Water Veil"},
	},
	vullaby: {
		inherit: true,
		gen: 3,
		abilities: {0: "Overcoat", 1: "Weak Armor"},
	},
	mandibuzz: {
		inherit: true,
		gen: 3,
		abilities: {0: "Overcoat", 1: "Weak Armor"},
	},
	reshiram: {
		inherit: true,
		gen: 3,
		abilities: {0: "Flash Fire"},
	},
	keldeo: {
		inherit: true,
		gen: 3,
		abilities: {0: "Inner Focus"},
	},
	chespin: {
		inherit: true,
		gen: 3,
		abilities: {0: "Overgrow", 1: "Bulletproof"},
	},
	quilladin: {
		inherit: true,
		gen: 3,
		abilities: {0: "Overgrow", 1: "Bulletproof"},
	},
	chesnaught: {
		inherit: true,
		gen: 3,
		abilities: {0: "Overgrow", 1: "Bulletproof"},
	},
	skiddo: {
		inherit: true,
		gen: 3,
		abilities: {0: "Sap Sipper", 1: "Overcoat"},
	},
	gogoat: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 103, atk: 100, def: 62, spa: 97, spd: 71, spe: 68},
		abilities: {0: "Sap Sipper", 1: "Grassy Surge"},
	},
	pancham: {
		inherit: true,
		gen: 3,
		abilities: {0: "Iron Fist", 1: "Mold Breaker"},
	},
	pangoro: {
		inherit: true,
		gen: 3,
		abilities: {0: "Iron Fist", 1: "Mold Breaker"},
		baseStats: {hp: 95, atk: 114, def: 78, spa: 69, spd: 71, spe: 58},
	},
	honedge: {
		inherit: true,
		gen: 3,
		abilities: {0: "Sharpness"},
	},
	doublade: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 59, atk: 90, def: 130, spa: 45, spd: 49, spe: 35},
		abilities: {0: "Sharpness"},
	},
	aegislash: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 60, atk: 50, def: 130, spa: 50, spd: 130, spe: 60},
	},
	aegislashblade: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 60, atk: 130, def: 50, spa: 130, spd: 50, spe: 60},
	},
	spritzee: {
		inherit: true,
		gen: 3,
		abilities: {0: "Oblivious", 1: "Immunity"},
	},
	aromatisse: {
		inherit: true,
		gen: 3,
		types: ["Fairy", "Poison"],
		abilities: {0: "Cleanser", 1: "Filter"},
	},
	binacle: {
		inherit: true,
		gen: 3,
		abilities: {0: "Tough Claws", 1: "Keen Eye"},
	},
	barbaracle: {
		inherit: true,
		gen: 3,
		abilities: {0: "Tough Claws", 1: "Keen Eye"},
	},
	helioptile: {
		inherit: true,
		gen: 3,
		abilities: {0: "Dry Skin", 1: "Solar Power"},
	},
	heliolisk: {
		inherit: true,
		gen: 3,
		abilities: {0: "Dry Skin", 1: "Solar Power"},
	},
	phantump: {
		inherit: true,
		gen: 3,
		abilities: {0: "Natural Cure", 1: "Overcoat"},
	},
	trevenant: {
		inherit: true,
		gen: 3,
		abilities: {0: "Natural Cure", 1: "Deadwood"},
	},
	volcanion: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 80, atk: 110, def: 90, spa: 110, spd: 80, spe: 70},
	},
	rowlet: {
		inherit: true,
		gen: 3,
		abilities: {0: "Overgrow", 1: "Long Reach"},
	},
	dartrix: {
		inherit: true,
		gen: 3,
		abilities: {0: "Overgrow", 1: "Long Reach"},
	},
	decidueye: {
		inherit: true,
		gen: 3,
		abilities: {0: "Overgrow", 1: "Long Reach"},
	},
	pikipek: {
		inherit: true,
		gen: 3,
		abilities: {0: "Keen Eye", 1: "Skill Link"},
	},
	trumbeak: {
		inherit: true,
		gen: 3,
		abilities: {0: "Keen Eye", 1: "Skill Link"},
	},
	toucannon: {
		inherit: true,
		gen: 3,
		abilities: {0: "Heatproof", 1: "Skill Link"},
	},
	fomantis: {
		inherit: true,
		gen: 3,
		abilities: {0: "Chlorophyll", 1: "Solar Power"},
	},
	lurantis: {
		inherit: true,
		gen: 3,
		abilities: {0: "Skill Link", 1: "Solar Power"},
	},
	typenull: {
		inherit: true,
		gen: 3,
	},
	silvally: {
		inherit: true,
		gen: 3,
		otherFormes: ["Silvally-Bug", "Silvally-Dark", "Silvally-Dragon", "Silvally-Electric", "Silvally-Fairy", "Silvally-Fighting", "Silvally-Fire", "Silvally-Flying", "Silvally-Ghost", "Silvally-Grass", "Silvally-Ground", "Silvally-Ice", "Silvally-Poison", "Silvally-Psychic", "Silvally-Rock", "Silvally-Steel", "Silvally-Water", "Silvally-Sound"],
		formeOrder: [
			"Silvally", "Silvally-Fighting", "Silvally-Flying", "Silvally-Poison", "Silvally-Ground", "Silvally-Rock", "Silvally-Bug", "Silvally-Ghost", "Silvally-Steel",
			"Silvally-Fire", "Silvally-Water", "Silvally-Grass", "Silvally-Electric", "Silvally-Psychic", "Silvally-Ice", "Silvally-Dragon", "Silvally-Dark", "Silvally-Fairy", 
			"Silvally-Sound",
		],
	},
	silvallybug: {
		inherit: true,
		gen: 3,
	},
	silvallydark: {
		inherit: true,
		gen: 3,
	},
	silvallydragon: {
		inherit: true,
		gen: 3,
	},
	silvallyelectric: {
		inherit: true,
		gen: 3,
	},
	silvallyfairy: {
		inherit: true,
		gen: 3,
	},
	silvallyfighting: {
		inherit: true,
		gen: 3,
	},
	silvallyfire: {
		inherit: true,
		gen: 3,
	},
	silvallyflying: {
		inherit: true,
		gen: 3,
	},
	silvallyghost: {
		inherit: true,
		gen: 3,
	},
	silvallygrass: {
		inherit: true,
		gen: 3,
	},
	silvallyground: {
		inherit: true,
		gen: 3,
	},
	silvallyice: {
		inherit: true,
		gen: 3,
	},
	silvallypoison: {
		inherit: true,
		gen: 3,
	},
	silvallypsychic: {
		inherit: true,
		gen: 3,
	},
	silvallyrock: {
		inherit: true,
		gen: 3,
	},
	silvallysteel: {
		inherit: true,
		gen: 3,
	},
	silvallywater: {
		inherit: true,
		gen: 3,
	},
	silvallysound: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	togedemaru: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 75, atk: 98, def: 73, spa: 40, spd: 83, spe: 96},
		abilities: {0: "Sturdy", 1: "Lightning Rod"},
	},
	bruxish: {
		inherit: true,
		gen: 3,
		abilities: {0: "Water Veil", 1: "Strong Jaw"},
	},
	drampa: {
		inherit: true,
		gen: 3,
		abilities: {0: "Cloud Nine", 1: "Sap Sipper"},
	},
	buzzwole: {
		inherit: true,
		gen: 3,
		abilities: {0: "Beast Boost", 1: "Intimidate"},
		baseStats: {hp: 97, atk: 119, def: 119, spa: 73, spd: 73, spe: 69},
	},
	xurkitree: {
		inherit: true,
		gen: 3,
		abilities: {0: "Beast Boost", 1: "Lightning Rod"},
		baseStats: {hp: 83, atk: 89, def: 67, spa: 179, spd: 71, spe: 61},
	},
	guzzlord: {
		inherit: true,
		gen: 3,
		abilities: {0: "Beast Boost", 1: "Thick Fat"},
		baseStats: {hp: 223, atk: 101, def: 59, spa: 73, spd: 47, spe: 47},
	},
	sobble: {
		inherit: true,
		gen: 3,
		abilities: {0: "Torrent", 1: "Sniper"},
	},
	drizzile: {
		inherit: true,
		gen: 3,
		abilities: {0: "Torrent", 1: "Sniper"},
	},
	inteleon: {
		inherit: true,
		gen: 3,
		abilities: {0: "Torrent", 1: "Sniper"},
		baseStats: {hp: 70, atk: 85, def: 65, spa: 115, spd: 65, spe: 110},
	},
	sizzlipede: {
		inherit: true,
		gen: 3,
	},
	centiskorch: {
		inherit: true,
		gen: 3,
	},
	milcery: {
		inherit: true,
		gen: 3,
		abilities: {0: "Vital Spirit", 1: "Early Bird"},
	},
	alcremie: {
		inherit: true,
		gen: 3,
		abilities: {0: "Vital Spirit", 1: "Misty Surge"},
		baseStats: {hp: 65, atk: 60, def: 75, spa: 80, spd: 91, spe: 64},
	},
	snom: {
		inherit: true,
		gen: 3,
	},
	frosmoth: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 70, atk: 65, def: 70, spa: 115, spd: 90, spe: 65},
	},
	stonjourner: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 100, atk: 105, def: 115, spa: 40, spd: 40, spe: 70},
	},
	eiscue: {
		inherit: true,
		gen: 3,
	},
	eiscuenoice: {
		inherit: true,
		gen: 3,
	},
	dracozolt: {
		inherit: true,
		gen: 3,
	},
	quaxly: {
		inherit: true,
		gen: 3,
		abilities: {0: "Torrent", 1: "Mold Breaker"},
	},
	quaxwell: {
		inherit: true,
		gen: 3,
		abilities: {0: "Torrent", 1: "Mold Breaker"},
	},
	quaquaval: {
		inherit: true,
		gen: 3,
		abilities: {0: "Torrent", 1: "Mold Breaker"},
	},
	nymble: {
		inherit: true,
		gen: 3,
		abilities: {0: "Swarm", 1: "Tinted Lens"},
	},
	lokix: {
		inherit: true,
		gen: 3,
		abilities: {0: "Swarm", 1: "Tinted Lens"},
		baseStats: {hp: 71, atk: 97, def: 78, spa: 52, spd: 55, spe: 92},
	},
	shroodle: {
		inherit: true,
		gen: 3,
	},
	grafaiai: {
		inherit: true,
		gen: 3,
	},
	fidough: {
		inherit: true,
		gen: 3,
		abilities: {0: "Own Tempo", 1: "Gluttony"},
	},
	dachsbun: {
		inherit: true,
		gen: 3,
		types: ["Fairy", "Ground"],
		abilities: {0: "Well-Baked Body", 1: "Gluttony"},
		baseStats: {hp: 57, atk: 70, def: 105, spa: 60, spd: 80, spe: 75},
	},
	varoom: {
		inherit: true,
		gen: 3,
		abilities: {0: "Slow Start", 1: "Filter"},
	},
	revavroom: {
		inherit: true,
		gen: 3,
		abilities: {0: "Speed Boost", 1: "Filter"},
	},
	orthworm: {
		inherit: true,
		gen: 3,
	},
	veluza: {
		inherit: true,
		gen: 3,
	},
	brutebonnet: {
		inherit: true,
		gen: 3,
		abilities: {0: "Protosynthesis", 1: "Sap Sipper"},
		baseStats: {hp: 101, atk: 127, def: 89, spa: 79, spd: 99, spe: 55},
	},
	ironjugulis: {
		inherit: true,
		gen: 3,
		abilities: {0: "Quark Drive", 1: "Lightning Rod"},
		baseStats: {hp: 84, atk: 90, def: 86, spa: 102, spd: 80, spe: 108},
	},
};
