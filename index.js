import { combat,heal,hunkerDown,strongBlow,chargeAttack,coinToss,Puzzle, getTimeSpent    /*<-- function names here*/} from "./functions.js"
import { Enemy,Player      /*<-- class names here*/} from "./classes.js"
import {difficultyInquiry, classInquiry , nameInquiry, wait      /*<-- inquiry funciton names*/} from "./inquiries.js"

import {combatOneHint, combatTwoHint, combatThreeHint,      /*<-- dialogue variable names*/
elfIntroScene,
dwarfIntroScene,
humanIntroScene,
wizardIntroScene} from "./dialogue.js"
import chalk from "chalk";

await wait(chalk.yellow(`#### ##   ## ##   ##   ##  ### ##             ## ##   ### ###           ##   ##  ##  ##   #### ##  ###  ##  ### ##     ##     ####       ####    ## ##
  # ## ##  ##   ##   ## ##    ##  ##           ##   ##   ##  ##            ## ##   ##  ##   # ## ##   ##  ##   ##  ##     ##     ##         ##    ##   ##   
    ##     ##   ##  # ### #   ##  ##           ##   ##   ##               # ### #  ##  ##     ##      ##  ##   ##  ##   ## ##    ##         ##    ####     
    ##     ##   ##  ## # ##   ## ##            ##   ##   ## ##            ## # ##   ## ##     ##      ## ###   ## ##    ##  ##   ##         ##     #####  
    ##     ##   ##  ##   ##   ##  ##           ##   ##   ##               ##   ##    ##       ##      ##  ##   ## ##    ## ###   ##         ##        ###  
    ##     ##   ##  ##   ##   ##  ##           ##   ##   ##               ##   ##    ##       ##      ##  ##   ##  ##   ##  ##   ##  ##     ##    ##   ##  
   ####     ## ##   ##   ##  ### ##             ## ##   ####              ##   ##    ##      ####    ###  ##  #### ##  ###  ##  ### ###    ####    ## ##   `))

// mark the time at which the game starts
export const gameStart = new Date();

// run difficulty inquiry
let difficulty = await difficultyInquiry();

// run class inquiry
let characterClass = await classInquiry();

// run name inquiry
let characterName = await nameInquiry();

// console.log(difficulty, characterClass, characterName)

let turnqueue = []
let currentTurn = 0

// Create Monster Objects
// health, attack, defence, name, trait, playerName
const monsterOne = new Enemy(50, 10, 25, "Fretral The Goblin Scout", "stealth", characterName.name)
const monsterTwo = new Enemy(75, 10, 25, "Asterion The Minotaur", "chargedAttack", characterName.name)
const monsterThree = new Enemy(100, 10, 75, "Shelldon The Crawfish", "defence", characterName.name)

//health, attack, defence, special, specialName, name
let choice = characterClass.class;

let player
let elf = chalk.greenBright("Elf - (Health Specialist)")
let dwarf = chalk.blueBright("Dwarf - (Defense Specialist)")
let human = chalk.red("Human - (Attack Specialist)")
let wizard = chalk.rgb(138, 19, 187)("Wizard - (Luck Specialist)")



if ( choice == elf) {player = new Player(125,15,15,heal,"Heal", `increases ${characterName.name}'s health by 20`, characterName.name);
    await wait(elfIntroScene)
    await wait ("Elf dialogue before first fight");}

else if (choice == dwarf ) {player = new Player(100,15,25,hunkerDown,"Hunker Down",`increases ${characterName.name}'s defence by 2.5* for 3 turns`, characterName.name);
    await wait(dwarfIntroScene)
    await wait ("Dwarf dialogue before first fight");}

else if (choice == human) {player = new Player(100,20,15,strongBlow,"Strong Blow",`increases ${characterName.name}'s attack by 2* for 2 turns`, characterName.name);
    await wait(humanIntroScene)
    await wait ("Human dialogue before first fight");}
else if (choice == wizard) {player = new Player(100,10,16,coinToss,"Coin Toss",`${characterName.name} flips a coin to decide his fate`, characterName.name); 
    await wait(wizardIntroScene)
    await wait ("wizard dialogue before first fight");}


// Combat 1 Hint
if (difficulty.difficulty == "Easy - (hints included)") {
    console.log("Hint for Combat One:");
    await wait(combatOneHint)
}
// Combat One
if(!await combat(player,monsterOne,turnqueue,currentTurn)) {
    process.exit(0);
}

// reset turnqueue and currentTurn
turnqueue.splice(0,turnqueue.length)
currentTurn = 0

await wait("dialogue for entering the second room")
if(choice == elf){
 await wait ("Elf dialogue before second fight");  
} else if (choice == dwarf) {
   await wait ("dwarf dialogue before second fight");
} else if (choice == human){
   await wait ("human dialogue before second fight");
} else if (choice == wizard){
   await wait ("wizard dialogue before second fight");
}

// Combat 2 Hint
if (difficulty.difficulty == "Easy - (hints included)") {
    console.log("Hint for Combat Two:");
    await wait(combatTwoHint)
}
// Combat Two
if(!await combat(player,monsterTwo,turnqueue,currentTurn)) {
    process.exit(0);
}

// reset turnqueue and currentTurn
turnqueue.splice(0,turnqueue.length)

currentTurn = 0

await wait("dialogue for entering the third room")
if(choice == elf){
 await wait ("Elf dialogue before third fight");  
} else if (choice == dwarf) {
   await wait ("dwarf dialogue before third fight");
} else if (choice == human){
   await wait ("human dialogue before third fight");
} else if (choice == wizard){
   await wait ("wizard dialogue before third fight");
}

// Combat 3 Hint
if (difficulty.difficulty == "Easy - (hints included)") {
    console.log("Hint for Combat Three:");
    await wait(combatThreeHint)
}
// Combat Three
if (!await combat(player,monsterThree,turnqueue,currentTurn)) {
    process.exit(0);
}

await wait("victory dialogue")

if (await Puzzle()) {
    await wait("you got out with the artifact dialogue");
    // log time spent in game
    console.log(getTimeSpent(gameStart, new Date, true));
    process.exit(0);
}
else {
    await wait("died in the maze");
    // log time spent in game
    console.log(getTimeSpent(gameStart, new Date, false));
    process.exit(0);
}