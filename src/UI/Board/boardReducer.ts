import actionCreatorFactory, { Action } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import { Minion } from '../../Minion';
import { board } from '../initialState';
import { nextTurn } from '../gameStateReducer';
import { Character } from '../../Character';
import { CardType } from '../../enums';
import { EntityContainer } from '../../Entity';
import characterReducer from './characterReducer';
import {
  attackCharacter,
  EntityPayload,
  dealDamage,
  exhaust,
} from './actions';
import { destroyWeapon, equipWeapon, gainMana, restoreMana, spendMana } from './Hero/actions';

const actionCreator = actionCreatorFactory();

export const summonMinion = actionCreator<Minion>('SUMMON_MINION');
export const processDeaths = actionCreator('PROCESS_DEATHS');

const nextTurnHandler = (state: EntityContainer): EntityContainer =>
  R.map(R.mergeDeepLeft({ attacksPerformed: 0, exhausted: false }), state);

const summonMinionHandler = (state: EntityContainer, payload: Minion): EntityContainer =>
  R.assoc(payload.id, payload, state);

const processDeathsHandler = R.reject(
  R.whereEq({ destroyed: true, type: CardType.Minion })
);

// TODO: refactor
const characterHandler = (
  state: EntityContainer,
  action: Action<EntityPayload<Object>>
): EntityContainer =>
  R.evolve(
    {
      [action.payload.id]: (character: Character) =>
        characterReducer(character, action),
    },
    state
  );

export default reducerWithInitialState<EntityContainer>(board)
  .case(nextTurn, nextTurnHandler)
  .case(summonMinion, summonMinionHandler)
  .case(processDeaths, processDeathsHandler)
  // TODO: we can give 4 elements maximum to casesWithAction method in order to make inference possible
  .casesWithAction([attackCharacter, dealDamage, exhaust, destroyWeapon], characterHandler)
  .casesWithAction(
    [equipWeapon, gainMana, restoreMana, spendMana],
    characterHandler
  );
