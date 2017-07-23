import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

const actionCreator = actionCreatorFactory();

export const nextTurn = actionCreator('NEXT_TURN');
const nextTurnHandler = (state: number) => state + 1;

export const turnReducer = reducerWithInitialState<number>(0).case(
  nextTurn,
  nextTurnHandler
);
