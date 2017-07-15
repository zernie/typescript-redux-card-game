import Player, { ActivePlayer } from './Player';
import Board from './Board';
import Hand from './Hand';
import Deck from './Deck';

export enum GameState {
  Playing,
  Finished,
}

type Game = Readonly<
  {
    activePlayer: ActivePlayer;
    board: Board;
    hand: Hand;
    deck: Deck;
    player: Player;
    opponent: Player;
    turn: number;
    gameState: GameState;
  }
>;

export default Game;
