import { createStore } from 'redux';
import rootReducer from './reducer';
import Game from '../Game';
import Player from '../Player';
import Card from '../Card';
import { GameState } from '../Game';

const deck: Card[] = [
  {
    cost: 1,
    name: 'card 1',
    health: 2,
    damage: 2,
  },
  {
    cost: 2,
    name: 'card 2',
    health: 3,
    damage: 2,
  },
  {
    cost: 2,
    name: 'card 2',
    health: 2,
    damage: 3,
  },
];

const players: [Player, Player] = [
  {
    name: 'Mage',
    hand: [],
    deck: deck,
    mana: 1,
    totalMana: 1,
    health: 30,
  },
  {
    name: 'Warrior',
    hand: [],
    deck: deck,
    mana: 1,
    totalMana: 1,
    health: 30,
  },
];

const initialState: Game = {
  currentPlayer: players[0],
  players,
  turn: 1,
  state: GameState.PLAYING,
};

export default () =>
  createStore(
    rootReducer,
    initialState,
    window['__REDUX_DEVTOOLS_EXTENSION__'] &&
      window['__REDUX_DEVTOOLS_EXTENSION__']()
  );
