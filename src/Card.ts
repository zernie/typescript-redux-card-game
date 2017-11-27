import * as R from 'ramda';
import { Ability } from './Abilities';
import { newId } from './utils';
import { Container } from './Container';
import { CardType, PlayerKind, Zone } from './enums';

type BasicCard = Readonly<{
  cost: number;
  cardID: string;
  id: number;
  name: string;
  owner: PlayerKind;
  text?: string;
  zone: Zone;
}>;

export type Card = MinionCard | WeaponCard;

export interface WeaponCard extends BasicCard {
  abilities: Array<Ability>;
  attack: number;
  durability: number;
  type: CardType.Weapon;
}

export interface MinionCard extends BasicCard {
  abilities: Array<Ability>;
  attack: number;
  maxHealth: number;
  type: CardType.Minion;
}

export type CardContainer = Container<Card>;

// export const selectCards = R.useWith(R.filter, [R.propEq('owner'), R.identity]);
export const selectCards = R.curry(
  (player: PlayerKind, cards: CardContainer): CardContainer =>
    R.filter((card: Card) => card.owner === player, cards)
);

export const playerCards = selectCards(PlayerKind.Player);
export const opponentCards = selectCards(PlayerKind.Opponent);
export const craftMinionCard = (props: {
  attack: number;
  cardID: string;
  cost: number;
  maxHealth: number;
  name: string;
  owner: PlayerKind;
  abilities?: Array<Ability>;
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
  owner: PlayerKind;
  abilities?: Array<Ability>;
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
