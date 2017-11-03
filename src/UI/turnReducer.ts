import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import { incTotalMana, restoreMana } from './characterReducer';
import { ThunkAction } from 'redux-thunk';

const actionCreator = actionCreatorFactory();

export const nextTurn = actionCreator('NEXT_TURN');

export const endTurn = (): ThunkAction<void, {}, {}> => dispatch => {
  dispatch(incTotalMana());
  dispatch(restoreMana());
  dispatch(nextTurn());
};

export default reducerWithInitialState<number>(0).case(nextTurn, R.inc);
