import * as R from 'ramda';

let _lastId = 0;
export const newId = (): number => new Date().getTime() + _lastId++;

export const size = R.pipe(R.values, R.length);
