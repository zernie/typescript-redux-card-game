import { Weapon } from '../../../Weapon';
import actionCreatorFactory from 'typescript-fsa';

import { CharacterPayload } from '../actions';

const actionCreator = actionCreatorFactory();

export type GainManaPayload = CharacterPayload<{
  amount?: number;
}>;
export type SpendManaPayload = CharacterPayload<{
  amount: number;
}>;
export type EquipWeaponPayload = CharacterPayload<{
  weapon: Weapon;
}>;

export const equipWeapon = actionCreator<EquipWeaponPayload>('EQUIP_WEAPON');
export const gainMana = actionCreator<GainManaPayload>('GAIN_MANA');
export const restoreMana = actionCreator<CharacterPayload>('RESTORE_MANA');
export const spendMana = actionCreator<SpendManaPayload>('SPEND_MANA');
