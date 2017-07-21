import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { hand } from './initialState';
import { Hand } from '../Hand';

const handReducer = reducerWithInitialState<Hand>(hand);

export default handReducer;
