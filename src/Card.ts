import * as R from 'ramda';
import { PlayerKind } from './Hero';
import { Mechanics } from './Mechanics';
import { newId } from './utils';

type BasicCard = Readonly<{
  cost: number;
  id: number;
  name: string;
  owner: PlayerKind;
  text?: string;
}>;

export type Card = MinionCard | WeaponCard;

export interface WeaponCard extends BasicCard {
  attack: number;
  health: number;
  type: 'weapon';
}

export interface MinionCard extends BasicCard {
  attack: number;
  health: number;
  mechanics: Array<Mechanics>;
  type: 'minion';
}

export type CardList = {
  [id: number]: Card;
};

const selectCards = R.useWith(R.filter, [R.propEq('owner'), R.identity]);

export const playerCards = selectCards(PlayerKind.Player);
export const opponentCards = selectCards(PlayerKind.Opponent);
export const craftMinionCard = (props: {
  attack: number;
  cost: number;
  health: number;
  name: string;
  owner: PlayerKind;
  mechanics?: Array<Mechanics>;
  text?: string;
}): MinionCard => ({
  mechanics: [],
  ...props,
  id: newId(),
  type: 'minion',
});
export const cardListFrom = (array: Array<Card>): CardList => R.indexBy<Card>(R.prop('id'), array);
