import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { deck } from './initialState';
import { CardList } from '../CardList';

export default reducerWithInitialState<CardList>(deck);
