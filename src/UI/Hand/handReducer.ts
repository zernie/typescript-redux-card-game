import { ThunkAction } from 'redux-thunk';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import { Card, CardList, CardType } from '../../Card';
import { Game } from '../../Game';
import { fromCard } from '../../Minion';
import { activeHero, canSpendMana } from '../../Hero';
import { hand } from '../initialState';
import { summonMinion } from '../Board/boardReducer';
import { spendMana } from '../Board/Hero/heroReducer';
import { drawCard } from '../Deck/deckReducer';

const actionCreator = actionCreatorFactory();
export const removeCard = actionCreator<Card>('REMOVE_CARD');

export const playCard = (payload: Card): ThunkAction<void, Game, {}> => (
  dispatch,
  getState
) => {
  const hero = activeHero(getState());
  if (!canSpendMana(hero, payload.cost)) {
    return;
  }

  dispatch(removeCard(payload));
  dispatch(spendMana({ amount: payload.cost, id: hero.id }));

  switch (payload.type) {
    case CardType.Minion:
      dispatch(summonMinion(fromCard(payload)));
      break;
    case CardType.Weapon:
      //  TODO add weapons
      return;
    default:
      return;
  }
};

const drawCardHandler = (state: CardList, payload: Card): CardList =>
  R.assoc(payload.id, payload, state);

export const removeCardHandler = (state: CardList, payload: Card): CardList =>
  R.dissoc(payload.id, state);

export default reducerWithInitialState<CardList>(hand)
  .case(removeCard, removeCardHandler)
  .case(drawCard, drawCardHandler);
