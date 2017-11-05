import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { hand } from './initialState';
import { CardList } from '../CardList';

export default reducerWithInitialState<CardList>(hand);
