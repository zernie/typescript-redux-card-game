import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { hand } from './initialState';
import { CardList } from '../Card';

export default reducerWithInitialState<CardList>(hand);
