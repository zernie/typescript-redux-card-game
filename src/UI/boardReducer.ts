import actionCreatorFactory, {
  Action,
} from 'typescript-fsa';
import { reducerWithInitialState, } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import { Board } from '../Board';
import { Minion } from '../Minion';
import { board } from './initialState';
import { nextTurn } from './gameStateReducer';
import characterReducer from './characterReducer';
import { getEntity } from '../EntityContainer';
import { Character } from '../Character';
import { attackCharacter, CharactersPayload, dealDamage, exhaust } from './actions';
import { gainMana, restoreMana, spendMana } from './heroReducer';

const actionCreator = actionCreatorFactory();

export const summonMinion = actionCreator<Minion>('SUMMON_MINION');

const nextTurnHandler = R.map(
  R.mergeDeepLeft({ attacksPerformed: 0, exhausted: false })
);

const summonMinionHandler = (state: Board, payload: Minion): Board =>
  R.assoc(payload.id, payload, state);

// TODO: refactor
const characterHandler = (
  state: Board,
  action: Action<CharactersPayload>
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
  .casesWithAction([attackCharacter, dealDamage, exhaust, gainMana, restoreMana, spendMana], characterHandler);
