import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash/fp";
import {
  dealDamage,
  DealDamagePayload,
  gainMana,
  GainManaPayload,
  restoreMana,
  spendMana,
  SpendManaPayload
} from "./actions";
import {
  Player,
  EntityContainer,
  PlayState,
  MAX_MANA,
  canSpendMana,
  isHero,
  getCharactersById
} from "../../../models";
import { getEntity, PlayerHandler } from "../../utils";

const gainManaHandler: PlayerHandler<GainManaPayload> = (
  state,
  { amount = 1 }
) => {
  if (state.maximumMana >= MAX_MANA)
    return console.warn(`Cannot gain more than max mana amount (${MAX_MANA}).`);

  state.maximumMana += amount;
};

const restoreManaHandler: PlayerHandler<GainManaPayload> = state => {
  state.mana = state.maximumMana;
};

const spendManaHandler: PlayerHandler<SpendManaPayload> = (
  state: Player,
  { amount }
) => {
  if (!canSpendMana(state, amount))
    return console.warn(
      `Cannot spend more than current mana amount (${state.mana}).`
    );

  state.mana -= amount;
};

const dealDamageHandler = (
  state: EntityContainer,
  action: PayloadAction<DealDamagePayload>
) => {
  const chars = getCharactersById(state, action.payload.ids);

  _.forEach(char => {
    if (!(isHero(char) && char.destroyed)) return;

    const player = state[char.owner] as Player;
    // const opponent = state[char.owner] as Player;
    player.playState = PlayState.Lost;
  }, chars);
};

export default createReducer<EntityContainer>(
  {},
  {
    [gainMana.type]: getEntity(gainManaHandler),
    [restoreMana.type]: getEntity(restoreManaHandler),
    [spendMana.type]: getEntity(spendManaHandler),
    [dealDamage.type]: dealDamageHandler
  }
);
