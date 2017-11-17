import * as R from 'ramda';
import { Ability } from './Abilities';
import { CardType, PlayerKind } from './enums';

export type Weapon = Readonly<{
  abilities: Array<Ability>;
  attack: number;
  durability: number;
  // exhausted: boolean;
  name: string;
  owner: PlayerKind;
  type: CardType.Weapon;
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
  type: CardType.Weapon,
});
export const weaponFromCard = R.pipe(
  R.pick(['abilities', 'attack', 'durability', 'name', 'owner']),
  craftWeapon
);
