import _ from "lodash/fp";
import { Card } from "../Card";
import { Container } from "../Container";
import { Controller } from "../enums";
import { Game } from "../Game";

export type CardContainer = Container<Card>;

export const ownerCards = _.curry(
  (player: Controller, cards: CardContainer) =>
    _.pickBy((card: Card) => card.owner === player, cards) as CardContainer
);

export const playerHand = (game: Game) =>
  ownerCards(game.state.playerID, game.hand);
export const opponentHand = (game: Game) =>
  ownerCards(game.state.opponentID, game.hand);

export const playerDeck = (game: Game) =>
  ownerCards(game.state.playerID, game.deck);
export const opponentDeck = (game: Game) =>
  ownerCards(game.state.opponentID, game.deck);
