import * as _ from "lodash/fp";
import { Container } from "./Container";
import { Ability, Controller } from "./enums";
import { Hero } from "./Hero";
import { Minion } from "./Minion";
import { Weapon } from "./Weapon";

export type Card = Hero | Minion | Weapon;
export type CardContainer = Container<Card>;

export const selectCards = _.curry(
  (player: Controller, cards: CardContainer) =>
    _.filter((card: Card) => card.owner === player, cards) as CardContainer
);

export const playerCards = selectCards(Controller.Player);
export const opponentCards = selectCards(Controller.Opponent);

export const cardListFrom = (array: Card[]): CardContainer =>
  _.indexBy<Card>(_.prop("id"), array) as CardContainer;

export const hasAbility = _.curry(
  (ability: Ability, entity: Card): boolean =>
    _.contains(ability, entity.abilities) as boolean
);
export const hasTaunt = hasAbility(Ability.Taunt);
export const hasCharge = hasAbility(Ability.Charge);
export const hasWindfury = hasAbility(Ability.Windfury);
