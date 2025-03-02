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
		types: ["Electric", "Flying"],
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
	raichu: {
		inherit: true,
		baseStats: {hp: 50, atk: 80, def: 55, spa: 80, spd: 60, spe: 100},
	},
	raichualola: {
		inherit: true,
		baseStats: {hp: 50, atk: 75, def: 50, spa: 85, spd: 65, spe: 100},
	},
	sandshrew: {
		inherit: true,
		abilities: {0: "Rough Skin", H: "Sand Rush"},
	},
	sandshrewalola: {
		inherit: true,
		abilities: {0: "Rough Skin", H: "Slush Rush"},
	},
	sandslash: {
		inherit: true,
		abilities: {0: "Rough Skin", H: "Sand Rush"},
	},
	sandslashalola: {
		inherit: true,
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
		abilities: {0: "Intimidate", H: "Infiltrator"},
	},
	crobat: {
		inherit: true,
		abilities: {0: "Merciless", H: "Infiltrator"},
	},
	ninetales: {
		inherit: true,
		types: ["Fire", "Fairy"],
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
		baseStats: {hp: 60, atk: 95, def: 80, spa: 60, spd: 100, spe: 30},
	},
	diglett: {
		inherit: true,
		abilities: {0: "Sharp", 1: "Arena Trap", H: "Sand Force"},
	},
	dugtrio: {
		inherit: true,
		baseStats: {hp: 35, atk: 100, def: 50, spa: 50, spd: 70, spe: 120},
		abilities: {0: "Sharp", 1: "Arena Trap", H: "Sand Force"},
	},
	persian: {
		inherit: true,
		baseStats: {hp: 65, atk: 85, def: 60, spa: 80, spd: 65, spe: 115},
	},
	persianalola: {
		inherit: true,
		baseStats: {hp: 65, atk: 75, def: 60, spa: 90, spd: 65, spe: 115},
	},
	perrserker: {
		inherit: true,
		baseStats: {hp: 75, atk: 110, def: 100, spa: 60, spd: 75, spe: 50},
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
		baseStats: {hp: 55, atk: 50, def: 65, spa: 175, spd: 105, spe: 150},
	},
	victreebel: {
		inherit: true,
		baseStats: {hp: 80, atk: 105, def: 65, spa: 100, spd: 70, spe: 70},
	},
	golem: {
		inherit: true,
		baseStats: {hp: 80, atk: 120, def: 130, spa: 55, spd: 65, spe: 45},
	},
	rapidash: {
		inherit: true,
		baseStats: {hp: 65, atk: 100, def: 70, spa: 80, spd: 80, spe: 115},
	},
	rapidashgalar: {
		inherit: true,
		baseStats: {hp: 65, atk: 100, def: 70, spa: 80, spd: 80, spe: 115},
	},
	farfetchd: {
		inherit: true,
		baseStats: {hp: 52, atk: 90, def: 55, spa: 58, spd: 62, spe: 90},
	},
	farfetchdgalar: {
		inherit: true,
		baseStats: {hp: 52, atk: 95, def: 55, spa: 58, spd: 62, spe: 55},
	},
	doduo: {
		inherit: true,
		types: ["Ground", "Flying"],
	},
	dodrio: {
		inherit: true,
		types: ["Ground", "Flying"],
		baseStats: {hp: 60, atk: 110, def: 70, spa: 60, spd: 60, spe: 110},
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
	electrode: {
		inherit: true,
		types: ["Electric", "Sound"],
		baseStats: {hp: 60, atk: 50, def: 70, spa: 80, spd: 80, spe: 150},
	},
	exeggutor: {
		inherit: true,
		baseStats: {hp: 95, atk: 95, def: 85, spa: 125, spd: 75, spe: 55},
	},
	hitmonchan: {
		inherit: true,
		abilities: {0: "Stamina", 1: "Iron Fist", H: "Inner Focus"},
	},
	hitmontop: {
		inherit: true,
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
	seaking: {
		inherit: true,
		types: ["Water", "Electric"],
	},
	mimejr: {
		inherit: true,
		types: ["Psychic", "Fairy"],
	},
	mrmime: {
		inherit: true,
		types: ["Psychic", "Fairy"],
	},
	kleavor: {
		inherit: true,
		abilities: {0: "Swarm", 1: "Sheer Force", H: "Sharpness"},
	},
	jynx: {
		inherit: true,
		evos: ["Kisscope"],
	},
	magmortar: {
		inherit: true,
		baseStats: {hp: 75, atk: 95, def: 67, spa: 130, spd: 95, spe: 83},
	},
	electivire: {
		inherit: true,
		types: ["Electric", "Fighting"],
		baseStats: {hp: 75, atk: 123, def: 67, spa: 95, spd: 85, spe: 100},
	},
	pinsir: {
		inherit: true,
		types: ["Bug", "Ground"],
	},
	taurospaldeablaze: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Anger Point", H: "Flame Body"},
	},
	taurospaldeaaqua: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Anger Point", H: "Swift Swim"},
	},
	munchlax: {
		inherit: true,
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
	jumpluff: {
		inherit: true,
		baseStats: {hp: 75, atk: 65, def: 70, spa: 65, spd: 95, spe: 110},
	},
	sunflora: {
		inherit: true,
		types: ["Grass", "Fire"],
		baseStats: {hp: 75, atk: 75, def: 55, spa: 105, spd: 85, spe: 50},
	},
	yanmega: {
		inherit: true,
		types: ["Bug", "Dragon"],
	},
	murkrow: {
		inherit: true,
		abilities: {0: "Technician", 1: "Super Luck", H: "Prankster"},
	},
	honchkrow: {
		inherit: true,
		abilities: {0: "Executioner", 1: "Super Luck", H: "Moxie"},
	},
	misdreavus: {
		inherit: true,
		types: ["Ghost", "Fairy"],
	},
	mismagius: {
		inherit: true,
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
		baseStats: {hp: 110, atk: 140, def: 95, spa: 75, spd: 80, spe: 50},
		abilities: {0: "Guts", 1: "Miracle Guard", H: "Nocturnal"},
	},
	ursalunabloodmoon: {
		inherit: true,
		types: ["Ground", "Psychic"],
	},
	slugma: {
		inherit: true,
		abilities: {0: "Dry Skin", 1: "Flame Body", H: "Weak Armor"},
	},
	magcargo: {
		inherit: true,
		baseStats: {hp: 60, atk: 70, def: 120, spa: 90, spd: 80, spe: 30},
		abilities: {0: "Dry Skin", 1: "Flame Body", H: "Weak Armor"},
	},
	corsola: {
		inherit: true,
		baseStats: {hp: 65, atk: 55, def: 95, spa: 65, spd: 95, spe: 35},
	},
	octillery: {
		inherit: true,
		types: ["Water", "Fire"],
		baseStats: {hp: 75, atk: 105, def: 85, spa: 105, spd: 85, spe: 25},
	},
	delibird: {
		inherit: true,
		abilities: {0: "Vital Spirit", 1: "Huge Power", H: "Refrigerate"},
	},
	mantine: {
		inherit: true,
		baseStats: {hp: 85, atk: 40, def: 70, spa: 80, spd: 140, spe: 70},
	},
	stantler: {
		inherit: true,
		types: ["Normal", "Ice"],
	},
	wyrdeer: {
		inherit: true,
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
	mightyena: {
		inherit: true,
		baseStats: {hp: 70, atk: 90, def: 70, spa: 70, spd: 70, spe: 90},
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
		baseStats: {hp: 90, atk: 75, def: 90, spa: 60, spd: 120, spe: 75},
		abilities: {0: "Scrappy", 1: "Miracle Guard", H: "Contrary"},
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
	glaliemega: {
		inherit: true,
		types: ["Ice", "Dark"],
		gender: "M",
		baseStats: {hp: 70, atk: 120, def: 80, spa: 120, spd: 80, spe: 110},
	},
	clamperl: {
		inherit: true,
		baseStats: {hp: 45, atk: 64, def: 85, spa: 74, spd: 55, spe: 32},
	},
	huntail: {
		inherit: true,
		abilities: {0: "Strong Jaw", H: "Water Veil"},
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
	grotle: {
		inherit: true,
		types: ["Grass", "Ground"],
	},
	piplup: {
		inherit: true,
		abilities: {0: "Torrent", H: "Competitive", S: "Defiant"},
	},
	prinplup: {
		inherit: true,
		abilities: {0: "Torrent", H: "Competitive", S: "Defiant"},
	},
	empoleon: {
		inherit: true,
		abilities: {0: "Torrent", H: "Competitive", S: "Defiant"},
	},
	kricketune: {
		inherit: true,
		types: ["Bug", "Sound"],
	},
	cranidos: {
		inherit: true,
		abilities: {0: "Mold Breaker", H: "Sand Rush"},
	},
	rampardos: {
		inherit: true,
		baseStats: {hp: 97, atk: 165, def: 60, spa: 65, spd: 50, spe: 68},
		abilities: {0: "Mold Breaker", H: "Sand Rush"},
	},
	bastiodon: {
		inherit: true,
		baseStats: {hp: 70, atk: 52, def: 168, spa: 47, spd: 138, spe: 30},
	},
	chatot: {
		inherit: true,
		types: ["Sound", "Flying"],
	},
	spiritomb: {
		inherit: true,
		abilities: {0: "Pressure", H: "Moonrise"},
	},
	drapion: {
		inherit: true,
		abilities: {0: "Battle Armor", 1: "Sniper", H: "Merciless"},
	},
	croagunk: {
		inherit: true,
		abilities: {0: "Opportunist", 1: "Dry Skin", H: "Poison Touch"},
	},
	toxicroak: {
		inherit: true,
		baseStats: {hp: 83, atk: 106, def: 65, spa: 96, spd: 65, spe: 85},
		abilities: {0: "Opportunist", 1: "Dry Skin", H: "Poison Touch"},
	},
	carnivine: {
		inherit: true,
		types: ["Grass", "Dark"],
		baseStats: {hp: 84, atk: 100, def: 72, spa: 90, spd: 72, spe: 46},
		abilities: {0: "Flytrap"},
	},
	lucario: {
		inherit: true,
		baseStats: {hp: 70, atk: 110, def: 70, spa: 105, spd: 70, spe: 90},
	},
	lucariomega: {
		inherit: true,
		baseStats: {hp: 70, atk: 145, def: 83, spa: 140, spd: 70, spe: 107},
	},
	rotomheat: {
		inherit: true,
		types: ["Electric", "Fire"],
	},
	rotomwash: {
		inherit: true,
		types: ["Electric", "Water"],
	},
	rotomfrost: {
		inherit: true,
		types: ["Electric", "Ice"],
	},
	rotomfan: {
		inherit: true,
		types: ["Electric", "Fairy"],
	},
	rotommow: {
		inherit: true,
		types: ["Electric", "Grass"],
	},
	phione: {
		inherit: true,
		types: ["Water", "Fairy"],
		baseStats: {hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85},
	},
	samurott: {
		inherit: true,
		types: ["Water", "Fighting"],
	},
	samurotthisui: {
		inherit: true,
		abilities: {0: "Torrent", H: "Sharpness"},
	},
	musharna: {
		inherit: true,
		abilities: {0: "Comatose", 1: "Synchronize", H: "Telepathy"},
	},
	unfezant: {
		inherit: true,
		baseStats: {hp: 80, atk: 115, def: 80, spa: 75, spd: 55, spe: 93},
	},
	zebstrika: {
		inherit: true,
		types: ["Electric", "Fire"],
		abilities: {0: "Flash Fire", 1: "Motor Drive", H: "Sap Sipper"},
	},
	roggenrola: {
		inherit: true,
		abilities: {0: "Sturdy", 1: "Weak Armor", H: "Sand Force"},
	},
	boldore: {
		inherit: true,
		abilities: {0: "Sturdy", 1: "Weak Armor", H: "Sand Force"},
	},
	gigalith: {
		inherit: true,
		baseStats: {hp: 85, atk: 135, def: 130, spa: 60, spd: 80, spe: 25},
		abilities: {0: "Sturdy", 1: "Sand Stream", H: "Sand Force"},
	},
	leavanny: {
		inherit: true,
		baseStats: {hp: 75, atk: 103, def: 80, spa: 70, spd: 80, spe: 92},
	},
	venipede: {
		inherit: true,
		abilities: {0: "Poison Point", 1: "Swarm", H: "Speed Boost", S: "Quick Feet"},
	},
	whirlipede: {
		inherit: true,
		abilities: {0: "Poison Point", 1: "Swarm", H: "Speed Boost", S: "Quick Feet"},
	},
	scolipede: {
		inherit: true,
		abilities: {0: "Poison Point", 1: "Swarm", H: "Speed Boost", S: "Quick Feet"},
	},
	litwick: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Flame Body", H: "Infiltrator", S: "Shadow Tag"},
	},
	lampent: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Flame Body", H: "Infiltrator", S: "Shadow Tag"},
	},
	chandelure: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Flame Body", H: "Infiltrator", S: "Shadow Tag"},
	},
	axew: {
		inherit: true,
		abilities: {0: "Executioner", 1: "Mold Breaker", H: "Unnerve"},
	},
	fraxure: {
		inherit: true,
		abilities: {0: "Executioner", 1: "Mold Breaker", H: "Unnerve"},
	},
	haxorus: {
		inherit: true,
		abilities: {0: "Executioner", 1: "Mold Breaker", H: "Unnerve"},
	},
	cubchoo: {
		inherit: true,
		abilities: {0: "Miracle Guard", 1: "Slush Rush", H: "Rattled"},
	},
	beartic: {
		inherit: true,
		types: ["Ice", "Rock"],
		abilities: {0: "Miracle Guard", 1: "Slush Rush", H: "Swift Swim"},
		baseStats: {hp: 95, atk: 130, def: 80, spa: 70, spd: 80, spe: 50},
	},
	cryogonal: {
		inherit: true,
		abilities: {0: "Levitate", H: "Technician"},
		baseStats: {hp: 80, atk: 50, def: 50, spa: 95, spd: 135, spe: 105},
	},
	accelgor: {
		inherit: true,
		types: ["Bug", "Water"],
	},
	druddigon: {
		inherit: true,
		types: ["Dragon", "Rock"],
	},
	pawniard: {
		inherit: true,
		abilities: {0: "Defiant", 1: "Inner Focus", H: "Sharp"},
	},
	bisharp: {
		inherit: true,
		abilities: {0: "Defiant", 1: "Inner Focus", H: "Sharp"},
	},
	bouffalant: {
		inherit: true,
		types: ["Normal", "Rock"],
	},
	gogoat: {
		inherit: true,
		types: ["Grass", "Rock"],
	},
	pancham: {
		inherit: true,
		abilities: {0: "Iron Fist", 1: "Miracle Guard", H: "Scrappy"},
	},
	pangoro: {
		inherit: true,
		abilities: {0: "Iron Fist", 1: "Miracle Guard", H: "Scrappy"},
	},
	aegislash: {
		inherit: true,
		baseStats: {hp: 60, atk: 50, def: 140, spa: 50, spd: 140, spe: 60},
	},
	aegislashblade: {
		inherit: true,
		baseStats: {hp: 60, atk: 140, def: 50, spa: 140, spd: 50, spe: 60},
	},
	spritzee: {
		inherit: true,
		abilities: {0: "Healer", H: "Immunity"},
	},
	aromatisse: {
		inherit: true,
		types: ["Fairy", "Poison"],
		abilities: {0: "Cleanser", H: "Filter"},
	},
	goomy: {
		inherit: true,
		types: ["Dragon", "Water"],
	},
	sliggoo: {
		inherit: true,
		types: ["Dragon", "Water"],
	},
	goodra: {
		inherit: true,
		types: ["Dragon", "Water"],
	},
	trevenant: {
		inherit: true,
		abilities: {0: "Natural Cure", 1: "Deadwood", H: "Harvest"},
	},
	toucannon: {
		inherit: true,
		abilities: {0: "Heatproof", 1: "Skill Link", H: "Sheer Force"},
	},
	lycanroc: {
		inherit: true,
		types: ["Rock", "Normal"],
	},
	lycanrocmidnight: {
		inherit: true,
		types: ["Rock", "Dark"],
		abilities: {0: "Keen Eye", 1: "Nocturnal", H: "No Guard"},
	},
	lycanrocdusk: {
		inherit: true,
		types: ["Rock", "Fighting"],
	},
	morelull: {
		inherit: true,
		abilities: {0: "Illuminate", 1: "Effect Spore", H: "Lunar Charge"},
	},
	shiinotic: {
		inherit: true,
		abilities: {0: "Illuminate", 1: "Effect Spore", H: "Lunar Charge"},
		baseStats: {hp: 70, atk: 45, def: 80, spa: 90, spd: 100, spe: 30},
	},
	silvally: {
		inherit: true,
		otherFormes: ["Silvally-Bug", "Silvally-Dark", "Silvally-Dragon", "Silvally-Electric", "Silvally-Fairy", "Silvally-Fighting", "Silvally-Fire", "Silvally-Flying", "Silvally-Ghost", "Silvally-Grass", "Silvally-Ground", "Silvally-Ice", "Silvally-Poison", "Silvally-Psychic", "Silvally-Rock", "Silvally-Steel", "Silvally-Water", "Silvally-Sound"],
		formeOrder: [
			"Silvally", "Silvally-Fighting", "Silvally-Flying", "Silvally-Poison", "Silvally-Ground", "Silvally-Rock", "Silvally-Bug", "Silvally-Ghost", "Silvally-Steel",
			"Silvally-Fire", "Silvally-Water", "Silvally-Grass", "Silvally-Electric", "Silvally-Psychic", "Silvally-Ice", "Silvally-Dragon", "Silvally-Dark", "Silvally-Fairy", 
			"Silvally-Sound",
		],
	},
	togedemaru: {
		inherit: true,
		baseStats: {hp: 75, atk: 98, def: 73, spa: 40, spd: 83, spe: 96},
	},
	buzzwole: {
		inherit: true,
		abilities: {0: "Beast Boost", H: "Intimidate"},
	},
	xurkitree: {
		inherit: true,
		abilities: {0: "Beast Boost", H: "Lightning Rod"},
	},
	celesteela: {
		inherit: true,
		abilities: {0: "Beast Boost", H: "Skill Link"},
	},
	guzzlord: {
		inherit: true,
		abilities: {0: "Beast Boost", H: "Thick Fat"},
	},
	meltan: {
		inherit: true,
		evos: ["Melmetal"],
	},
	melmetal: {
		inherit: true,
		prevo: "Meltan",
	},
	thievul: {
		inherit: true,
		abilities: {0: "Nocturnal", 1: "Unburden", H: "Stakeout"},
	},
	yamper: {
		inherit: true,
		types: ["Electric", "Normal"],
	},
	boltund: {
		inherit: true,
		types: ["Electric", "Normal"],
	},
	clobbopus: {
		inherit: true,
		abilities: {0: "Water Veil", H: "Technician"},
	},
	grapploct: {
		inherit: true,
		abilities: {0: "Water Veil", H: "Technician"},
	},
	impidimp: {
		inherit: true,
		abilities: {0: "Prankster", 1: "Defiant", H: "Pickpocket"},
	},
	morgrem: {
		inherit: true,
		baseStats: {hp: 65, atk: 65, def: 45, spa: 75, spd: 55, spe: 70},
		abilities: {0: "Prankster", 1: "Defiant", H: "Pickpocket"},
	},
	grimmsnarl: {
		inherit: true,
		abilities: {0: "Prankster", 1: "Defiant", H: "Pickpocket"},
	},
	milcery: {
		inherit: true,
		abilities: {0: "Sweet Veil", H: "Aroma Veil"},
	},
	alcremie: {
		inherit: true,
		abilities: {0: "Sweet Veil", H: "Misty Surge"},
	},
	falinks: {
		inherit: true,
		types: ["Fighting", "Bug"],
	},
	pincurchin: {
		inherit: true,
		abilities: {0: "Rough Skin", H: "Electric Surge"},
	},
	dachsbun: {
		inherit: true,
		types: ["Fairy", "Ground"],
	},
	squawkabilly: {
		inherit: true,
		types: ["Sound", "Flying"],
		baseStats: {hp: 82, atk: 96, def: 56, spa: 75, spd: 56, spe: 92},
	},
	squawkabillyblue: {
		inherit: true,
		types: ["Sound", "Flying"],
		baseStats: {hp: 82, atk: 96, def: 56, spa: 75, spd: 56, spe: 92},
	},
	squawkabillyyellow: {
		inherit: true,
		types: ["Sound", "Flying"],
		baseStats: {hp: 82, atk: 96, def: 56, spa: 75, spd: 56, spe: 92},
	},
	squawkabillywhite: {
		inherit: true,
		types: ["Sound", "Flying"],
		baseStats: {hp: 82, atk: 96, def: 56, spa: 75, spd: 56, spe: 92},
	},
	tinkatink: {
		inherit: true,
		baseStats: {hp: 50, atk: 65, def: 45, spa: 35, spd: 64, spe: 58},
	},
	tinkatuff: {
		inherit: true,
		baseStats: {hp: 65, atk: 75, def: 55, spa: 45, spd: 82, spe: 78},
	},
	tinkaton: {
		inherit: true,
		baseStats: {hp: 85, atk: 90, def: 77, spa: 55, spd: 105, spe: 94},
	},
	revavroom: {
		inherit: true,
		abilities: {0: "Speed Boost", H: "Filter"},
	},
	brutebonnet: {
		inherit: true,
		abilities: {0: "Protosynthesis", H: "Anger Point"},
	},
	sandyshocks: {
		inherit: true,
		abilities: {0: "Protosynthesis", H: "Magnet Pull"},
	},
	ironjugulis: {
		inherit: true,
		abilities: {0: "Quark Drive", H: "Galvanize"},
	},

	vibraye: {
		inherit: true,
		types: ["Dark", "Sound"],
	},
};
