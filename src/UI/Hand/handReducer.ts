import { ThunkAction } from 'redux-thunk';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import { Card, CardContainer } from '../../Card';
import { Game } from '../../Game';
import { activeHero, canSpendMana } from '../../Hero';
import { summonMinion } from '../Board/boardReducer';
import { equipWeapon, spendMana } from '../Board/Hero/actions';
import { CardType, Zone } from '../../enums';

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
      dispatch(summonMinion(payload));
      break;
    case CardType.Weapon:
      dispatch(equipWeapon({ id: hero.id, weapon: payload }));
      return;
    default:
      return;
  }
};

export const removeCardHandler = (
  state: CardContainer,
  payload: Card
): CardContainer => R.assocPath([payload.id, 'zone'], Zone.Graveyard, state);

export default reducerWithoutInitialState<CardContainer>().case(
  removeCard,
  removeCardHandler
);
