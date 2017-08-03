import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import { incTotalMana, restoreMana } from './characterReducer';

const actionCreator = actionCreatorFactory();

export const nextTurn = actionCreator('NEXT_TURN');

export const endTurn = () => (dispatch: Function) => {
  dispatch(incTotalMana({}));
  dispatch(restoreMana({}));
  dispatch(nextTurn());
};

export default reducerWithInitialState<number>(0).case(nextTurn, R.inc);
