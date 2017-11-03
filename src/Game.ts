import { Player, PlayerKind } from './Player';
import { Board } from './Board';
import { Hand } from './Hand';
import { Deck } from './Deck';

export enum GameState {
  Playing,
  Finished,
}

export type State = Readonly<{
  activePlayer: PlayerKind;
  gameState: GameState;
  turn: number;
  winner?: PlayerKind;
}>;

export type Game = Readonly<{
  board: Board;
  deck: Deck;
  hand: Hand;
  opponent: Player;
  player: Player;
  state: State;
}>;
