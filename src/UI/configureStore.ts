import { createStore } from 'redux';
import rootReducer from './reducer';
import Game from '../Game';
import Player from '../Player';
import Card from '../Card';
import { GameState } from '../Game';
import { CardType } from '../Card';
import { ActivePlayer } from '../Player';

const deck: Card[] = [
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
];

const player: Player = {
  name: 'Mage',
  hand: [],
  deck: deck,
  mana: 1,
  minions: [
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
  totalMana: 1,
  health: 30,
};
const opponent: Player = {
  name: 'Warrior',
  hand: [],
  deck: deck,
  mana: 1,
  minions: [
    {
      id: 1,
      health: 3,
      damage: 2,
      name: 'Jon Jones',
      mechanics: [],
    },
  ],
  totalMana: 1,
  health: 30,
};

const initialState: Game = {
  activePlayer: ActivePlayer.Player,
  player: player,
  opponent: opponent,
  turn: 1,
  state: GameState.Playing,
};

export default () =>
  createStore(
    rootReducer,
    initialState,
    window['__REDUX_DEVTOOLS_EXTENSION__'] &&
      window['__REDUX_DEVTOOLS_EXTENSION__']()
  );
