import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { board } from './initialState';
import { Board } from '../Board';

export default reducerWithInitialState<Board>(board);
