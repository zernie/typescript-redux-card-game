import { CardContainer } from "./Card";
import { EntityContainer } from "./Entity";
import { Controller, Step } from "./enums";

export type State = {
  activePlayer: Controller;
  step: Step;
  playerID: number;
  opponentID: number;
  turn: number;
};

export type Game = {
  deck: CardContainer;
  graveyard: EntityContainer;
  hand: CardContainer;
  play: EntityContainer;
  secret: EntityContainer;
  setAside: EntityContainer;
  state: State;
};

// export const getHand = (game: Game) =>
//   _.pickBy(card => card.zone === Zone.Hand, game.cards) as CardContainer;
//
// export const getDeck = (game: Game) =>
//   _.pickBy(card => card.zone === Zone.Deck, game.cards) as CardContainer;
//
// export const getBoard = (game: Game) =>
//   _.pickBy<Entity>(
//     entity => entity.type === CardType.Minion,
//     game.entities
//   ) as MinionContainer;
