import Player, { ActivePlayer } from './Player';

export enum GameState {
  Playing,
  Finished,
}

interface Game {
  activePlayer: ActivePlayer;
  player: Player;
  opponent: Player;
  turn: number;
  state: GameState;
}

export default Game;
