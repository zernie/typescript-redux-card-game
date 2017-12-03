import * as R from 'ramda';
import { Container } from './Container';
import { Controller } from './enums';
import { Minion } from './Minion';
import { Weapon } from './Weapon';
import { Hero } from './Hero';

export type Card = Hero | Minion | Weapon;

export type CardContainer = Container<Card>;

export const selectCards = R.curry(
  (player: Controller, cards: CardContainer): CardContainer =>
    R.filter((card: Card) => card.owner === player, cards)
);

export const playerCards = selectCards(Controller.Player);
export const opponentCards = selectCards(Controller.Opponent);

export const cardListFrom = (array: Array<Card>): CardContainer =>
  R.indexBy<Card>(R.prop('id'), array);
