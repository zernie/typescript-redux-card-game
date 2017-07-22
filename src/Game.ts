import { Player, PlayerKind } from './Player';
import { Board } from './Board';
import { Hand } from './Hand';
import { Deck } from './Deck';

export enum GameState {
  Playing,
  Finished,
}

export type Game = Readonly<
  {
    activePlayer: PlayerKind;
    board: Board;
    deck: Deck;
    gameState: GameState;
    hand: Hand;
    opponent: Player;
    player: Player;
    turn: number;
  }
>;
