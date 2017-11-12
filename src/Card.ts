import * as R from 'ramda';
import { PlayerKind } from './Hero';
import { Ability } from './Abilities';
import { newId } from './utils';
import { EntityContainer } from './EntityContainer';

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
  maxHealth: number;
  type: 'weapon';
}

export interface MinionCard extends BasicCard {
  abilities: Array<Ability>;
  attack: number;
  maxHealth: number;
  type: 'minion';
}

export type CardList = EntityContainer<Card>;

const selectCards = R.useWith(R.filter, [R.propEq('owner'), R.identity]);

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
  type: 'minion',
});
export const cardListFrom = (array: Array<Card>): CardList =>
  R.indexBy<Card>(R.prop('id'), array);
