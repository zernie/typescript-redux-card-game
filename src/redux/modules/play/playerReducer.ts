import { createReducer } from "@reduxjs/toolkit";
import _ from "lodash/fp";
import {
  fatigueDamage,
  FatigueDamagePayload,
  gainMana,
  GainManaPayload,
  processDeaths,
  restoreMana,
  spendMana,
  SpendManaPayload
} from "./actions";
import {
  AppThunk,
  canSpendMana,
  CardType,
  EntityContainer,
  Hero,
  MAX_MANA,
  Player,
  PlayState,
  Zone
} from "../../../models";
import { extractEntity, HeroHandler, PlayerHandler } from "../../utils";

const gainManaHandler: PlayerHandler<GainManaPayload> = (
  state,
  { amount = 1 }
) => {
  if (state.maximumMana >= MAX_MANA)
    return console.warn(`Cannot gain more than max mana amount (${MAX_MANA}).`);

  state.maximumMana += amount;
};

const restoreManaHandler: PlayerHandler<GainManaPayload> = (state) => {
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

// TODO: refactor
const processDeathsHandler = (state: EntityContainer) => {
  const destroyedHeroes = _.filter(
    _.whereEq({ destroyed: true, type: CardType.Hero, zone: Zone.Play }),
    state
  ) as Hero[];

  _.forEach((hero: Hero) => {
    const player = state[hero.owner] as Player;
    if (hero.destroyed) {
      player.playState = PlayState.Lost;
    }
  }, destroyedHeroes);
};

const fatigueDamageHandler: PlayerHandler<FatigueDamagePayload> = (player) => {
  player.fatigue++;
};

export default createReducer<EntityContainer>(
  {},
  {
    [gainMana.type]: extractEntity(gainManaHandler),
    [restoreMana.type]: extractEntity(restoreManaHandler),
    [spendMana.type]: extractEntity(spendManaHandler),
    [processDeaths.type]: processDeathsHandler,
    [fatigueDamage.type]: extractEntity(fatigueDamageHandler)
  }
);
