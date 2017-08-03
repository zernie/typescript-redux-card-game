import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';

const actionCreator = actionCreatorFactory();

export const nextTurn = actionCreator('NEXT_TURN');

export default reducerWithInitialState<number>(0).case(nextTurn, R.inc);
