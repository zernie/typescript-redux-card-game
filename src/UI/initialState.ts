import { Game, GameState } from '../Game';
import { Player, PlayerKind } from '../Player';
import { CardType } from '../Card';
import { Board } from '../Board';
import { Deck } from '../Deck';
import { Hand } from '../Hand';

export const deck: Deck = [
  {
    cost: 1,
    damage: 2,
    health: 2,
    name: 'card 1',
    type: CardType.Minion,
  },
  {
    cost: 2,
    damage: 2,
    health: 3,
    name: 'card 2',
    type: CardType.Minion,
  },
  {
    cost: 2,
    damage: 3,
    health: 2,
    name: 'card 2',
    type: CardType.Minion,
  },
  {
    cost: 1,
    damage: 2,
    health: 2,
    name: 'card 1',
    type: CardType.Minion,
  },
  {
    cost: 2,
    damage: 2,
    health: 3,
    name: 'card 2',
    type: CardType.Minion,
  },
  {
    cost: 2,
    damage: 3,
    health: 2,
    name: 'card 2',
    type: CardType.Minion,
  },
];

export const hand: Hand = [];

export const board: Board = [
  {
    damage: 3,
    health: 2,
    id: 0,
    mechanics: [],
    name: 'Jane doe',
    owner: PlayerKind.Opponent,
  },
  {
    damage: 3,
    health: 2,
    id: 33,
    mechanics: [],
    name: 'Jane doe',
    owner: PlayerKind.Opponent,
  },
  {
    damage: 2,
    health: 3,
    id: 1,
    mechanics: [],
    name: 'Jon Jones',
    owner: PlayerKind.Opponent,
  },
];

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
  activePlayer: PlayerKind.Player,
  board,
  hand,
  deck,
  player,
  opponent,
  turn: 1,
  gameState: GameState.Playing,
};

export default initialState;
