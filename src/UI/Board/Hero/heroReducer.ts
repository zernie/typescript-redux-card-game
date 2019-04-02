// import { createAction, createReducer } from 'redux-starter-kit';
import { createAction } from 'redux-starter-kit/src';
import { createReducer } from 'redux-starter-kit/src';
import * as _ from "lodash/fp";
import { canSpendMana, Hero, reduceArmor, reduceHealth } from "../../../Hero";
import { attackCharacter, dealDamage, DealDamagePayload } from "../actions";
import { Character } from "../../../Character";
import {
  destroyWeapon,
  equipWeapon,
  EquipWeaponPayload,
  gainMana,
  GainManaPayload,
  restoreMana,
  spendMana,
  SpendManaPayload
} from "./actions";
import { PlayState } from "../../../enums";

// const maximumManaLens = R.lensProp<number, Hero>("maximumMana");
// const manaLens = R.lensProp<number, Hero>("mana");
//
// const attackCharacterHandler = R.evolve<Hero>({
//   attacksPerformed: R.inc,
//   weapon: { durability: R.dec }
// });
//
// const destroyWeaponHandler = R.assoc<keyof Hero, null>("weapon", null);
//
// const equipWeaponHandler = (state: Hero, payload: EquipWeaponPayload) =>
//   R.merge<Hero, {}>(state, {
//     attack: payload.weapon.attack,
//     weapon: payload.weapon
//   });
//
// const gainManaHandler = (state: Hero, payload: GainManaPayload) =>
//   state.maximumMana < 10
//     ? R.over(maximumManaLens, R.add(payload.amount || 1), state)
//     : state;
//
// const restoreManaHandler = (state: Hero) =>
//   R.set(manaLens, R.view(maximumManaLens, state), state);
//
// const spendManaHandler = (state: Hero, payload: SpendManaPayload) =>
//   canSpendMana(state, payload.amount)
//     ? R.set(manaLens, state.mana - payload.amount, state)
//     : state;
//
// const damageHeroHandler = (state: Hero, payload: DealDamagePayload): Hero => {
//   const health = reduceHealth(state, payload.amount);
//   const destroyed = health <= 0;
//
//   return R.merge(state, {
//     armor: reduceArmor(state, payload.amount),
//     destroyed,
//     playState: destroyed ? PlayState.Lost : state.playState,
//     health: health
//   });
// };

export default createReducer(undefined, {})//<Hero, Character>()
  // .case(attackCharacter, attackCharacterHandler)
  // .case(destroyWeapon, destroyWeaponHandler)
  // .case(equipWeapon, equipWeaponHandler)
  // .case(gainMana, gainManaHandler)
  // .case(restoreMana, restoreManaHandler)
  // .case(spendMana, spendManaHandler)
  // .case(dealDamage, damageHeroHandler);
