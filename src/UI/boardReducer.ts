import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { board } from './initialState';
import { Board } from '../Board';

const boardReducer = reducerWithInitialState<Board>(board);

export default boardReducer;
