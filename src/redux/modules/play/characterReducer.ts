import { createReducer, PayloadAction, Reducer } from "@reduxjs/toolkit";
import reduceReducers from "reduce-reducers";
import _ from "lodash/fp";
import {
  AppThunk,
  Character,
  EntityContainer,
  getCharacters,
  getCharactersById,
  getEntity,
  isHero,
  isMinion,
  reduceArmor,
  reduceHealth,
  shouldBeDestroyed,
  shouldExhaust,
  TriggerType,
  Weapon
} from "../../../models";
import {
  attackCharacter,
  dealDamage,
  DealDamagePayload,
  destroyWeapon,
  exhaust,
  processDeaths,
  SourceTargetPayload,
  triggerEvent
} from "./actions";
import { CharacterHandler, extractEntity } from "../../utils";
import minionReducer from "./minionReducer";
import heroReducer from "./heroReducer";
import { checkForEndGame, nextTurn } from "../gameStateReducer";

export const attackBlock = ({
  target,
  source
}: SourceTargetPayload): AppThunk => (dispatch, getState) => {
  dispatch(triggerEvent({ id: source.id, trigger: TriggerType.Attack }));
  dispatch(attackCharacter({ id: source.id }));
  dispatch(triggerEvent({ id: source.id, trigger: TriggerType.AfterAttack }));
};

export const dealDamageBlock = (
  source: number,
  target: number | number[],
  amount: number
): AppThunk => (dispatch, getState) => {
  dispatch(triggerEvent({ id: source, trigger: TriggerType.PreDamage }));
  dispatch(
    dealDamage({
      amount,
      id: target
    })
  );
  dispatch(triggerEvent({ id: source, trigger: TriggerType.DealDamage }));
  dispatch(triggerEvent({ id: target, trigger: TriggerType.TakeDamage }));
};

// TODO: refactor
export const performAttack = ({
  target,
  source
}: SourceTargetPayload): AppThunk => (dispatch, getState) => {
  dispatch(attackBlock({ source, target }));
  dispatch(dealDamageBlock(source.id, target.id, source.attack));
  const game = getState();

  // Hit back if target is a minion
  if (isMinion(target)) {
    dispatch(dealDamageBlock(target.id, source.id, target.attack));
  }
  if (isHero(source) && source.weaponID) {
    const weapon = getEntity(game.play, source.weaponID) as Weapon;
    if (weapon && weapon.health <= 0) {
      dispatch(destroyWeapon(weapon));
    }
  }

  const attacker = game.play[source.id] as Character;
  if (shouldExhaust(attacker)) {
    dispatch(exhaust({ id: attacker.id }));
  }

  dispatch(processDeaths());
  dispatch(checkForEndGame());
};

const attackCharacterHandler: CharacterHandler = (char: Character) => {
  char.attacksPerformed++;
};

const exhaustHandler: CharacterHandler = (char: Character) => {
  char.exhausted = true;
};

const dealDamageHandler = (
  state: EntityContainer,
  { payload: { amount, id } }: PayloadAction<DealDamagePayload>
) => {
  const chars = getCharactersById(state, _.castArray(id));

  _.forEach((char) => {
    char.health = reduceHealth(char, amount);
    // TODO: refactor
    if (isHero(char)) {
      char.armor = reduceArmor(char, amount);
    }
    char.destroyed = shouldBeDestroyed(char);
  }, chars);
};

const nextTurnHandler = (state: EntityContainer) => {
  const chars = getCharacters(state);
  _.forEach((char) => {
    char.attacksPerformed = 0;
    char.exhausted = false;
  }, chars);
};

const characterReducer = createReducer<EntityContainer>(
  {},
  {
    [exhaust.type]: extractEntity(exhaustHandler),
    [attackCharacter.type]: extractEntity(attackCharacterHandler),
    [dealDamage.type]: dealDamageHandler,
    [nextTurn.type]: nextTurnHandler
  }
);

export default reduceReducers(
  characterReducer,
  minionReducer,
  heroReducer
) as Reducer<EntityContainer>;
