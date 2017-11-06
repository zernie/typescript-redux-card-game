import { ThunkAction } from 'redux-thunk';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import { Card, CardList } from '../Card';
import { hand } from './initialState';
import { summonMinion } from './boardReducer';
import { fromCard } from '../Minion';
import { spendMana } from './characterReducer';
import { currentPlayer, Game } from '../Game';
import { canSpendMana } from '../Hero';

const actionCreator = actionCreatorFactory();
export const removeCard = actionCreator<Card>('REMOVE_CARD');
export const playCard = (payload: Card): ThunkAction<void, Game, {}> => (
  dispatch,
  getState
) => {
  const hero = currentPlayer(getState());
  if (!canSpendMana(hero, payload.cost)) {
    return;
  }

  dispatch(removeCard(payload));
  dispatch(spendMana(payload.cost));

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
