import * as R from 'ramda';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Card, CardList } from '../Card';
import { hand } from './initialState';

const actionCreator = actionCreatorFactory();
export const playCard = actionCreator<Card>('PLAY_CARD');

export const playCardHandler = (state: CardList, payload: Card) =>
  R.reject(R.propEq('id', payload.id), state) as CardList;

export default reducerWithInitialState<CardList>(hand).case(
  playCard,
  playCardHandler
);
