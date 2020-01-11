import { Controller, Step } from "./enums";
import { CardContainer, EntityContainer } from "./containers";

export interface GameState {
  activePlayer: Controller;
  step: Step;
  playerID: Controller;
  opponentID: Controller;
  playerHeroID: number;
  opponentHeroID: number;
  turn: number;
}

export type Game = {
  // TODO: merge into entities field?
  deck: CardContainer;
  graveyard: EntityContainer;
  hand: CardContainer;
  play: EntityContainer;
  secret: EntityContainer;
  setAside: EntityContainer;

  state: GameState;
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

export const isGameOver = ({ step }: GameState) => step === Step.FinalGameOver;
