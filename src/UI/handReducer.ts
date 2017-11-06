import { ThunkAction } from 'redux-thunk';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import { Card, CardList } from '../Card';
import { hand } from './initialState';
import { summonMinion } from './boardReducer';
import { fromCard } from '../Minion';

const actionCreator = actionCreatorFactory();
export const removeCard = actionCreator<Card>('REMOVE_CARD');
export const playCard = (
  payload: Card
): ThunkAction<void, {}, {}> => dispatch => {
  dispatch(removeCard(payload));

  switch (payload.type) {
    case 'minion':
      dispatch(summonMinion(fromCard(payload)));
      break;
    case 'weapon':
      //  TODO add weapons
      return;
    default:
      return;
  }
};

export const removeCardHandler = (state: CardList, payload: Card) =>
  R.reject(R.propEq('id', payload.id), state) as CardList;

export default reducerWithInitialState<CardList>(hand).case(
  removeCard,
  removeCardHandler
);
