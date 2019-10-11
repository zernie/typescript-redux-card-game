import _ from "lodash/fp";
import { MinionContainer } from "./Board";
import { CardContainer } from "./Card";
import { Entity, EntityContainer } from './Entity';
import { CardType, Controller, Step, Zone } from "./enums";

export type State = {
  activePlayer: Controller;
  step: Step;
  playerID: number;
  opponentID: number;
  turn: number;
};

export type Game = {
  entities: EntityContainer;
  cards: CardContainer;
  state: State;
};

export const getHand = (game: Game) =>
  _.pickBy(card => card.zone === Zone.Hand, game.cards) as CardContainer;

export const getDeck = (game: Game) =>
  _.pickBy(card => card.zone === Zone.Deck, game.cards) as CardContainer;

export const getBoard = (game: Game) =>
  _.pickBy<Entity>(entity => entity.type === CardType.Minion, game.entities) as MinionContainer;
