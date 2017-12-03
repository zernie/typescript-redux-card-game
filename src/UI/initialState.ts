import * as R from 'ramda';
import { Game } from '../Game';
import { craftHero, Hero } from '../Hero';
import {
  CardContainer,
  cardListFrom,
  craftMinionCard,
  craftWeaponCard,
} from '../Card';
import { entitiesFrom } from '../Board';
import { craftMinion } from '../Minion';
import { Ability } from '../enums';
import { Controller, Step, Zone } from '../enums';
import { EntityContainer } from '../Entity';

const handMinions = R.map(craftMinionCard, [
  {
    abilities: [Ability.Charge],
    attack: 2,
    cardID: 'CS2_173',
    cost: 2,
    maxHealth: 1,
    name: 'Bluegill Warrior',
    owner: Controller.Player,
    zone: Zone.Hand,
  },
  {
    abilities: [Ability.Windfury],
    attack: 3,
    cardID: 'EX1_587',
    cost: 4,
    maxHealth: 4,
    name: 'Windspeaker',
    owner: Controller.Player,
    zone: Zone.Hand,
  },
  {
    attack: 6,
    cardID: 'CS2_200',
    cost: 6,
    maxHealth: 7,
    name: 'Boulderfist Ogre',
    owner: Controller.Opponent,
    zone: Zone.Hand,
  },
]);

const handWeapons = R.map(craftWeaponCard, [
  {
    attack: 3,
    cardID: 'CS2_106',
    cost: 3,
    durability: 2,
    name: 'Fiery War Axe',
    owner: Controller.Opponent,
    zone: Zone.Hand,
  },
]);

const hand: CardContainer = cardListFrom([...handMinions, ...handWeapons]);
const rawDeck = [
  {
    attack: 3,
    cardID: 'CS2_172',
    cost: 2,
    maxHealth: 2,
    name: 'Bloodfen Raptor',
    owner: Controller.Player,
    zone: Zone.Deck,
  },
  {
    abilities: [Ability.Taunt],
    attack: 5,
    cardID: 'CS2_187',
    cost: 5,
    maxHealth: 4,
    name: 'Booty Bay Bodyguard',
    owner: Controller.Opponent,
    zone: Zone.Deck,
  },
  {
    attack: 3,
    cardID: 'CS2_182',
    cost: 4,
    maxHealth: 4,
    name: 'Chillwind Yeti',
    owner: Controller.Player,
    zone: Zone.Deck,
  },
  {
    attack: 2,
    cardID: 'CS2_121',
    cost: 2,
    maxHealth: 2,
    name: 'Frostwolf Grunt',
    owner: Controller.Opponent,
    zone: Zone.Deck,
  },
  {
    attack: 2,
    cardID: 'CS2_141',
    cost: 3,
    maxHealth: 2,
    name: 'Ironforge Rifleman',
    owner: Controller.Player,
    zone: Zone.Deck,
  },
  {
    attack: 3,
    cardID: 'CS2_125',
    cost: 3,
    maxHealth: 3,
    name: 'Ironfur Grizzly',
    owner: Controller.Player,
    zone: Zone.Deck,
  },
];

const deck: CardContainer = cardListFrom(R.map(craftMinionCard, rawDeck));

const player: Hero = craftHero({
  cardID: 'HERO_02',
  name: 'Thrall',
  owner: Controller.Player,
  maximumMana: 4,
});

const opponent: Hero = craftHero({
  cardID: 'HERO_01',
  armor: 3,
  name: 'Garrosh',
  owner: Controller.Opponent,
  maximumMana: 4,
});

const minions = R.map(craftMinion, [
  {
    attack: 1,
    cardID: 'CS2_189',
    exhausted: false,
    maxHealth: 1,
    name: 'Elven archer',
    owner: Controller.Opponent,
  },
  {
    abilities: [Ability.Taunt],
    attack: 2,
    cardID: 'CS2_121',
    exhausted: false,
    maxHealth: 2,
    name: 'Frostwolf Grunt',
    owner: Controller.Opponent,
  },
  {
    attack: 200,
    cardID: 'CS2_147',
    exhausted: false,
    maxHealth: 4,
    name: 'Gnomish Inventor',
    owner: Controller.Player,
  },
]);

export const cards: CardContainer = { ...deck, ...hand };
export const board: EntityContainer = entitiesFrom([
  player,
  opponent,
  ...minions,
]);

const initialState: Game = {
  cards,
  entities: board,
  state: {
    activePlayer: Controller.Player,
    step: Step.BeginFirst,
    playerID: player.id,
    opponentID: opponent.id,
    turn: 1,
  },
};

export default initialState;
