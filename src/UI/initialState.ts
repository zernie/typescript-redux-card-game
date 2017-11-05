import * as R from 'ramda';
import { Game, GameState } from '../Game';
import { craftPlayer, Player, PlayerKind } from '../Player';
import { CardList, craftMinionCard } from '../Card';
import { Board } from '../Board';
import { craftMinion } from '../Minion';

export const deck: CardList = [];

export const hand: CardList = R.map(craftMinionCard, [
  {
    attack: 3,
    cost: 1,
    health: 2,
    name: 'card 1',
    owner: PlayerKind.Player,
  },
  {
    attack: 3,
    cost: 2,
    health: 2,
    name: 'card 2',
    owner: PlayerKind.Opponent,
  },
  {
    attack: 3,
    cost: 2,
    health: 2,
    name: 'card 2',
    owner: PlayerKind.Player,
  },
]);

export const board: Board = R.map(craftMinion, [
  {
    attack: 3,
    health: 2,
    name: 'Jane doe',
    owner: PlayerKind.Opponent,
  },
  {
    attack: 3,
    health: 2,
    name: 'Jane doe',
    owner: PlayerKind.Opponent,
  },
  {
    attack: 2,
    health: 3,
    name: 'Jon Jones',
    owner: PlayerKind.Player,
  },
]);

export const player: Player = craftPlayer({
  name: 'Mage',
  owner: PlayerKind.Player,
});

export const opponent: Player = craftPlayer({
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
