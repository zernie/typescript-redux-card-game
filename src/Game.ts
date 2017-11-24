import { Board } from './Board';
import { CardList } from './Card';
import { Step, PlayerKind } from './enums';

export type State = Readonly<{
  activePlayer: PlayerKind;
  step: Step;
  playerID: number;
  opponentID: number;
  turn: number;
}>;

export type Game = Readonly<{
  board: Board;
  deck: CardList;
  hand: CardList;
  state: State;
}>;
