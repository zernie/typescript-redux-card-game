import * as R from 'ramda';
import { Ability } from './Abilities';
import { PlayerKind } from './Hero';

export type Weapon = Readonly<{
  abilities: Array<Ability>;
  attack: number;
  durability: number;
  // exhausted: boolean;
  name: string;
  owner: PlayerKind;
  type: 'WEAPON';
}>;
export type CraftWeaponProps = Readonly<{
  abilities?: Array<Ability>;
  attack: number;
  // exhausted?: boolean;
  durability: number;
  name: string;
  owner: PlayerKind;
}>;

export const craftWeapon = (props: CraftWeaponProps): Weapon => ({
  abilities: [],
  // exhausted: false,
  ...props,
  type: 'WEAPON',
});
export const weaponFromCard = R.pipe(
  R.pick(['abilities', 'attack', 'durability', 'name', 'owner']),
  craftWeapon
);
