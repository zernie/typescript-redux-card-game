import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { deck } from './initialState';
import { CardList } from '../Card';

export default reducerWithInitialState<CardList>(deck);
