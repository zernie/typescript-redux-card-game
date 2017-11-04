import * as R from 'ramda';
import { Minion } from './Minion';
import { PlayerKind } from './Player';

export enum CardType {
  Enchantment,
  Minion,
  Spell,
  Weapon,
}

export type CardPayload = Minion | 'Spell' | 'Hero' | 'Weapon';

export type Card = Readonly<{
  cost: number;
  text?: string;
  name: string;
  type: CardType;
  payload: CardPayload;
  owner: PlayerKind
}>;

export type MinionCard = Readonly<Card & {
  type: CardType.Minion
}>;

const selectCards = R.useWith(R.filter, [R.propEq('owner'), R.identity]);

export const playerCards = selectCards(PlayerKind.Player);
export const opponentCards = selectCards(PlayerKind.Opponent);
