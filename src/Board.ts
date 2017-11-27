import * as R from 'ramda';
import { Container } from './Container';
import { Character } from './Character';
import { Minion } from './Minion';
import { EntityContainer } from './Entity';

export type MinionContainer = Container<Minion>;

export const entitiesFrom = (array: Array<Character>): EntityContainer =>
  R.indexBy<Character>(R.prop('id'), array);
