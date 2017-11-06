import * as R from 'ramda';
import { Game, GameState } from '../Game';
import { craftPlayer, Hero, PlayerKind } from '../Hero';
import { CardList, cardListFrom, craftMinionCard } from '../Card';
import { Board, boardFrom } from '../Board';
import { craftMinion } from '../Minion';

export const deck: CardList = {};

const rawHand = [
  {
    attack: 3,
    cost: 2,
    health: 2,
    name: 'Acidic Swamp Ooze',
    owner: PlayerKind.Player,
  },
  {
    attack: 4,
    cost: 4,
    health: 5,
    name: 'Chillwind Yeti',
    owner: PlayerKind.Opponent,
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
