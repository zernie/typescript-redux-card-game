// import _ from "lodash/fp";

let _lastId = 0;
export const newId = (): number => new Date().getTime() + _lastId++;
