import actionCreatorFactory, { Action } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import { Board } from '../../Board';
import { Minion } from '../../Minion';
import { board } from '../initialState';
import { nextTurn } from '../gameStateReducer';
import characterReducer from './characterReducer';
import { getEntity } from '../../EntityContainer';
import { Character } from '../../Character';
import {
  attackCharacter,
  CharacterPayload,
  dealDamage,
  exhaust,
} from './actions';
import {
  equipWeapon,
  gainMana,
  restoreMana,
  spendMana,
} from './Hero/heroReducer';
import { CardType } from '../../enums';

const actionCreator = actionCreatorFactory();

export const summonMinion = actionCreator<Minion>('SUMMON_MINION');
export const processDeaths = actionCreator('PROCESS_DEATHS');

const nextTurnHandler = (state: Board): Board =>
  R.map(R.mergeDeepLeft({ attacksPerformed: 0, exhausted: false }), state);

const summonMinionHandler = (state: Board, payload: Minion): Board =>
  R.assoc(payload.id, payload, state);

const processDeathsHandler = R.reject(
  R.whereEq({ destroyed: true, type: CardType.Minion })
);

// TODO: refactor
const characterHandler = (
  state: Board,
  action: Action<CharacterPayload>
): Board =>
  R.merge(state, {
    [action.payload.id]: characterReducer(
      getEntity<Character>(action.payload.id, state),
      action
    ),
  });

export default reducerWithInitialState<Board>(board)
  .case(nextTurn, nextTurnHandler)
  .case(summonMinion, summonMinionHandler)
  .case(processDeaths, processDeathsHandler)
  .casesWithAction(
    [
      attackCharacter,
      dealDamage,
      exhaust,
      equipWeapon,
      gainMana,
      restoreMana,
      spendMana,
    ],
    characterHandler
  );
