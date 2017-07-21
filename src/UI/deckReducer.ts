import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { deck } from './initialState';
import { Deck } from '../Deck';

const deckReducer = reducerWithInitialState<Deck>(deck);

export default deckReducer;
