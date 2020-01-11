import { createAction } from "@reduxjs/toolkit";
import { Weapon, Minion, TriggerType, Character } from "../../../models";
import { EntityPayload } from "../../utils";

export type GainManaPayload = EntityPayload<{
  amount?: number;
}>;
export type SpendManaPayload = EntityPayload<{
  amount: number;
}>;
export type EquipWeaponPayload = EntityPayload<{
  weapon: Weapon;
}>;

// export type DealDamagePayload = EntityPayload<{ amount: number }>;
export interface DealDamagePayload {
  amount: number;
  id: number | number[];
}

export type FatigueDamagePayload = EntityPayload<{ heroId: number }>;
export type TriggerEventPayload = {
  trigger: TriggerType;
  id: number | number[];
};
export interface SourceTargetPayload {
  source: Character;
  target: Character;
}

export const attackCharacter = createAction<EntityPayload>("ATTACK_CHARACTER");
export const dealDamage = createAction<DealDamagePayload>("DEAL_DAMAGE");
export const exhaust = createAction<EntityPayload>("EXHAUST");
export const destroyWeapon = createAction<Weapon>("DESTROY_WEAPON");
export const equipWeapon = createAction<EquipWeaponPayload>("EQUIP_WEAPON");
export const gainMana = createAction<GainManaPayload>("GAIN_MANA");
export const restoreMana = createAction<EntityPayload>("RESTORE_MANA");
export const spendMana = createAction<SpendManaPayload>("SPEND_MANA");
export const summonMinion = createAction<Minion>("SUMMON_MINION");
export const processDeaths = createAction("PROCESS_DEATHS");
export const triggerEvent = createAction<TriggerEventPayload>("TRIGGER_EVENT");
export const fatigueDamage = createAction<FatigueDamagePayload>(
  "FATIGUE_DAMAGE"
);
