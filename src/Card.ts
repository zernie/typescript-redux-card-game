import * as R from 'ramda';
import { Ability } from './Abilities';
import { newId } from './utils';
import { EntityContainer } from './EntityContainer';
import { CardType, PlayerKind } from './enums';

type BasicCard = Readonly<{
  cost: number;
  id: number;
  name: string;
  owner: PlayerKind;
  text?: string;
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

export type CardList = EntityContainer<Card>;

// export const selectCards = R.useWith(R.filter, [R.propEq('owner'), R.identity]);
export const selectCards = R.curry(
  (player: PlayerKind, cards: CardList): CardList =>
    R.filter((card: Card) => card.owner === player, cards)
);

export const playerCards = selectCards(PlayerKind.Player);
export const opponentCards = selectCards(PlayerKind.Opponent);
export const craftMinionCard = (props: {
  attack: number;
  cost: number;
  maxHealth: number;
  name: string;
  owner: PlayerKind;
  abilities?: Array<Ability>;
  text?: string;
}): MinionCard => ({
  abilities: [],
  ...props,
  id: newId(),
  type: CardType.Minion,
});
export const craftWeaponCard = (props: {
  attack: number;
  cost: number;
  durability: number;
  name: string;
  owner: PlayerKind;
  abilities?: Array<Ability>;
  text?: string;
}): WeaponCard => ({
  abilities: [],
  ...props,
  id: newId(),
  type: CardType.Weapon,
});

export const cardListFrom = (array: Array<Card>): CardList =>
  R.indexBy<Card>(R.prop('id'), array);
