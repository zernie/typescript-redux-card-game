///<reference path="configureStore.ts"/>
import { combineReducers } from 'redux';
import Player, { ActivePlayer } from '../Player';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import  { opponent, player } from './initialState';
import { GameState } from '../Game';

const actionCreator = actionCreatorFactory();

interface AttackFaceAction {
  damage: number;
  activePlayer: ActivePlayer;
  target: ActivePlayer;
}

export const attackFace = actionCreator<AttackFaceAction>('ATTACK_FACE');

const attackFaceHandler = (state: Player, payload: AttackFaceAction) =>
  payload.target === payload.activePlayer
    ? {
        ...state,
        health: state.health - payload.damage,
      }
    : state;

const characterReducer = (character: Player) =>
  reducerWithInitialState<Player>(character).case(
    attackFace,
    attackFaceHandler
  );

const playerReducer = characterReducer;
const opponentReducer = characterReducer;

export default combineReducers({
  player: playerReducer(player),
  opponent: opponentReducer(opponent),
  activePlayer: (state: ActivePlayer = ActivePlayer.Player) => state,
  turn: (state: number = 0) => state,
  gameState: (state: number = GameState.Playing) => state,
});
