import * as R from 'ramda';
import { Mechanics } from './Mechanics';
import { PlayerKind } from './Player';
import { Character } from './Character';
import { MinionCard } from './Card';
// import { Card } from './Card';

export type Minion = Character;

const selectMinions = R.useWith(R.filter, [R.propEq('owner'), R.identity]);

export const playerMinions = selectMinions(PlayerKind.Player);
export const opponentMinions = selectMinions(PlayerKind.Opponent);
export const craftMinion = (props: {
  attack: number,
  health: number,
  name: string,
  owner: PlayerKind,
  attacksPerformed?: number,
  mechanics?: Array<Mechanics>,
}): Minion => ({
  attacksPerformed: 0,
  mechanics: [],
  ...props,
});
export const fromCard = (card: MinionCard): any =>
  R.pipe(R.pick(['attack', 'health', 'name']), R.tap(console.log));
