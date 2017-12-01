import * as R from 'ramda';
import { CardType, Controller, Step, Zone } from './enums';
import { CardContainer } from './Card';
import { EntityContainer } from './Entity';
import { MinionContainer } from './Board';

export type State = Readonly<{
  activePlayer: Controller;
  step: Step;
  playerID: number;
  opponentID: number;
  turn: number;
}>;

export type Game = Readonly<{
  entities: EntityContainer;
  cards: CardContainer;
  state: State;
}>;

export const getHand = (game: Game): CardContainer =>
  R.pickBy(R.propEq('zone', Zone.Hand), game.cards);

export const getDeck = (game: Game): CardContainer =>
  R.pickBy(R.propEq('zone', Zone.Deck), game.cards);

export const getBoard = (game: Game): MinionContainer =>
  R.pickBy(R.propEq('type', CardType.Minion), game.entities);
