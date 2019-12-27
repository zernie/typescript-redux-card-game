import { createReducer, Reducer } from "@reduxjs/toolkit";
import { Character, isHero, shouldExhaust } from "../../Character";
import { CardType } from "../../enums";
import { checkForEndGame } from "../gameStateReducer";
import { EntityContainer } from "../../Entity";
import {
  attackCharacter,
  dealDamage,
  DealDamagePayload,
  destroyWeapon,
  exhaust,
  processDeaths,
  SourceTargetPayload
} from "./actions";
import minionReducer from "./Minion/minionReducer";
import heroReducer from "./Hero/heroReducer";
import { AppThunk } from "../../utils";
import reduceReducers from "reduce-reducers";
import { CharacterHandler, getEntity, Handler, HeroHandler, MinionHandler } from "./utils";
import { reduceArmor, reduceHealth } from "../../Hero";
import { getWeapon } from "../../Weapon";


// TODO: refactor
export const performAttack = (payload: SourceTargetPayload): AppThunk => (
  dispatch,
  getState
) => {
  dispatch(attackCharacter({ id: payload.source.id }));
  dispatch(
    dealDamage({
      id: payload.target.id,
      amount: payload.source.attack,
      character: payload.target
    })
  );

  const game = getState();
  const attacker = game.play[payload.source.id] as Character;

  if (payload.target.type === CardType.Minion) {
    dispatch(
      dealDamage({
        id: attacker.id,
        amount: payload.target.attack,
        character: payload.target
      })
    );
  }

  if (isHero(attacker) && attacker.weaponId) {
    const weapon = getWeapon(attacker.weaponId, game);
    if (weapon.durability <= 0) {
      dispatch(destroyWeapon({ id: weapon.id }));
    }
  }

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

const damageHeroHandler: HeroHandler<DealDamagePayload> = (
  state,
  payload
) => {
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

const dealDamageHandler: Handler<Character, DealDamagePayload> = (character, payload) => {
  if (isHero(character)) return damageHeroHandler(character, payload);
  return damageMinionHandler(character, payload);
};

const characterReducer = createReducer<EntityContainer>({}, {
  [exhaust.type]: getEntity(exhaustHandler),
  [attackCharacter.type]: getEntity(attackCharacterHandler),
  [dealDamage.type]: getEntity(dealDamageHandler)
});

export default reduceReducers(characterReducer, minionReducer, heroReducer) as Reducer<EntityContainer>;
