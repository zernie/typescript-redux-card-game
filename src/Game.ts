import Player from "./Player";

enum GameState {
  PLAYING,
  FINISHED
}

interface Game {
  currentPlayer: Player;
  players: [Player, Player];
  firstPlayer: Player;
  secondPlayer: Player;
  turn: number;
  state: GameState;
}

export default Game;
