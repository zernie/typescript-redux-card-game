import { createReducer, PayloadAction, Reducer } from "@reduxjs/toolkit";
import reduceReducers from "reduce-reducers";
import _ from "lodash/fp";
import {
  AppThunk,
  Character,
  EntityContainer,
  Weapon,
  getCharacters,
  getCharactersById,
  getWeapon,
  isHero,
  isMinion,
  reduceArmor,
  reduceHealth,
  shouldBeDestroyed,
  shouldExhaust,
  getEntity
} from "../../../models";
import {
  attackCharacter,
  dealDamage,
  DealDamagePayload,
  destroyWeapon,
  exhaust,
  processDeaths
} from "./actions";
import {
  CharacterHandler,
  extractEntity,
  HeroHandler,
  MinionHandler
} from "../../utils";
import minionReducer from "./minionReducer";
import heroReducer from "./heroReducer";
import { checkForEndGame, nextTurn } from "../gameStateReducer";

export interface SourceTargetPayload {
  source: Character;
  target: Character;
}

// TODO: refactor
export const performAttack = ({
  target,
  source
}: SourceTargetPayload): AppThunk => (dispatch, getState) => {
  dispatch(attackCharacter({ id: source.id }));
  dispatch(
    dealDamage({
      amount: source.attack,
      ids: [target.id]
    })
  );
  const game = getState();

  if (isMinion(target)) {
    dispatch(
      dealDamage({
        amount: target.attack,
        ids: [source.id]
      })
    );
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

const damageHeroHandler: HeroHandler<DealDamagePayload> = (
  char,
  { amount }
) => {
  const health = reduceHealth(char, amount);
  char.armor = reduceArmor(char, amount);
  char.health = health;
  char.destroyed = shouldBeDestroyed(char);
};

const damageMinionHandler: MinionHandler<DealDamagePayload> = (
  char,
  { amount }
) => {
  char.health = reduceHealth(char, amount);
  char.destroyed = shouldBeDestroyed(char);
};

const dealDamageHandler = (
  state: EntityContainer,
  { payload }: PayloadAction<DealDamagePayload>
) => {
  const chars = getCharactersById(state, payload.ids);

  _.forEach(
    char =>
      isHero(char)
        ? damageHeroHandler(char, payload)
        : damageMinionHandler(char, payload),
    chars
  );
};

const nextTurnHandler = (state: EntityContainer) => {
  const chars = getCharacters(state);
  _.forEach(char => {
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
