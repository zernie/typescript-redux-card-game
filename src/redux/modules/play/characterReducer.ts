import { createReducer, Reducer } from "@reduxjs/toolkit";
import reduceReducers from "reduce-reducers";
import _ from "lodash/fp";
import {
  AppThunk,
  Character,
  EntityContainer,
  isHero,
  isMinion,
  shouldExhaust,
  reduceArmor,
  reduceHealth,
  getWeapon,
  charsFromContainer
} from "../../../types";
import {
  DealDamagePayload,
  SourceTargetPayload,
  attackCharacter,
  dealDamage,
  destroyWeapon,
  exhaust,
  processDeaths
} from "./actions";
import minionReducer from "./minionReducer";
import heroReducer from "./heroReducer";
import {
  CharacterHandler,
  Handler,
  HeroHandler,
  MinionHandler,
  getEntity
} from "../../utils";
import { checkForEndGame, nextTurn } from "../gameStateReducer";
import { original } from "immer";

// TODO: refactor
export const performAttack = ({
  target,
  source
}: SourceTargetPayload): AppThunk => (dispatch, getState) => {
  dispatch(attackCharacter({ id: source.id }));
  dispatch(
    dealDamage({
      id: target.id,
      amount: source.attack,
      character: target
    })
  );
  const game = getState();

  if (isMinion(target)) {
    dispatch(
      dealDamage({
        id: source.id,
        amount: target.attack,
        character: source
      })
    );
  }
  if (isHero(source) && source.weaponId) {
    const weapon = getWeapon(source.weaponId, game);
    if (weapon.durability <= 0) {
      dispatch(destroyWeapon({ id: weapon.id }));
    }
  }

  const attacker = game.play[source.id] as Character;
  if (shouldExhaust(attacker)) {
    dispatch(exhaust({ id: attacker.id }));
  }

  dispatch(processDeaths());
  dispatch(checkForEndGame());
};

const nextTurnHandler = (state: EntityContainer) => {
  const chars = charsFromContainer(state);
  // _.forEach(_.assign({ attacksPerformed: 0, exhausted: false }), chars);
  // TODO: refactor
  _.forEach(char => {
    char.attacksPerformed = 0;
    char.exhausted = false;
  }, chars);
};

const attackCharacterHandler: CharacterHandler = (char: Character) => {
  char.attacksPerformed++;
};

const exhaustHandler: CharacterHandler = (char: Character) => {
  char.exhausted = true;
};

const damageHeroHandler: HeroHandler<DealDamagePayload> = (
  char,
  { amount }
) => {
  const health = reduceHealth(char, amount);
  char.armor = reduceArmor(char, amount);
  char.destroyed = health <= 0;
  char.health = health;
};

const damageMinionHandler: MinionHandler<DealDamagePayload> = (
  char,
  payload
) => {
  const health = reduceHealth(char, payload.amount);

  char.destroyed = health <= 0;
  char.health = health;
};

const dealDamageHandler: Handler<Character, DealDamagePayload> = (
  char,
  payload
) => {
  if (isHero(char)) return damageHeroHandler(char, payload);
  return damageMinionHandler(char, payload);
};

const characterReducer = createReducer<EntityContainer>(
  {},
  {
    [exhaust.type]: getEntity(exhaustHandler),
    [attackCharacter.type]: getEntity(attackCharacterHandler),
    [dealDamage.type]: getEntity(dealDamageHandler),
    [nextTurn.type]: nextTurnHandler
  }
);

export default reduceReducers(
  characterReducer,
  minionReducer,
  heroReducer
) as Reducer<EntityContainer>;
