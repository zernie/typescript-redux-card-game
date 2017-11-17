import { Board } from './Board';
import { CardList } from './Card';
import { GameState, PlayerKind } from './enums';

export type State = Readonly<{
  activePlayer: PlayerKind;
  gameState: GameState;
  playerID: number;
  opponentID: number;
  turn: number;
  winner?: PlayerKind;
}>;

export type Game = Readonly<{
  board: Board;
  deck: CardList;
  hand: CardList;
  state: State;
}>;
