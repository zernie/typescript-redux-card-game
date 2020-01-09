import { createReducer, PayloadAction, Reducer } from "@reduxjs/toolkit";
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
  getCharacters,
  getCharactersById
} from "../../../models";
import {
  DealDamagePayload,
  attackCharacter,
  dealDamage,
  destroyWeapon,
  exhaust,
  processDeaths
} from "./actions";
import {
  CharacterHandler,
  HeroHandler,
  MinionHandler,
  getEntity
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
      id: target.id,
      amount: source.attack,
      ids: [target.id]
    })
  );
  const game = getState();

  if (isMinion(target)) {
    dispatch(
      dealDamage({
        id: source.id,
        amount: target.attack,
        ids: [source.id]
      })
    );
  }
  if (isHero(source) && source.weaponID) {
    const weapon = getWeapon(source.weaponID, game);
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
  // _.forEach(_.assign({ attacksPerformed: 0, exhausted: false }), chars);
  // TODO: refactor
  _.forEach(char => {
    char.attacksPerformed = 0;
    char.exhausted = false;
  }, chars);
};

const characterReducer = createReducer<EntityContainer>(
  {},
  {
    [exhaust.type]: getEntity(exhaustHandler),
    [attackCharacter.type]: getEntity(attackCharacterHandler),
    [dealDamage.type]: dealDamageHandler,
    [nextTurn.type]: nextTurnHandler
  }
);

export default reduceReducers(
  characterReducer,
  minionReducer,
  heroReducer
) as Reducer<EntityContainer>;
