import { Weapon } from '../../../Weapon';
import actionCreatorFactory from 'typescript-fsa';

import { EntityPayload } from '../actions';

const actionCreator = actionCreatorFactory();

export type GainManaPayload = EntityPayload<{
  amount?: number;
}>;
export type SpendManaPayload = EntityPayload<{
  amount: number;
}>;
export type EquipWeaponPayload = EntityPayload<{
  weapon: Weapon;
}>;

export const destroyWeapon = actionCreator<EntityPayload>('DESTROY_WEAPON');
export const equipWeapon = actionCreator<EquipWeaponPayload>('EQUIP_WEAPON');
export const gainMana = actionCreator<GainManaPayload>('GAIN_MANA');
export const restoreMana = actionCreator<EntityPayload>('RESTORE_MANA');
export const spendMana = actionCreator<SpendManaPayload>('SPEND_MANA');
