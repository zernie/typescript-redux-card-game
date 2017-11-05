import * as R from 'ramda';
import { Minion } from './Minion';
import { PlayerKind } from './Player';

export enum CardType {
  Enchantment = 'ENCHANTMENT',
  Minion = 'MINION',
  Spell = 'SPELL',
  Weapon = 'WEAPON',
}

export type CardPayload = Minion | 'Spell' | 'Hero' | 'Weapon';

export type Card = Readonly<{
  cost: number;
  text?: string;
  name: string;
  type: CardType;
  payload: CardPayload;
  owner: PlayerKind;
}>;
export type CardList = Array<Card>;

const selectCards = R.useWith(R.filter, [R.propEq('owner'), R.identity]);

export const playerCards = selectCards(PlayerKind.Player);
export const opponentCards = selectCards(PlayerKind.Opponent);
