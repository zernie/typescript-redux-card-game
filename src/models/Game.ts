import { EntityContainer } from "./Entity";
import { Controller, Step } from "./enums";
import { CardContainer } from "./Container";

export type State = {
  activePlayer: Controller;
  step: Step;
  playerID: Controller;
  opponentID: Controller;
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
//   _.pickBy(card => card.zone === Zone.Hand, game.cards) as EntityContainer;
//
// export const getDeck = (game: Game) =>
//   _.pickBy(card => card.zone === Zone.Deck, game.cards) as EntityContainer;
//
// export const getBoard = (game: Game) =>
//   _.pickBy<Entity>(
//     entity => entity.type === CardType.Minion,
//     game.entities
//   ) as MinionContainer;

export const isGameOver = ({ step }: State) => step === Step.FinalGameOver;
