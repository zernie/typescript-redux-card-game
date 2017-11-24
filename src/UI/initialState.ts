import * as R from 'ramda';
import { Game } from '../Game';
import { craftPlayer, Hero } from '../Hero';
import {
  CardList,
  cardListFrom,
  craftMinionCard,
  craftWeaponCard,
} from '../Card';
import { Board, boardFrom } from '../Board';
import { craftMinion } from '../Minion';
import { Ability } from '../Abilities';
import { Character } from '../Character';
import { PlayerKind, Step } from '../enums';

const rawDeck = [
  {
    attack: 3,
    cardID: 'CS2_172',
    cost: 2,
    maxHealth: 2,
    name: 'Bloodfen Raptor',
    owner: PlayerKind.Player,
  },
  {
    abilities: [Ability.Taunt],
    attack: 5,
    cardID: 'CS2_187',
    cost: 5,
    maxHealth: 4,
    name: 'Booty Bay Bodyguard',
    owner: PlayerKind.Opponent,
  },
  {
    attack: 3,
    cardID: 'CS2_182',
    cost: 4,
    maxHealth: 4,
    name: 'Chillwind Yeti',
    owner: PlayerKind.Player,
  },
  {
    attack: 2,
    cardID: 'CS2_121',
    cost: 2,
    maxHealth: 2,
    name: 'Frostwolf Grunt',
    owner: PlayerKind.Opponent,
  },
  {
    attack: 2,
    cardID: 'CS2_141',
    cost: 3,
    maxHealth: 2,
    name: 'Ironforge Rifleman',
    owner: PlayerKind.Player,
  },
  {
    attack: 3,
    cardID: 'CS2_125',
    cost: 3,
    maxHealth: 3,
    name: 'Ironfur Grizzly',
    owner: PlayerKind.Player,
  },
];

export const deck: CardList = cardListFrom(R.map(craftMinionCard, rawDeck));

const handMinions = R.map(craftMinionCard, [
  {
    abilities: [Ability.Charge],
    attack: 1,
    cardID: 'CS2_173',
    cost: 2,
    maxHealth: 2,
    name: 'Bluegill Warrior',
    owner: PlayerKind.Player,
  },
  {
    abilities: [Ability.Windfury],
    attack: 3,
    cardID: 'EX1_587',
    cost: 4,
    maxHealth: 4,
    name: 'Windspeaker',
    owner: PlayerKind.Player,
  },
  {
    attack: 6,
    cardID: 'CS2_200',
    cost: 6,
    maxHealth: 7,
    name: 'Boulderfist Ogre',
    owner: PlayerKind.Opponent,
  },
]);

export const handWeapons = R.map(craftWeaponCard, [
  {
    attack: 3,
    cardID: 'CS2_106',
    cost: 3,
    durability: 2,
    name: 'Fiery War Axe',
    owner: PlayerKind.Opponent,
  },
]);

export const hand: CardList = cardListFrom([...handMinions, ...handWeapons]);

export const player: Hero = craftPlayer({
  cardID: 'HERO_08',
  name: 'Mage',
  owner: PlayerKind.Player,
  maximumMana: 4,
});

export const opponent: Hero = craftPlayer({
  cardID: 'HERO_01',
  armor: 3,
  name: 'Warrior',
  owner: PlayerKind.Opponent,
  maximumMana: 4,
});

const minions = R.map(craftMinion, [
  {
    attack: 1,
    cardID: 'CS2_189',
    exhausted: false,
    maxHealth: 1,
    name: 'Elven archer',
    owner: PlayerKind.Opponent,
  },
  {
    attack: 2,
    cardID: 'CS2_121',
    exhausted: false,
    maxHealth: 2,
    name: 'Frostwolf Grunt',
    owner: PlayerKind.Opponent,
  },
  {
    attack: 200,
    cardID: 'CS2_147',
    exhausted: false,
    maxHealth: 4,
    name: 'Gnomish Inventor',
    owner: PlayerKind.Player,
  },
]);

const characters: Array<Character> = [player, opponent, ...minions];

export const board: Board = boardFrom(characters);

const initialState: Game = {
  board,
  deck,
  hand,
  state: {
    activePlayer: PlayerKind.Player,
    step: Step.BeginFirst,
    playerID: player.id,
    opponentID: opponent.id,
    turn: 1,
  },
};

export default initialState;
