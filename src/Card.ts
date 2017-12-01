import * as R from 'ramda';
import { Abilities } from './Abilities';
import { newId } from './utils';
import { Container } from './Container';
import { CardType, Controller, Zone } from './enums';

type BasicCard = Readonly<{
  cost: number;
  cardID: string;
  id: number;
  name: string;
  owner: Controller;
  text?: string;
  zone: Zone;
}>;

export type Card = MinionCard | WeaponCard;

export interface WeaponCard extends BasicCard {
  abilities: Abilities;
  attack: number;
  durability: number;
  type: CardType.Weapon;
}

export interface MinionCard extends BasicCard {
  abilities: Abilities;
  attack: number;
  maxHealth: number;
  type: CardType.Minion;
}

export type CardContainer = Container<Card>;

// export const selectCards = R.useWith(R.filter, [R.propEq('owner'), R.identity]);
export const selectCards = R.curry(
  (player: Controller, cards: CardContainer): CardContainer =>
    R.filter((card: Card) => card.owner === player, cards)
);

export const playerCards = selectCards(Controller.Player);
export const opponentCards = selectCards(Controller.Opponent);
export const craftMinionCard = (props: {
  attack: number;
  cardID: string;
  cost: number;
  maxHealth: number;
  name: string;
  owner: Controller;
  abilities?: Abilities;
  text?: string;
  zone: Zone;
}): MinionCard => ({
  abilities: [],
  ...props,
  id: newId(),
  type: CardType.Minion,
});
export const craftWeaponCard = (props: {
  attack: number;
  cardID: string;
  cost: number;
  durability: number;
  name: string;
  owner: Controller;
  abilities?: Abilities;
  text?: string;
  zone: Zone;
}): WeaponCard => ({
  abilities: [],
  ...props,
  id: newId(),
  type: CardType.Weapon,
});

export const cardListFrom = (array: Array<Card>): CardContainer =>
  R.indexBy<Card>(R.prop('id'), array);
