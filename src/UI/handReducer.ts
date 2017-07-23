import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { hand } from './initialState';
import { Hand } from '../Hand';

export const handReducer = reducerWithInitialState<Hand>(hand);
