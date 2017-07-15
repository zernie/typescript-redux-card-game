import Game, { GameState } from '../Game';
import Player, { ActivePlayer } from '../Player';
import { CardType } from '../Card';
import Board from '../Board';
import Deck from '../Deck';
import Hand from '../Hand';

export const deck: Deck = {
  player: [
    {
      cost: 1,
      name: 'card 1',
      health: 2,
      damage: 2,
      type: CardType.Minion,
    },
    {
      cost: 2,
      name: 'card 2',
      health: 3,
      damage: 2,
      type: CardType.Minion,
    },
    {
      cost: 2,
      name: 'card 2',
      health: 2,
      damage: 3,
      type: CardType.Minion,
    },
  ],
  opponent: [
    {
      cost: 1,
      name: 'card 1',
      health: 2,
      damage: 2,
      type: CardType.Minion,
    },
    {
      cost: 2,
      name: 'card 2',
      health: 3,
      damage: 2,
      type: CardType.Minion,
    },
    {
      cost: 2,
      name: 'card 2',
      health: 2,
      damage: 3,
      type: CardType.Minion,
    },
  ],
};

export const hand: Hand = {
  player: [],
  opponent: [],
};

export const board: Board = {
  player: [
    {
      id: 0,
      health: 2,
      damage: 3,
      name: 'Jane doe',
      mechanics: [],
    },
    {
      id: 33,
      health: 2,
      damage: 3,
      name: 'Jane doe',
      mechanics: [],
    },
  ],
  opponent: [
    {
      id: 1,
      health: 3,
      damage: 2,
      name: 'Jon Jones',
      mechanics: [],
    },
  ],
};

export const player: Player = {
  name: 'Mage',
  mana: 1,
  totalMana: 1,
  health: 30,
};

export const opponent: Player = {
  name: 'Warrior',
  mana: 1,
  totalMana: 1,
  health: 30,
};

const initialState: Game = {
  activePlayer: ActivePlayer.Player,
  board,
  hand,
  deck,
  player,
  opponent,
  turn: 1,
  gameState: GameState.Playing,
};

export default initialState;
