import * as R from 'ramda';
import { Abilities } from './Abilities';
import { CardType, PlayerKind } from './enums';
import { WeaponCard } from './Card';

export type Weapon = Readonly<{
  abilities: Abilities;
  attack: number;
  durability: number;
  name: string;
  owner: PlayerKind;
  type: CardType.Weapon;
}>;
export type CraftWeaponProps = Readonly<{
  abilities?: Abilities;
  attack: number;
  durability: number;
  name: string;
  owner: PlayerKind;
}>;

export const craftWeapon = (props: CraftWeaponProps): Weapon => ({
  abilities: [],
  ...props,
  type: CardType.Weapon,
});
export const weaponFromCard = R.pipe<WeaponCard, WeaponCard, Weapon>(
  R.pick<WeaponCard, keyof WeaponCard>([
    'abilities',
    'attack',
    'durability',
    'name',
    'owner',
  ]),
  craftWeapon
);
