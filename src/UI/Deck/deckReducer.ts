import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import * as R from 'ramda';
import { CardContainer } from '../../Card';
import { Zone } from '../../enums';

const actionCreator = actionCreatorFactory();
export const drawCard = actionCreator<number>('DRAW_CARD');

const drawCardHandler = (state: CardContainer, payload: number): CardContainer =>
  R.assocPath([payload, 'zone'], Zone.Hand, state);

export default reducerWithoutInitialState<CardContainer>().case(
  drawCard,
  drawCardHandler
);
