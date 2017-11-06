import * as R from 'ramda';
import { Game, GameState } from '../Game';
import { craftPlayer, Hero, PlayerKind } from '../Hero';
import { CardList, craftMinionCard } from '../Card';
import { Board } from '../Board';
import { craftMinion } from '../Minion';

export const deck: CardList = [];

export const hand: CardList = R.map(craftMinionCard, [
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
]);

export const board: Board = R.map(craftMinion, [
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
]);

export const player: Hero = craftPlayer({
  name: 'Mage',
  owner: PlayerKind.Player,
});

export const opponent: Hero = craftPlayer({
  name: 'Warrior',
  owner: PlayerKind.Opponent,
});

const initialState: Game = {
  board,
  hand,
  deck,
  player,
  opponent,
  state: {
    activePlayer: PlayerKind.Player,
    turn: 1,
    gameState: GameState.Playing,
  },
};

export default initialState;
