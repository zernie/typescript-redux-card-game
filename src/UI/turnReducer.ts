import { actionCreatorFactory } from 'typescript-fsa';
const actionCreator = actionCreatorFactory();

import { reducerWithInitialState } from 'typescript-fsa-reducers';
export const nextTurn = actionCreator<number>('NEXT_TURN');
const nextTurnHandler = (state: number = 0, payload: any) => {
  return state + 1;
};

const turnReducer = reducerWithInitialState<number>(0).case(
  nextTurn,
  nextTurnHandler
);

export default turnReducer;
