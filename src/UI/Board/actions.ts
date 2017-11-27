import actionCreatorFactory from 'typescript-fsa';
import { Character } from '../../Character';

const actionCreator = actionCreatorFactory();
export type EntityPayload<T = {}> = T & { id: number };

export type SourceTargetPayload = EntityPayload<{
  source: Character;
  target: Character;
}>;
export type DealDamagePayload = EntityPayload<{ amount: number }>;

export const attackCharacter = actionCreator<EntityPayload>(
  'ATTACK_CHARACTER'
);
export const dealDamage = actionCreator<DealDamagePayload>('DEAL_DAMAGE');
export const exhaust = actionCreator<EntityPayload>('EXHAUST');
