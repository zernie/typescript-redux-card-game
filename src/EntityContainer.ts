export type EntityContainer<Entity> = {
  [id: number]: Entity;
};

export const getEntity = <T>(id: number, container: EntityContainer<T>) =>
  container[id];
