import { Character } from "../../Character";
import { Weapon } from "../../Weapon";
import { createAction } from 'redux-starter-kit';
export type EntityPayload<T = {}> = T & { id: number };

export type GainManaPayload = EntityPayload<{
  amount?: number;
}>;
export type SpendManaPayload = EntityPayload<{
  amount: number;
}>;
export type EquipWeaponPayload = EntityPayload<{
  weapon: Weapon;
}>;

export type DealDamagePayload = EntityPayload<{ amount: number }>;

export type SourceTargetPayload = EntityPayload<{
  source: Character;
  target: Character;
}>;

export const attackCharacter = createAction<EntityPayload>("ATTACK_CHARACTER");
export const dealDamage = createAction<DealDamagePayload>("DEAL_DAMAGE");
export const exhaust = createAction<EntityPayload>("EXHAUST");
export const destroyWeapon = createAction<EntityPayload>("DESTROY_WEAPON");
export const equipWeapon = createAction<EquipWeaponPayload>("EQUIP_WEAPON");
export const gainMana = createAction<GainManaPayload>("GAIN_MANA");
export const restoreMana = createAction<EntityPayload>("RESTORE_MANA");
export const spendMana = createAction<SpendManaPayload>("SPEND_MANA");
