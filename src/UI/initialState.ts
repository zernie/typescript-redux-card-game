import { Game } from "../Game";
import { craftHero, Hero } from "../Hero";
import { CardContainer, cardListFrom } from "../Card";
import { entitiesFrom } from "../Board";
import { Ability, CardClass, Controller, Step, Zone } from "../enums";
import { EntityContainer } from "../Entity";
import { craftMinions } from "../Minion";
import { craftWeapons } from "../Weapon";
import { craftPlayer, Player } from "../Player";

const handMinions = craftMinions([
  {
    abilities: [Ability.Charge],
    attack: 2,
    cardID: "CS2_173",
    cost: 2,
    maxHealth: 1,
    name: "Bluegill Warrior",
    owner: Controller.Player,
    zone: Zone.Hand
  },
  {
    abilities: [Ability.Windfury],
    attack: 3,
    cardID: "EX1_587",
    cost: 4,
    maxHealth: 4,
    name: "Windspeaker",
    owner: Controller.Player,
    zone: Zone.Hand
  },
  {
    attack: 6,
    cardID: "CS2_200",
    cost: 6,
    maxHealth: 7,
    name: "Boulderfist Ogre",
    owner: Controller.Opponent,
    zone: Zone.Hand
  }
]);

const handWeapons = craftWeapons([
  {
    attack: 3,
    cardID: "CS2_106",
    cost: 3,
    durability: 2,
    name: "Fiery War Axe",
    owner: Controller.Opponent,
    zone: Zone.Hand
  }
]);

const hand: CardContainer = cardListFrom([...handMinions, ...handWeapons]);
const rawDeck = [
  {
    attack: 3,
    cardID: "CS2_172",
    cost: 2,
    maxHealth: 2,
    name: "Bloodfen Raptor",
    owner: Controller.Player,
    zone: Zone.Deck
  },
  {
    abilities: [Ability.Taunt],
    attack: 5,
    cardID: "CS2_187",
    cost: 5,
    maxHealth: 4,
    name: "Booty Bay Bodyguard",
    owner: Controller.Opponent,
    zone: Zone.Deck
  },
  {
    attack: 3,
    cardID: "CS2_182",
    cost: 4,
    maxHealth: 4,
    name: "Chillwind Yeti",
    owner: Controller.Player,
    zone: Zone.Deck
  },
  {
    attack: 2,
    cardID: "CS2_121",
    cost: 2,
    maxHealth: 2,
    name: "Frostwolf Grunt",
    owner: Controller.Opponent,
    zone: Zone.Deck
  },
  {
    attack: 2,
    cardID: "CS2_141",
    cost: 3,
    maxHealth: 2,
    name: "Ironforge Rifleman",
    owner: Controller.Player,
    zone: Zone.Deck
  },
  {
    attack: 3,
    cardID: "CS2_125",
    cost: 3,
    maxHealth: 3,
    name: "Ironfur Grizzly",
    owner: Controller.Player,
    zone: Zone.Deck
  }
];

const deck: CardContainer = cardListFrom(craftMinions(rawDeck));

const playerHero: Hero = craftHero({
  cardID: "HERO_02",
  name: "Thrall",
  owner: Controller.Player,
  zone: Zone.Play
});

const opponentHero: Hero = craftHero({
  cardID: "HERO_01",
  armor: 3,
  name: "Garrosh",
  owner: Controller.Opponent,
  zone: Zone.Play
});
const player: Player = craftPlayer({
  cardClass: CardClass.Shaman,
  name: "Player",
  owner: Controller.Player,
  hero: playerHero.id,
  mana: 5,
  maximumMana: 5
});
const opponent: Player = craftPlayer({
  cardClass: CardClass.Hunter,
  name: "Opponent",
  owner: Controller.Opponent,
  hero: opponentHero.id
});

const minions = craftMinions([
  {
    attack: 1,
    cardID: "CS2_189",
    cost: 1,
    exhausted: false,
    maxHealth: 1,
    name: "Elven archer",
    owner: Controller.Opponent,
    zone: Zone.Play
  },
  {
    abilities: [Ability.Taunt],
    attack: 2,
    cardID: "CS2_121",
    cost: 2,
    exhausted: false,
    maxHealth: 2,
    name: "Frostwolf Grunt",
    owner: Controller.Opponent,
    zone: Zone.Play
  },
  {
    attack: 200,
    cardID: "CS2_147",
    cost: 4,
    exhausted: false,
    maxHealth: 4,
    name: "Gnomish Inventor",
    owner: Controller.Player,
    zone: Zone.Play
  }
]);

export const play: EntityContainer = entitiesFrom([
  player,
  opponent,

  playerHero,
  opponentHero,

  ...minions
]);

const initialState: Game = {
  deck,
  hand,
  play,
  graveyard: {},
  secret: {},
  setAside: {},
  state: {
    activePlayer: Controller.Player,
    step: Step.BeginFirst,
    playerID: player.id,
    opponentID: opponent.id,
    turn: 1
  }
};

export default initialState;
