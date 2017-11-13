import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { deck } from '../initialState';
import actionCreatorFactory from 'typescript-fsa';
import * as R from 'ramda';
import { Card, CardList } from '../../Card';

const actionCreator = actionCreatorFactory();
export const drawCard = actionCreator<Card>('DRAW_CARD');

const drawCardHandler = (state: CardList, payload: Card): CardList =>
  R.dissoc(payload.id, state);

export default reducerWithInitialState<CardList>(deck).case(
  drawCard,
  drawCardHandler
);
