import { createReducer, Reducer } from "@reduxjs/toolkit";
import reduceReducers from "reduce-reducers";
import {
  AppThunk,
  Character,
  EntityContainer,
  isHero,
  isMinion,
  shouldExhaust,
  reduceArmor,
  reduceHealth,
  getWeapon
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
import { checkForEndGame } from "../gameStateReducer";

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

const attackCharacterHandler: CharacterHandler = (state: Character) => {
  state.attacksPerformed++;
};

const exhaustHandler: CharacterHandler = (state: Character) => {
  state.exhausted = true;
};

const damageHeroHandler: HeroHandler<DealDamagePayload> = (state, payload) => {
  const health = reduceHealth(state, payload.amount);
  state.armor = reduceArmor(state, payload.amount);
  state.destroyed = health <= 0;
  state.health = health;
};

const damageMinionHandler: MinionHandler<DealDamagePayload> = (
  state,
  payload
) => {
  const health = reduceHealth(state, payload.amount);

  state.destroyed = health <= 0;
  state.health = health;
};

const dealDamageHandler: Handler<Character, DealDamagePayload> = (
  character,
  payload
) => {
  if (isHero(character)) return damageHeroHandler(character, payload);
  return damageMinionHandler(character, payload);
};

const characterReducer = createReducer<EntityContainer>(
  {},
  {
    [exhaust.type]: getEntity(exhaustHandler),
    [attackCharacter.type]: getEntity(attackCharacterHandler),
    [dealDamage.type]: getEntity(dealDamageHandler)
  }
);

export default reduceReducers(
  characterReducer,
  minionReducer,
  heroReducer
) as Reducer<EntityContainer>;
