import { AnyAction } from 'typescript-fsa';
import { cards } from './initialState';
import deckReducer from './Deck/deckReducer';
import handReducer from './Hand/handReducer';
import reduceReducers from 'reduce-reducers';
import { CardContainer } from '../Card';

export default (
  state: CardContainer = cards,
  action: AnyAction
): CardContainer => reduceReducers(deckReducer, handReducer)(state, action);
