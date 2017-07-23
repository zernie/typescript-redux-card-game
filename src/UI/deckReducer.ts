import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { deck } from './initialState';
import { Deck } from '../Deck';

export const deckReducer = reducerWithInitialState<Deck>(deck);
