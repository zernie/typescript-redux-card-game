import Player from './Player';

export enum GameState {
  PLAYING,
  FINISHED,
}

export type PlayersTuple = [Player, Player];

interface Game {
  currentPlayer: Player;
  players: PlayersTuple;
  turn: number;
  state: GameState;
}

export default Game;
