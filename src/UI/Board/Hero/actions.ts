// import { createAction } from "../../node_modules/redux-starter-kit";
import { createAction } from 'redux-starter-kit/src';
import { Weapon } from "../../../Weapon";
import { EntityPayload } from "../actions";

export type GainManaPayload = EntityPayload<{
  amount?: number;
}>;
export type SpendManaPayload = EntityPayload<{
  amount: number;
}>;
export type EquipWeaponPayload = EntityPayload<{
  weapon: Weapon;
}>;

export const destroyWeapon = createAction<EntityPayload>("DESTROY_WEAPON");
export const equipWeapon = createAction<EquipWeaponPayload>("EQUIP_WEAPON");
export const gainMana = createAction<GainManaPayload>("GAIN_MANA");
export const restoreMana = createAction<EntityPayload>("RESTORE_MANA");
export const spendMana = createAction<SpendManaPayload>("SPEND_MANA");
