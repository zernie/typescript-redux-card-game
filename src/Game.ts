import Player from './Player';

export enum GameState {
  Playing,
  Finished,
}

export enum ActivePlayer {
  Player,
  Opponent,
}

export type PlayersTuple = [Player, Player];

interface Game {
  currentPlayer: Player;
  players: PlayersTuple;
  turn: number;
  state: GameState;
}

export default Game;
