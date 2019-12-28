import * as _ from "lodash/fp";
import { Container } from "./Container";
import { Ability, Controller } from "./enums";
import { Weapon } from "./Weapon";
import { HeroPower } from "./HeroPower";
import { Character } from "./Character";

export type Card = Character | Weapon | HeroPower;
export type CardContainer = Container<Card>;

// FIXME
export const selectCards = _.curry((player: Controller, cards: CardContainer) =>
  _.pickBy((card: Card) => card.owner === player, cards)
);

export const playerCards = selectCards(Controller.Player);
export const opponentCards = selectCards(Controller.Opponent);

export const cardListFrom = (array: Card[]): CardContainer =>
  _.indexBy<Card>(_.prop("id"), array) as CardContainer;

export const hasAbility = (ability: Ability) => (entity: Card): boolean =>
  _.contains(ability, entity.abilities) as boolean;

export const hasTaunt = hasAbility(Ability.Taunt);
export const hasCharge = hasAbility(Ability.Charge);
export const hasWindfury = hasAbility(Ability.Windfury);