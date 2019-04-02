import * as _ from "lodash/fp";
import { MinionContainer } from "./Board";
import { CardContainer } from "./Card";
import { EntityContainer } from "./Entity";
import { CardType, Controller, Step, Zone } from "./enums";

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
  _.pickBy(_.propEq("zone", Zone.Hand), game.cards);

export const getDeck = (game: Game): CardContainer =>
  _.pickBy(_.propEq("zone", Zone.Deck), game.cards);

export const getBoard = (game: Game): MinionContainer =>
  _.pickBy(_.propEq("type", CardType.Minion), game.entities);
