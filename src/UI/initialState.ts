import * as R from 'ramda';
import { Game, GameState } from '../Game';
import { craftPlayer, Hero, PlayerKind } from '../Hero';
import { CardList, cardListFrom, craftMinionCard } from '../Card';
import { Board, boardFrom } from '../Board';
import { craftMinion } from '../Minion';
import { Ability } from '../Abilities';

export const deck: CardList = {};

const rawHand = [
  {
    abilities: [Ability.Charge],
    attack: 1,
    cost: 2,
    health: 2,
    name: 'Bluegill Warrior',
    owner: PlayerKind.Player,
  },
  {
    abilities: [Ability.Windfury],
    attack: 3,
    cost: 4,
    health: 4,
    name: 'Windbreaker',
    owner: PlayerKind.Player,
  },
  {
    attack: 6,
    cost: 6,
    health: 7,
    name: 'Boulderfist Ogre',
    owner: PlayerKind.Player,
  },
];

export const hand: CardList = cardListFrom(R.map(craftMinionCard, rawHand));

const rawBoard = [
  {
    attack: 1,
    health: 1,
    name: 'Elven archer',
    owner: PlayerKind.Opponent,
  },
  {
    attack: 2,
    health: 2,
    name: 'Frostwolf Grunt',
    owner: PlayerKind.Opponent,
  },
  {
    attack: 2,
    health: 4,
    name: 'Gnomish Inventor',
    owner: PlayerKind.Player,
  },
];
export const board: Board = boardFrom(R.map(craftMinion, rawBoard));

export const player: Hero = craftPlayer({
  name: 'Mage',
  owner: PlayerKind.Player,
});

export const opponent: Hero = craftPlayer({
  armor: 3,
  name: 'Warrior',
  owner: PlayerKind.Opponent,
});

const initialState: Game = {
  board,
  deck,
  hand,
  player,
  opponent,
  state: {
    activePlayer: PlayerKind.Player,
    gameState: GameState.Playing,
    turn: 1,
  },
};

export default initialState;
