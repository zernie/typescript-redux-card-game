import Player from "./Player";

export enum GameState {
  PLAYING,
  FINISHED
}

interface Game {
  currentPlayer: Player;
  players: [Player, Player];
  turn: number;
  state: GameState;
}

export default Game;
