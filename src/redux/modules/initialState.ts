import { craftOpponent, Game } from "../../models";
import _ from "lodash/fp";
import {
  EntityContainer,
  Player,
  CardContainer,
  Hero,
  Ability,
  CardClass,
  Step,
  Zone,
  craftMinions,
  craftWeapons,
  entitiesFrom,
  craftPlayer,
  craftHero
} from "../../models";

// PLAYERS
const player: Player = craftPlayer({
  mana: 5,
  maximumMana: 5
});
const opponent: Player = craftOpponent();

// HEROES
const playerHero: Hero = craftHero({
  cardClass: CardClass.Shaman,
  cardID: "HERO_02",
  name: "Thrall",
  owner: player.id
});

const opponentHero: Hero = craftHero({
  cardClass: CardClass.Hunter,
  cardID: "HERO_01",
  armor: 3,
  name: "Garrosh",
  owner: opponent.id
});

player.heroID = playerHero.id;
opponent.heroID = opponentHero.id;

// MINIONS
const handMinions = craftMinions(
  {
    abilities: [Ability.Charge],
    attack: 2,
    cardID: "CS2_173",
    cost: 2,
    maxHealth: 1,
    name: "Bluegill Warrior",
    owner: player.id,
    zone: Zone.Hand
  },
  {
    abilities: [Ability.Windfury],
    attack: 3,
    cardID: "EX1_587",
    cost: 4,
    maxHealth: 4,
    name: "Windspeaker",
    owner: player.id,
    zone: Zone.Hand
  },
  {
    attack: 6,
    cardID: "CS2_200",
    cost: 6,
    maxHealth: 7,
    name: "Boulderfist Ogre",
    owner: opponent.id,
    zone: Zone.Hand
  }
);

const minions = craftMinions(
  {
    attack: 1,
    cardID: "CS2_189",
    cost: 1,
    maxHealth: 1,
    name: "Elven archer",
    owner: opponent.id,
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
    owner: player.id,
    zone: Zone.Play
  },
  {
    attack: 200,
    cardID: "CS2_147",
    cost: 4,
    exhausted: false,
    maxHealth: 4,
    name: "Gnomish Inventor",
    owner: player.id,
    zone: Zone.Play
  }
);

// WEAPONS
const handWeapons = craftWeapons({
  attack: 3,
  cardID: "CS2_106",
  cost: 3,
  durability: 2,
  name: "Fiery War Axe",
  owner: opponent.id,
  zone: Zone.Hand
});

// CARDS
const hand: CardContainer = { ...handMinions, ...handWeapons };

const deck = craftMinions(
  {
    attack: 3,
    cardID: "CS2_172",
    cost: 2,
    maxHealth: 2,
    name: "Bloodfen Raptor",
    owner: player.id,
    zone: Zone.Deck
  },
  {
    abilities: [Ability.Taunt],
    attack: 5,
    cardID: "CS2_187",
    cost: 5,
    maxHealth: 4,
    name: "Booty Bay Bodyguard",
    owner: opponent.id,
    zone: Zone.Deck
  },
  {
    attack: 3,
    cardID: "CS2_182",
    cost: 4,
    maxHealth: 4,
    name: "Chillwind Yeti",
    owner: player.id,
    zone: Zone.Deck
  },
  {
    abilities: [Ability.Taunt],
    attack: 2,
    cardID: "CS2_121",
    cost: 2,
    maxHealth: 2,
    name: "Frostwolf Grunt",
    owner: opponent.id,
    zone: Zone.Deck
  },
  {
    attack: 2,
    cardID: "CS2_141",
    cost: 3,
    maxHealth: 2,
    name: "Ironforge Rifleman",
    owner: player.id,
    zone: Zone.Deck
  },
  {
    attack: 3,
    cardID: "CS2_125",
    cost: 3,
    maxHealth: 3,
    name: "Ironfur Grizzly",
    owner: player.id,
    zone: Zone.Deck
  }
);

// TODO: refactor
export const play: EntityContainer = {
  ...entitiesFrom([player, opponent, playerHero, opponentHero]),
  ...minions
};

const firstPlayerId = _.sample([player.id, opponent.id]) as number; // TODO: add a coin toss action

const initialState: Game = {
  deck,
  hand,
  play,
  graveyard: {},
  secret: {},
  setAside: {},
  state: {
    activePlayer: firstPlayerId,
    step: Step.BeginFirst,
    playerID: player.id,
    opponentID: opponent.id,
    playerHeroID: playerHero.id,
    opponentHeroID: opponentHero.id,
    turn: 1
  }
};

export default initialState;
