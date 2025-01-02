import { TriumvirateModeTrivia } from "../../../server/chat-plugins/trivia/trivia";
import { ModdedSpeciesData } from "../../../sim/dex-species";

export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	squirtle: {
		inherit: true,
		abilities: {0: "Torrent", H: "Skill Link"},
	},
	wartortle: {
		inherit: true,
		abilities: {0: "Torrent", H: "Skill Link"},
	},
	blastoise: {
		inherit: true,
		types: ["Water", "Steel"],
		abilities: {0: "Torrent", H: "Skill Link"},
	},
	butterfree: {
		inherit: true,
		baseStats: {hp: 60, atk: 45, def: 60, spa: 90, spd: 80, spe: 80},
	},
	beedrill: {
		inherit: true,
		baseStats: {hp: 65, atk: 90, def: 40, spa: 45, spd: 80, spe: 95},
	},
	beedrillmega: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 65, atk: 150, def: 40, spa: 25, spd: 90, spe: 145},
	},
	pidgey: {
		inherit: true,
		abilities: {0: "Keen Eye", 1: "Tangled Feet", H: "Quick Feet"},
	},
	pidgeotto: {
		inherit: true,
		abilities: {0: "Keen Eye", 1: "Tangled Feet", H: "Quick Feet"},
	},
	pidgeot: {
		inherit: true,
		baseStats: {hp: 83, atk: 80, def: 75, spa: 70, spd: 70, spe: 101},
		abilities: {0: "Keen Eye", 1: "Tangled Feet", H: "Quick Feet"},
	},
	pidgeotmega: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 83, atk: 135, def: 80, spa: 70, spd: 80, spe: 131},
	},
	rattataalola: {
		inherit: true,
		gen: 3,
	},
	raticatealola: {
		inherit: true,
		gen: 3,
	},
	fearow: {
		inherit: true,
		baseStats: {hp: 75, atk: 100, def: 65, spa: 61, spd: 61, spe: 100},
		abilities: {0: "Piercing", H: "Sniper"},
	},
	arbok: {
		inherit: true,
		baseStats: {hp: 60, atk: 95, def: 69, spa: 65, spd: 79, spe: 80},
	},
	pikachu: {
		inherit: true,
		baseStats: {hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90},
	},
	pikachucosplay: {
		inherit: true,
		gen: 3,
	},
	pikachurockstar: {
		inherit: true,
		gen: 3,
	},
	pikachubelle: {
		inherit: true,
		gen: 3,
	},
	pikachupopstar: {
		inherit: true,
		gen: 3,
	},
	pikachuphd: {
		inherit: true,
		gen: 3,
	},
	pikachulibre: {
		inherit: true,
		gen: 3,
	},
	raichu: {
		inherit: true,
		baseStats: {hp: 50, atk: 80, def: 55, spa: 80, spd: 60, spe: 100},
	},
	raichualola: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 50, atk: 75, def: 50, spa: 85, spd: 65, spe: 100},
	},
	sandshrew: {
		inherit: true,
		abilities: {0: "Rough Skin", H: "Sand Rush"},
	},
	sandshrewalola: {
		inherit: true,
		gen: 3,
		abilities: {0: "Rough Skin", H: "Slush Rush"},
	},
	sandslash: {
		inherit: true,
		abilities: {0: "Rough Skin", H: "Sand Rush"},
	},
	sandslashalola: {
		inherit: true,
		gen: 3,
		abilities: {0: "Rough Skin", H: "Slush Rush"},
	},
	nidoqueen: {
		inherit: true,
		baseStats: {hp: 90, atk: 92, def: 87, spa: 75, spd: 85, spe: 76},
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
	zubat: {
		inherit: true,
	},
	golbat: {
		inherit: true,
	},
	crobat: {
		inherit: true,
		abilities: {0: "Merciless", H: "Infiltrator"},
	},
	vulpixalola: {
		inherit: true,
		gen: 3,
	},
	ninetales: {
		inherit: true,
		types: ["Fire", "Fairy"],
	},
	ninetalesalola: {
		inherit: true,
		gen: 3,
	},
	vileplume: {
		inherit: true,
		baseStats: {hp: 75, atk: 80, def: 85, spa: 110, spd: 90, spe: 50},
	},
	bellossom: {
		inherit: true,
		baseStats: {hp: 75, atk: 80, def: 95, spa: 90, spd: 100, spe: 50},
	},
	parasect: {
		inherit: true,
		types: ["Bug", "Ghost"],
		baseStats: {hp: 60, atk: 95, def: 100, spa: 60, spd: 80, spe: 30},
	},
	parasong: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
		baseStats: {hp: 60, atk: 95, def: 80, spa: 60, spd: 100, spe: 30},
	},
	diglett: {
		inherit: true,
		abilities: {0: "Sharp", 1: "Arena Trap", H: "Sand Force"},
	},
	diglettalola: {
		inherit: true,
		gen: 3,
	},
	dugtrio: {
		inherit: true,
		baseStats: {hp: 35, atk: 100, def: 50, spa: 50, spd: 70, spe: 120},
		abilities: {0: "Sharp", 1: "Arena Trap", H: "Sand Force"},
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
	poliwhirl: {
		inherit: true,
		gen: 3,
	},
	poliwrath: {
		inherit: true,
		baseStats: {hp: 90, atk: 95, def: 95, spa: 70, spd: 90, spe: 70},
	},
	politoed: {
		inherit: true,
		baseStats: {hp: 90, atk: 75, def: 75, spa: 90, spd: 110, spe: 70},
		types: ["Water", "Sound"],
	},
	alakazam: {
		inherit: true,
		baseStats: {hp: 55, atk: 50, def: 45, spa: 135, spd: 95, spe: 120},
	},
	alakazammega: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 55, atk: 50, def: 65, spa: 175, spd: 105, spe: 150},
	},
	geodudealola: {
		inherit: true,
		gen: 3,
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
	magnezone: {
		inherit: true,
		gen: 3,
	},
	farfetchd: {
		inherit: true,
		baseStats: {hp: 52, atk: 90, def: 55, spa: 58, spd: 62, spe: 90},
	},
	farfetchdgalar: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 52, atk: 95, def: 55, spa: 58, spd: 62, spe: 55},
	},
	sirfetchd: {
		inherit: true,
		gen: 3,
	},
	dodrio: {
		inherit: true,
		baseStats: {hp: 60, atk: 110, def: 70, spa: 60, spd: 60, spe: 110},
	},
	grimeralola: {
		inherit: true,
		gen: 3,
	},
	mukalola: {
		inherit: true,
		gen: 3,
	},
	gengar: {
		inherit: true,
		abilities: {0: "Cursed Body", S: "Levitate"},
	},
	onix: {
		inherit: true,
		baseStats: {hp: 45, atk: 65, def: 160, spa: 30, spd: 45, spe: 70},
	},
	hypno: {
		inherit: true,
		types: ["Psychic", "Dark"],
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
	exeggutor: {
		inherit: true,
		baseStats: {hp: 95, atk: 95, def: 85, spa: 125, spd: 75, spe: 55},
	},
	hitmontop: {
		inherit: true,
		gen: 3,
		abilities: {0: "Intimidate", 1: "Technician", H: "Dancer"},
	},
	koffing: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Neutralizing Gas", H: "Stench"},
	},
	weezing: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Neutralizing Gas", H: "Stench"},
	},
	rhyperior: {
		inherit: true,
		gen: 3,
	},
	tangela: {
		inherit: true,
	},
	tangrowth: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 90, atk: 65, def: 125, spa: 110, spd: 50, spe: 50},
	},
	seaking: {
		inherit: true,
		types: ["Water", "Electric"],
	},
	mimejr: {
		inherit: true,
		gen: 3,
		types: ["Psychic", "Fairy"],
	},
	mrmime: {
		inherit: true,
		types: ["Psychic", "Fairy"],
	},
	jynx: {
		inherit: true,
		evos: ["Kisscope"],
	},
	kisscope: {
		inherit: true,
		gen: 3,
		isNonstandard: null,
	},
	magmortar: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 75, atk: 95, def: 67, spa: 130, spd: 95, spe: 83},
	},
	electivire: {
		inherit: true,
		gen: 3,
		types: ["Electric", "Fighting"],
		baseStats: {hp: 75, atk: 123, def: 67, spa: 95, spd: 85, spe: 100},
	},
	pinsir: {
		inherit: true,
		abilities: {0: "Hyper Cutter", 1: "Mold Breaker", H: "Chrysalis	"},
	},
	pinsirmega: {
		inherit: true,
		gen: 3,
	},
	taurospaldeacombat: {
		inherit: true,
		gen: 3,
	},
	taurospaldeablaze: {
		inherit: true,
		gen: 3,
		abilities: {0: "Intimidate", 1: "Anger Point", H: "Flame Body"},
	},
	taurospaldeaaqua: {
		inherit: true,
		gen: 3,
		abilities: {0: "Intimidate", 1: "Anger Point", H: "Swift Swim"},
	},
	aerodactylmega: {
		inherit: true,
		gen: 3,
	},
	munchlax: {
		inherit: true,
		gen: 3,
		abilities: {0: "Miracle Guard", 1: "Thick Fat", H: "Gluttony"},
	},
	zapdos: {
		inherit: true,
		abilities: {0: "Pressure", H: "Static", S: "Lightning Rod"},
	},
	chikorita: {
		inherit: true,
		abilities: {0: "Overgrow", H: "Regenerator"},
	},
	bayleef: {
		inherit: true,
		abilities: {0: "Overgrow", H: "Regenerator"},
	},
	meganium: {
		inherit: true,
		abilities: {0: "Overgrow", H: "Regenerator"},
	},
	quilava: {
		inherit: true,
		types: ["Fire", "Ground"],
	},
	typhlosion: {
		inherit: true,
		types: ["Fire", "Ground"],
	},
	croconaw: {
		inherit: true,
		types: ["Water", "Dark"],
	},
	feraligatr: {
		inherit: true,
		types: ["Water", "Dark"],
	},
	hoothoot: {
		inherit: true,
		types: ["Ghost", "Flying"],
		abilities: {0: "Insomnia", 1: "Nocturnal", H: "Tinted Lens"},
	},
	noctowl: {
		inherit: true,
		types: ["Ghost", "Flying"],
		baseStats: {hp: 100, atk: 50, def: 50, spa: 86, spd: 96, spe: 70},
		abilities: {0: "Insomnia", 1: "Nocturnal", H: "Tinted Lens"},
	},
	ledian: {
		inherit: true,
		types: ["Bug", "Fighting"],
		baseStats: {hp: 55, atk: 75, def: 50, spa: 55, spd: 110, spe: 85},
		abilities: {0: "Superhero", 1: "Early Bird", H: "Iron Fist"},
	},
	ariados: {
		inherit: true,
		baseStats: {hp: 70, atk: 90, def: 70, spa: 60, spd: 70, spe: 40},
	},
	togepi: {
		inherit: true,
		types: ["Fairy"],
	},
	togetic: {
		inherit: true,
		types: ["Fairy", "Flying"],
	},
	togekiss: {
		inherit: true,
		gen: 3,
		types: ["Fairy", "Flying"],
	},
	ampharos: {
		inherit: true,
		baseStats: {hp: 90, atk: 75, def: 85, spa: 115, spd: 90, spe: 55},
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
		baseStats: {hp: 100, atk: 50, def: 80, spa: 60, spd: 80, spe: 50},
	},
	bonsly: {
		inherit: true,
		gen: 3,
	},
	jumpluff: {
		inherit: true,
		baseStats: {hp: 75, atk: 65, def: 70, spa: 65, spd: 95, spe: 110},
	},
	aipom: {
		inherit: true,
	},
	ambipom: {
		inherit: true,
		gen: 3,
	},
	sunflora: {
		inherit: true,
		types: ["Grass", "Fire"],
		baseStats: {hp: 75, atk: 75, def: 55, spa: 105, spd: 85, spe: 50},
	},
	yanmega: {
		inherit: true,
		gen: 3,
		types: ["Bug", "Dragon"],
	},
	murkrow: {
		inherit: true,
		abilities: {0: "Technician", 1: "Super Luck", H: "Prankster"},
	},
	honchkrow: {
		inherit: true,
		gen: 3,
		abilities: {0: "Executioner", 1: "Super Luck", H: "Moxie"},
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
	unown: {
		inherit: true,
		abilities: {0: "Protean"},
	},
	snubbull: {
		inherit: true,
		types: ["Fairy"],
	},
	granbull: {
		inherit: true,
		types: ["Fairy", "Fighting"],
		abilities: {0: "Intimidate", 1: "Strong Jaw", H: "Rattled"},
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
	heracrossmega: {
		inherit: true,
		gen: 3,
	},
	teddiursa: {
		inherit: true,
		abilities: {0: "Guts", 1: "Miracle Guard", H: "Honey Gatherer"},
	},
	ursaring: {
		inherit: true,
		types: ["Ground", "Normal"],
		abilities: {0: "Guts", 1: "Miracle Guard", H: "Unnerve"},
	},
	ursaluna: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 110, atk: 140, def: 95, spa: 75, spd: 80, spe: 50},
		abilities: {0: "Guts", 1: "Miracle Guard", H: "Unnerve"},
	},
	ursalunabloodmoon: {
		inherit: true,
		gen: 3,
		types: ["Ground", "Psychic"],
	},
	slugma: {
		inherit: true,
		gen: 3,
		abilities: {0: "Dry Skin", 1: "Flame Body", H: "Weak Armor"},
	},
	magcargo: {
		inherit: true,
		baseStats: {hp: 60, atk: 70, def: 120, spa: 90, spd: 80, spe: 30},
		abilities: {0: "Dry Skin", 1: "Flame Body", H: "Weak Armor"},
	},
	mamoswine: {
		inherit: true,
		gen: 3,
	},
	corsola: {
		inherit: true,
		baseStats: {hp: 65, atk: 55, def: 95, spa: 65, spd: 95, spe: 35},
	},
	octillery: {
		inherit: true,
		baseStats: {hp: 75, atk: 105, def: 85, spa: 105, spd: 85, spe: 25},
	},
	delibird: {
		inherit: true,
		abilities: {0: "Vital Spirit", 1: "Huge Power", H: "Refrigerate"},
	},
	mantyke: {
		inherit: true,
		gen: 3,
	},
	mantine: {
		inherit: true,
		baseStats: {hp: 85, atk: 40, def: 70, spa: 80, spd: 140, spe: 70},
	},
	houndoommega: {
		inherit: true,
		gen: 3,
	},
	stantler: {
		inherit: true,
		types: ["Normal", "Ice"],
	},
	wyrdeer: {
		inherit: true,
		gen: 3,
		types: ["Psychic", "Ice"],
	},
	smeargle: {
		inherit: true,
		abilities: {0: "Trace", 1: "Technician", H: "Moody"},
		baseStats: {hp: 55, atk: 30, def: 35, spa: 30, spd: 45, spe: 75},
	},
	raikou: {
		inherit: true,
		abilities: {0: "Galvanize", H: "Inner Focus", S: "Volt Absorb"},
	},
	entei: {
		inherit: true,
		abilities: {0: "Immolate", H: "Inner Focus", S: "Flash Fire"},
	},
	suicune: {
		inherit: true,
		abilities: {0: "Drench", H: "Inner Focus", S: "Water Absorb"},
	},
	treecko: {
		inherit: true,
		abilities: {0: "Overgrow", H: "Sharpness"},
	},
	grovyle: {
		inherit: true,
		abilities: {0: "Overgrow", H: "Sharpness"},
	},
	sceptile: {
		inherit: true,
		abilities: {0: "Overgrow", H: "Sharpness"},
	},
	mudkip: {
		inherit: true,
		abilities: {0: "Torrent", H: "Regenerator"},
	},
	marshtomp: {
		inherit: true,
		abilities: {0: "Torrent", H: "Regenerator"},
	},
	swampert: {
		inherit: true,
		abilities: {0: "Torrent", H: "Regenerator"},
	},
	swampertmega: {
		inherit: true,
		gen: 3,
	},
	mightyena: {
		inherit: true,
		baseStats: {hp: 70, atk: 90, def: 70, spa: 70, spd: 70, spe: 90},
	},
	zigzagoongalar: {
		inherit: true,
		gen: 3,
	},
	linoonegalar: {
		inherit: true,
		gen: 3,
	},
	obstagoon: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 83, atk: 90, def: 91, spa: 60, spd: 81, spe: 95},
	},
	beautifly: {
		inherit: true,
		baseStats: {hp: 60, atk: 70, def: 50, spa: 100, spd: 50, spe: 65},
	},
	dustox: {
		inherit: true,
		baseStats: {hp: 60, atk: 50, def: 70, spa: 50, spd: 100, spe: 65},
	},
	ludicolo:{
		inherit: true,
		gen: 3,
		abilities: {0: "Swift Swim", 1: "Rain Dish", H: "Dancer"},
	},
	shiftry: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Wind Rider", H: "Pickpocket", S: "Early Bird"},
	},
	swellow: {
		inherit: true,
		baseStats: {hp: 60, atk: 85, def: 60, spa: 75, spd: 50, spe: 125},
	},
	wingull: {
		inherit: true,
		abilities: {0: "Keen Eye", 1: "Hydration", H: "Rain Dish"},
	},
	pelipper: {
		inherit: true,
		abilities: {0: "Keen Eye", 1: "Drizzle", H: "Rain Dish"},
		baseStats: {hp: 60, atk: 50, def: 100, spa: 95, spd: 70, spe: 65},
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
		abilities: {0: "Steadfast", 1: "Sharpness", H: "Justified"},
	},
	masquerain: {
		inherit: true,
		baseStats: {hp: 70, atk: 60, def: 62, spa: 100, spd: 82, spe: 80},
		types: ["Bug", "Water"],
	},
	shedinja: {
		inherit: true,
		baseStats: {hp: 1, atk: 110, def: 15, spa: 110, spd: 10, spe: 110},
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
		abilities: {0: "Soundproof", H: "Mold Breaker"},
	},
	probopass: {
		inherit: true,
		gen: 3,
	},
	delcatty: {
		inherit: true,
		baseStats: {hp: 70, atk: 85, def: 65, spa: 65, spd: 65, spe: 90},
	},
	sableye: {
		inherit: true,
		baseStats: {hp: 80, atk: 65, def: 75, spa: 65, spd: 75, spe: 50},
		abilities: {0: "Pixie Veil", 1: "Stall", H: "Prankster"},
	},
	mawile: {
		inherit: true,
		types: ["Steel", "Fairy"],
		baseStats: {hp: 60, atk: 85, def: 85, spa: 65, spd: 65, spe: 50},
		abilities: {0: "Hustle", 1: "Intimidate", H: "Sheer Force"},
	},
	mawilemega: {
		inherit: true,
		gen: 3,
		types: ["Steel", "Fairy"],
		baseStats: {hp: 60, atk: 105, def: 125, spa: 75, spd: 95, spe: 50},
	},
	aggron: {
		inherit: true,
		abilities: {0: "Solid Rock", 1: "Rock Head", H: "Heavy Metal"},
	},
	meditite: {
		inherit: true,
		abilities: {0: "Pure Power", H: "Magic Guard"},
	},
	medicham: {
		inherit: true,
		baseStats: {hp: 70, atk: 60, def: 75, spa: 60, spd: 75, spe: 80},
		abilities: {0: "Pure Power", H: "Magic Guard"},
	},
	electrike: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Lightning Rod", H: "Minus"},
	},
	manectric: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Lightning Rod", H: "Minus"},
	},
	plusle: {
		inherit: true,
		abilities: {0: "Plus", H: "Lightning Rod"},
	},
	minun: {
		inherit: true,
		abilities: {0: "Minus", H: "Volt Absorb"},
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
	sharpedo: {
		inherit: true,
		baseStats: {hp: 70, atk: 120, def: 40, spa: 105, spd: 40, spe: 105},
	},
	camerupt: {
		inherit: true,
		baseStats: {hp: 90, atk: 100, def: 70, spa: 105, spd: 75, spe: 40},
	},
	cameruptmega: {
		inherit: true,
		baseStats: {hp: 90, atk: 120, def: 100, spa: 145, spd: 105, spe: 20},
	},
	torkoal: {
		inherit: true,
		abilities: {0: "White Smoke", 1: "Drought", H: "Shell Armor"},
	},
	spinda: {
		inherit: true,
		types: ["Normal", "Fighting"],
		abilities: {0: "Own Tempo", 1: "Miracle Guard", H: "Contrary"},
	},
	cacnea: {
		inherit: true,
	},
	cacturne: {
		inherit: true,
		baseStats: {hp: 80, atk: 115, def: 80, spa: 75, spd: 80, spe: 55},
		abilities: {0: "Quick Draw", H: "Sand Rush"},
	},
	zangoose: {
		inherit: true,
		baseStats: {hp: 73, atk: 115, def: 60, spa: 80, spd: 60, spe: 90},
	},
	seviper: {
		inherit: true,
		baseStats: {hp: 73, atk: 100, def: 60, spa: 100, spd: 60, spe: 85},
		abilities: {0: "Shed Skin", H: "Merciless"},
	},
	lunatone: {
		inherit: true,
		types: ["Rock", "Ghost"],
		baseStats: {hp: 90, atk: 55, def: 65, spa: 95, spd: 85, spe: 70},
		abilities: {0: "Levitate", H: "Moonrise"},
	},
	solrock: {
		inherit: true,
		types: ["Rock", "Fire"],
		baseStats: {hp: 90, atk: 95, def: 85, spa: 55, spd: 65, spe: 70},
		abilities: {0: "Levitate", H: "Drought"},
	},
	milotic: {
		inherit: true,
		abilities: {0: "Marvel Scale", 1: "Competitive", H: "Dazzling"},
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
		abilities: {0: "Color Change", H: "Protean"},
	},
	shuppet: {
		inherit: true,
		types: ["Ghost", "Normal"],
		abilities: {0: "Insomnia", 1: "Aftermath", H: "Fluffy"},
	},
	banette: {
		inherit: true,
		types: ["Ghost", "Normal"],
		baseStats: {hp: 64, atk: 115, def: 65, spa: 85, spd: 63, spe: 73},
		abilities: {0: "Insomnia", 1: "Aftermath", H: "Fluffy"},
	},
	tropius: {
		inherit: true,
		baseStats: {hp: 109, atk: 73, def: 83, spa: 77, spd: 87, spe: 61},
	},
	chingling: {
		inherit: true,
		gen: 3,
		types: ["Psychic", "Sound"],
		abilities: {0: "Levitate", H: "Soundproof"},
	},
	chimecho: {
		inherit: true,
		types: ["Psychic", "Sound"],
		abilities: {0: "Levitate", H: "Soundproof"},
		baseStats: {hp: 75, atk: 50, def: 80, spa: 95, spd: 90, spe: 65},
	},
	absol: {
		inherit: true,
		types: ["Dark", "Fairy"],
		abilities: {0: "Sharp", 1: "Super Luck", H: "Jinxed"},
	},
	glalie: {
		inherit: true,
		types: ["Ice", "Dark"],
		gender: "M",
		baseStats: {hp: 70, atk: 70, def: 90, spa: 70, spd: 90, spe: 90},
		abilities: {0: "Inner Focus", 1: "Ice Body", H: "Solid Rock"},
		evoType: "useItem",
		evoItem: "Dusk Stone",
	},
	froslass: {
		inherit: true,
		gen: 3,
	},
	clamperl: {
		inherit: true,
		baseStats: {hp: 45, atk: 64, def: 85, spa: 74, spd: 55, spe: 32},
	},
	huntail: {
		inherit: true,
		abilities: {0: "Strong Jaw", H: "Water Veil"},
	},
	relicanth: {
		inherit: true,
		abilities: {0: "Battle Armor", 1: "Rock Head", H: "Sturdy"},
	},
	luvdisc: {
		inherit: true,
		types: ["Water", "Fairy"],
		baseStats: {hp: 63, atk: 50, def: 65, spa: 60, spd: 85, spe: 97},
		abilities: {0: "Swift Swim", H: "Heart Veil"},
	},
	kyogre: {
		inherit: true,
		abilities: {0: "Primordial Sea"},
	},
	groudon: {
		inherit: true,
		abilities: {0: "Desolate Land"},
	},
	jirachi: {
		inherit: true,
		abilities: {0: "Serene Grace", H: "Healer"},
	},
	deoxys: {
		inherit: true,
		baseStats: {hp: 50, atk: 110, def: 110, spa: 110, spd: 110, spe: 110},
	},
	turtwig: {
		inherit: true,
		gen: 3,
	},
	grotle: {
		inherit: true,
		gen: 3,
		types: ["Grass", "Ground"],
	},
	torterra: {
		inherit: true,
		gen: 3,
	},
	chimchar: {
		inherit: true,
		gen: 3,
	},
	monferno: {
		inherit: true,
		gen: 3,
	},
	infernape: {
		inherit: true,
		gen: 3,
	},
	piplup: {
		inherit: true,
		gen: 3,
		abilities: {0: "Torrent", H: "Competitive", S: "Defiant"},
	},
	prinplup: {
		inherit: true,
		gen: 3,
		abilities: {0: "Torrent", H: "Competitive", S: "Defiant"},
	},
	empoleon: {
		inherit: true,
		gen: 3,
		abilities: {0: "Torrent", H: "Competitive", S: "Defiant"},
	},
	bidoof: {
		inherit: true,
		gen: 3,
	},
	bibarel: {
		inherit: true,
		gen: 3,
	},
	kricketot: {
		inherit: true,
		gen: 3,
	},
	kricketune: {
		inherit: true,
		gen: 3,
		types: ["Bug", "Sound"],
	},
	cranidos: {
		inherit: true,
		gen: 3,
	},
	rampardos: {
		inherit: true,
		gen: 3,
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
	buizel: {
		inherit: true,
		gen: 3,
	},
	floatzel: {
		inherit: true,
		gen: 3,
	},
	drifloon: {
		inherit: true,
		gen: 3,
	},
	drifblim: {
		inherit: true,
		gen: 3,
	},
	glameow: {
		inherit: true,
		gen: 3,
	},
	purugly: {
		inherit: true,
		gen: 3,
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
	skorupi: {
		inherit: true,
		gen: 3,
	},
	drapion: {
		inherit: true,
		gen: 3,
		abilities: {0: "Battle Armor", 1: "Sniper", H: "Merciless"},
	},
	carnivine: {
		inherit: true,
		gen: 3,
		types: ["Grass", "Dark"],
		baseStats: {hp: 84, atk: 100, def: 72, spa: 90, spd: 72, spe: 46},
		abilities: {0: "Flytrap"},
	},
	riolu: {
		inherit: true,
		gen: 3,
	},
	lucario: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 70, atk: 110, def: 70, spa: 105, spd: 70, spe: 90},
	},
	lucariomega: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 70, atk: 145, def: 83, spa: 140, spd: 70, spe: 107},
	},
	snover: {
		inherit: true,
		gen: 3,
	},
	abomasnow: {
		inherit: true,
		gen: 3,
	},
	rotom: {
		inherit: true,
		gen: 3,
	},
	rotomheat: {
		inherit: true,
		gen: 3,
		types: ["Electric", "Fire"],
	},
	rotomwash: {
		inherit: true,
		gen: 3,
		types: ["Electric", "Water"],
	},
	rotomfrost: {
		inherit: true,
		gen: 3,
		types: ["Electric", "Ice"],
	},
	rotomfan: {
		inherit: true,
		gen: 3,
		types: ["Electric", "Flying"],
	},
	rotommow: {
		inherit: true,
		gen: 3,
		types: ["Electric", "Grass"],
	},
	phione: {
		inherit: true,
		gen: 3,
		types: ["Water", "Fairy"],
		baseStats: {hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85},
	},
	tepig: {
		inherit: true,
		gen: 3,
	},
	pignite: {
		inherit: true,
		gen: 3,
	},
	emboar: {
		inherit: true,
		gen: 3,
	},
	oshawott: {
		inherit: true,
		gen: 3,
	},
	dewott: {
		inherit: true,
		gen: 3,
		types: ["Water", "Fighting"],
	},
	samurott: {
		inherit: true,
		gen: 3,
		types: ["Water", "Fighting"],
	},
	purrloin: {
		inherit: true,
		gen: 3,
	},
	liepard: {
		inherit: true,
		gen: 3,
	},
	pansage: {
		inherit: true,
		gen: 3,
	},
	simisage: {
		inherit: true,
		gen: 3,
	},
	pansear: {
		inherit: true,
		gen: 3,
	},
	simisear: {
		inherit: true,
		gen: 3,
	},
	panpour: {
		inherit: true,
		gen: 3,
	},
	simipour: {
		inherit: true,
		gen: 3,
	},
	munna: {
		inherit: true,
		gen: 3,
	},
	musharna: {
		inherit: true,
		gen: 3,
		abilities: {0: "Comatose", 1: "Synchronize", H: "Telepathy"},
	},
	pidove: {
		inherit: true,
		gen: 3,
	},
	tranquill: {
		inherit: true,
		gen: 3,
	},
	unfezant: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 80, atk: 115, def: 80, spa: 75, spd: 55, spe: 93},
	},
	blitzle: {
		inherit: true,
		gen: 3,
	},
	zebstrika: {
		inherit: true,
		gen: 3,
		types: ["Electric", "Fire"],
		abilities: {0: "Flash Fire", 1: "Motor Drive", H: "Sap Sipper"},
	},
	roggenrola: {
		inherit: true,
		gen: 3,
		abilities: {0: "Sturdy", 1: "Weak Armor", H: "Sand Force"},
	},
	boldore: {
		inherit: true,
		gen: 3,
		abilities: {0: "Sturdy", 1: "Weak Armor", H: "Sand Force"},
	},
	gigalith: {
		inherit: true,
		gen: 3,
		abilities: {0: "Sturdy", 1: "Sand Stream", H: "Sand Force"},
	},
	throh: {
		inherit: true,
		gen: 3,
	},
	sawk: {
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
	venipede: {
		inherit: true,
		gen: 3,
		abilities: {0: "Poison Point", 1: "Swarm", H: "Speed Boost", S: "Quick Feet"},
	},
	whirlipede: {
		inherit: true,
		gen: 3,
		abilities: {0: "Poison Point", 1: "Swarm", H: "Speed Boost", S: "Quick Feet"},
	},
	scolipede: {
		inherit: true,
		gen: 3,
		abilities: {0: "Poison Point", 1: "Swarm", H: "Speed Boost", S: "Quick Feet"},
	},
	basculin: {
		inherit: true,
		gen: 3,
	},
	basculinbluestriped: {
		inherit: true,
		gen: 3,
	},
	sandile: {
		inherit: true,
		gen: 3,
	},
	krokorok: {
		inherit: true,
		gen: 3,
	},
	krookodile: {
		inherit: true,
		gen: 3,
	},
	ducklett: {
		inherit: true,
		gen: 3,
	},
	swanna: {
		inherit: true,
		gen: 3,
	},
	alomomola: {
		inherit: true,
		gen: 3,
	},
	joltik: {
		inherit: true,
		gen: 3,
	},
	galvantula: {
		inherit: true,
		gen: 3,
	},
	klink: {
		inherit: true,
		gen: 3,
	},
	klang: {
		inherit: true,
		gen: 3,
	},
	klinklang: {
		inherit: true,
		gen: 3,
	},
	litwick: {
		inherit: true,
		gen: 3,
		abilities: {0: "Flash Fire", 1: "Flame Body", H: "Infiltrator", S: "Shadow Tag"},
	},
	lampent: {
		inherit: true,
		gen: 3,
		abilities: {0: "Flash Fire", 1: "Flame Body", H: "Infiltrator", S: "Shadow Tag"},
	},
	chandelure: {
		inherit: true,
		gen: 3,
		abilities: {0: "Flash Fire", 1: "Flame Body", H: "Infiltrator", S: "Shadow Tag"},
	},
	axew: {
		inherit: true,
		gen: 3,
		abilities: {0: "Executioner", 1: "Mold Breaker", H: "Unnerve"},
	},
	fraxure: {
		inherit: true,
		gen: 3,
		abilities: {0: "Executioner", 1: "Mold Breaker", H: "Unnerve"},
	},
	haxorus: {
		inherit: true,
		gen: 3,
		abilities: {0: "Executioner", 1: "Mold Breaker", H: "Unnerve"},
	},
	cubchoo: {
		inherit: true,
		gen: 3,
		abilities: {0: "Miracle Guard", 1: "Slush Rush", H: "Rattled"},
	},
	beartic: {
		inherit: true,
		gen: 3,
		abilities: {0: "Miracle Guard", 1: "Slush Rush", H: "Swift Swim"},
		baseStats: {hp: 95, atk: 130, def: 80, spa: 70, spd: 80, spe: 50},
	},
	shelmet: {
		inherit: true,
		gen: 3,
	},
	accelgor: {
		inherit: true,
		gen: 3,
		types: ["Bug", "Water"],
	},
	mienfoo: {
		inherit: true,
		gen: 3,
	},
	mienshao: {
		inherit: true,
		gen: 3,
	},
	druddigon: {
		inherit: true,
		gen: 3,
	},
	pawniard: {
		inherit: true,
		gen: 3,
		abilities: {0: "Defiant", 1: "Inner Focus", H: "Sharp"},
	},
	bisharp: {
		inherit: true,
		gen: 3,
		abilities: {0: "Defiant", 1: "Inner Focus", H: "Sharp"},
	},
	bouffalant: {
		inherit: true,
		gen: 3,
		types: ["Normal", "Rock"],
	},
	vullaby: {
		inherit: true,
		gen: 3,
	},
	mandibuzz: {
		inherit: true,
		gen: 3,
	},
	deino: {
		inherit: true,
		gen: 3,
	},
	zweilous: {
		inherit: true,
		gen: 3,
	},
	hydreigon: {
		inherit: true,
		gen: 3,
	},
	cobalion: {
		inherit: true,
		gen: 3,
	},
	terrakion: {
		inherit: true,
		gen: 3,
	},
	virizion: {
		inherit: true,
		gen: 3,
	},
	tornadus: {
		inherit: true,
		gen: 3,
	},
	tornadustherian: {
		inherit: true,
		gen: 3,
	},
	reshiram: {
		inherit: true,
		gen: 3,
	},
	keldeo: {
		inherit: true,
		gen: 3,
	},
	chespin: {
		inherit: true,
		gen: 3,
	},
	quilladin: {
		inherit: true,
		gen: 3,
	},
	chesnaught: {
		inherit: true,
		gen: 3,
	},
	skiddo: {
		inherit: true,
		gen: 3,
	},
	gogoat: {
		inherit: true,
		gen: 3,
	},
	pancham: {
		inherit: true,
		gen: 3,
		abilities: {0: "Iron Fist", 1: "Miracle Guard", H: "Scrappy"},
	},
	pangoro: {
		inherit: true,
		gen: 3,
		abilities: {0: "Iron Fist", 1: "Miracle Guard", H: "Scrappy"},
	},
	furfrou: {
		inherit: true,
		gen: 3,
	},
	honedge: {
		inherit: true,
		gen: 3,
	},
	doublade: {
		inherit: true,
		gen: 3,
	},
	aegislash: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 60, atk: 50, def: 140, spa: 50, spd: 140, spe: 60},
	},
	aegislashblade: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 60, atk: 140, def: 50, spa: 140, spd: 50, spe: 60},
	},
	spritzee: {
		inherit: true,
		gen: 3,
		abilities: {0: "Healer", H: "Immunity"},
	},
	aromatisse: {
		inherit: true,
		gen: 3,
		types: ["Fairy", "Poison"],
		abilities: {0: "Cleanser", H: "Filter"},
	},
	binacle: {
		inherit: true,
		gen: 3,
	},
	barbaracle: {
		inherit: true,
		gen: 3,
	},
	helioptile: {
		inherit: true,
		gen: 3,
	},
	heliolisk: {
		inherit: true,
		gen: 3,
	},
	goomy: {
		inherit: true,
		gen: 3,
		types: ["Dragon", "Water"],
	},
	sliggoo: {
		inherit: true,
		gen: 3,
		types: ["Dragon", "Water"],
	},
	sliggoohisui: {
		inherit: true,
		gen: 3,
	},
	goodra: {
		inherit: true,
		gen: 3,
		types: ["Dragon", "Water"],
	},
	goodrahisui: {
		inherit: true,
		gen: 3,
	},
	phantump: {
		inherit: true,
		gen: 3,
	},
	trevenant: {
		inherit: true,
		gen: 3,
		abilities: {0: "Natural Cure", 1: "Deadwood", H: "Harvest"},
	},
	hoopa: {
		inherit: true,
		gen: 3,
	},
	hoopaunbound: {
		inherit: true,
		gen: 3,
	},
	volcanion: {
		inherit: true,
		gen: 3,
	},
	rowlet: {
		inherit: true,
		gen: 3,
	},
	dartrix: {
		inherit: true,
		gen: 3,
	},
	decidueye: {
		inherit: true,
		gen: 3,
	},
	pikipek: {
		inherit: true,
		gen: 3,
	},
	trumbeak: {
		inherit: true,
		gen: 3,
	},
	toucannon: {
		inherit: true,
		gen: 3,
		abilities: {0: "Heatproof", 1: "Skill Link", H: "Sheer Force"},
	},
	oricorio: {
		inherit: true,
		gen: 3,
	},
	oricoriopompom: {
		inherit: true,
		gen: 3,
	},
	oricoriopau: {
		inherit: true,
		gen: 3,
	},
	oricoriosensu: {
		inherit: true,
		gen: 3,
	},
	rockruff: {
		inherit: true,
		gen: 3,
	},
	lycanroc: {
		inherit: true,
		gen: 3,
		types: ["Rock", "Normal"],
	},
	lycanrocmidnight: {
		inherit: true,
		gen: 3,
		types: ["Rock", "Dark"],
		abilities: {0: "Keen Eye", 1: "Nocturnal", H: "No Guard"},
	},
	lycanrocdusk: {
		inherit: true,
		gen: 3,
		types: ["Rock", "Fighting"],
	},
	mareanie: {
		inherit: true,
		gen: 3,
	},
	toxapex: {
		inherit: true,
		gen: 3,
	},
	fomantis: {
		inherit: true,
		gen: 3,
	},
	lurantis: {
		inherit: true,
		gen: 3,
	},
	morelull: {
		inherit: true,
		gen: 3,
		abilities: {0: "Illuminate", 1: "Effect Spore", H: "Lunar Charge"},
	},
	shiinotic: {
		inherit: true,
		gen: 3,
		abilities: {0: "Illuminate", 1: "Effect Spore", H: "Lunar Charge"},
		baseStats: {hp: 70, atk: 45, def: 80, spa: 90, spd: 100, spe: 30},
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
	turtonator: {
		inherit: true,
		gen: 3,
	},
	togedemaru: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 75, atk: 98, def: 73, spa: 40, spd: 83, spe: 96},
	},
	mimikyu: {
		inherit: true,
		gen: 3,
	},
	bruxish: {
		inherit: true,
		gen: 3,
	},
	drampa: {
		inherit: true,
		gen: 3,
	},
	tapukoko: {
		inherit: true,
		gen: 3,
	},
	tapubulu: {
		inherit: true,
		gen: 3,
	},
	buzzwole: {
		inherit: true,
		gen: 3,
		abilities: {0: "Beast Boost", H: "Intimidate"},
	},
	xurkitree: {
		inherit: true,
		gen: 3,
		abilities: {0: "Beast Boost", H: "Lightning Rod"},
	},
	celesteela: {
		inherit: true,
		gen: 3,
		abilities: {0: "Beast Boost", H: "Skill Link"},
	},
	guzzlord: {
		inherit: true,
		gen: 3,
		abilities: {0: "Beast Boost", H: "Thick Fat"},
	},
	sobble: {
		inherit: true,
		gen: 3,
	},
	drizzile: {
		inherit: true,
		gen: 3,
	},
	inteleon: {
		inherit: true,
		gen: 3,
	},
	nickit: {
		inherit: true,
		gen: 3,
	},
	thievul: {
		inherit: true,
		gen: 3,
		abilities: {0: "Nocturnal", 1: "Unburden", H: "Stakeout"},
	},
	sizzlipede: {
		inherit: true,
		gen: 3,
	},
	centiskorch: {
		inherit: true,
		gen: 3,
	},
	clobbopus: {
		inherit: true,
		gen: 3,
		abilities: {0: "Water Veil", H: "Technician"},
	},
	grapploct: {
		inherit: true,
		gen: 3,
		abilities: {0: "Water Veil", H: "Technician"},
	},
	impidimp: {
		inherit: true,
		gen: 3,
		abilities: {0: "Prankster", 1: "Defiant", H: "Pickpocket"},
	},
	morgrem: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 65, atk: 65, def: 45, spa: 75, spd: 55, spe: 70},
		abilities: {0: "Prankster", 1: "Defiant", H: "Pickpocket"},
	},
	grimmsnarl: {
		inherit: true,
		gen: 3,
		abilities: {0: "Prankster", 1: "Defiant", H: "Pickpocket"},
	},
	milcery: {
		inherit: true,
		gen: 3,
		abilities: {0: "Sweet Veil", H: "Aroma Veil"},
	},
	alcremie: {
		inherit: true,
		gen: 3,
		abilities: {0: "Sweet Veil", H: "Misty Surge"},
	},
	falinks: {
		inherit: true,
		gen: 3,
		types: ["Fighting", "Bug"],
	},
	snom: {
		inherit: true,
		gen: 3,
	},
	frosmoth: {
		inherit: true,
		gen: 3,
	},
	stonjourner: {
		inherit: true,
		gen: 3,
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
	duraludon: {
		inherit: true,
		gen: 3,
	},
	dreepy: {
		inherit: true,
		gen: 3,
	},
	drakloak: {
		inherit: true,
		gen: 3,
	},
	dragapult: {
		inherit: true,
		gen: 3,
	},
	quaxly: {
		inherit: true,
		gen: 3,
	},
	quaxwell: {
		inherit: true,
		gen: 3,
	},
	quaquaval: {
		inherit: true,
		gen: 3,
	},
	nymble: {
		inherit: true,
		gen: 3,
	},
	lokix: {
		inherit: true,
		gen: 3,
	},
	fidough: {
		inherit: true,
		gen: 3,
	},
	dachsbun: {
		inherit: true,
		gen: 3,
		types: ["Fairy", "Ground"],
	},
	squawkabilly: {
		inherit: true,
		gen: 3,
		types: ["Sound", "Flying"],
		baseStats: {hp: 82, atk: 96, def: 56, spa: 75, spd: 56, spe: 92},
	},
	squawkabillyblue: {
		inherit: true,
		gen: 3,
		types: ["Sound", "Flying"],
		baseStats: {hp: 82, atk: 96, def: 56, spa: 75, spd: 56, spe: 92},
	},
	squawkabillyyellow: {
		inherit: true,
		gen: 3,
		types: ["Sound", "Flying"],
		baseStats: {hp: 82, atk: 96, def: 56, spa: 75, spd: 56, spe: 92},
	},
	squawkabillywhite: {
		inherit: true,
		gen: 3,
		types: ["Sound", "Flying"],
		baseStats: {hp: 82, atk: 96, def: 56, spa: 75, spd: 56, spe: 92},
	},
	shroodle: {
		inherit: true,
		gen: 3,
	},
	grafaiai: {
		inherit: true,
		gen: 3,
	},
	bramblin: {
		inherit: true,
		gen: 3,
	},
	brambleghast: {
		inherit: true,
		gen: 3,
	},
	tinkatink: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 50, atk: 65, def: 45, spa: 35, spd: 64, spe: 58},
	},
	tinkatuff: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 65, atk: 75, def: 55, spa: 45, spd: 82, spe: 78},
	},
	tinkaton: {
		inherit: true,
		gen: 3,
		baseStats: {hp: 85, atk: 90, def: 77, spa: 55, spd: 105, spe: 94},
	},
	varoom: {
		inherit: true,
		gen: 3,
	},
	revavroom: {
		inherit: true,
		gen: 3,
		abilities: {0: "Speed Boost", H: "Filter"},
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
		abilities: {0: "Protosynthesis", H: "Sap Sipper"},
	},
	ironjugulis: {
		inherit: true,
		gen: 3,
		abilities: {0: "Quark Drive", H: "Lightning Rod"},
	},
};
