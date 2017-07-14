import Player, { ActivePlayer } from './Player';

export enum GameState {
  Playing,
  Finished,
}

type Game = Readonly<
  {
    activePlayer: ActivePlayer;
    player: Player;
    opponent: Player;
    turn: number;
    gameState: GameState;
  }
>;

export default Game;
