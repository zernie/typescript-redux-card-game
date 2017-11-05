import { Player, PlayerKind } from './Player';
import { Board } from './Board';
import { CardList } from './Card';

export enum GameState {
  Playing = 'PLAYING',
  Finished = 'FINISHED',
}

export type State = Readonly<{
  activePlayer: PlayerKind;
  gameState: GameState;
  turn: number;
  winner?: PlayerKind;
}>;

export type Game = Readonly<{
  board: Board;
  deck: CardList;
  hand: CardList;
  opponent: Player;
  player: Player;
  state: State;
}>;
