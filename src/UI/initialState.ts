import { Game, GameState } from '../Game';
import { craftPlayer, Player, PlayerKind } from '../Player';
import { CardType } from '../Card';
import { Board } from '../Board';
import { Deck } from '../Deck';
import { Hand } from '../Hand';
import { craftMinion } from '../Minion';
import * as R from 'ramda';

export const deck: Deck = [
  {
    cost: 1,
    name: 'card 1',
    type: CardType.Minion,
  },
  {
    cost: 2,
    name: 'card 2',
    type: CardType.Minion,
  },
  {
    cost: 2,
    name: 'card 2',
    type: CardType.Minion,
  },
  {
    cost: 1,
    name: 'card 1',
    type: CardType.Minion,
  },
  {
    cost: 2,
    name: 'card 2',
    type: CardType.Minion,
  },
  {
    cost: 2,
    name: 'card 2',
    type: CardType.Minion,
  },
];

export const hand: Hand = [];

export const board: Board = R.map(craftMinion, [
  {
    damage: 3,
    health: 2,
    name: 'Jane doe',
    owner: PlayerKind.Opponent,
  },
  {
    damage: 3,
    health: 2,
    name: 'Jane doe',
    owner: PlayerKind.Opponent,
  },
  {
    damage: 2,
    health: 3,
    name: 'Jon Jones',
    owner: PlayerKind.Player,
  },
]);

export const player: Player = craftPlayer({
  name: 'Mage',
  kind: PlayerKind.Player,
});

export const opponent: Player = craftPlayer({
  name: 'Warrior',
  kind: PlayerKind.Opponent,
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
  }
};

export default initialState;
