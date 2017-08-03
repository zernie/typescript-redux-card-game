import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { deck } from './initialState';
import { Deck } from '../Deck';

export default reducerWithInitialState<Deck>(deck);
