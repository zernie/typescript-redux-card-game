import * as R from 'ramda';
import { Mechanics } from './Mechanics';
import { PlayerKind } from './Hero';
import { Character } from './Character';
import { MinionCard } from './Card';
import { newId } from './utils';

export type Minion = Character;

const selectMinions = R.useWith(R.filter, [R.propEq('owner'), R.identity]);

export const playerMinions = selectMinions(PlayerKind.Player);
export const opponentMinions = selectMinions(PlayerKind.Opponent);
export const craftMinion = (props: {
  attack: number;
  health: number;
  name: string;
  owner: PlayerKind;
  attacksPerformed?: number;
  mechanics?: Array<Mechanics>;
}): Minion => ({
  attacksPerformed: 0,
  id: newId(),
  mechanics: [],
  ...props,
});
export const fromCard = R.pipe(
  R.pick<MinionCard, keyof MinionCard>(['attack', 'health', 'name', 'owner']),
  craftMinion
);
