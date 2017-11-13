import actionCreatorFactory from 'typescript-fsa';
import { Character } from '../Character';

const actionCreator = actionCreatorFactory();
export type CharacterPayload<T> = T & { id: number };

export type AttackCharacterPayload = CharacterPayload<{}>;
export type CharactersPayload = SourceTargetPayload | ExhaustPayload;
export type SourceTargetPayload = CharacterPayload<{
  source: Character;
  target: Character;
}>;
export type ExhaustPayload = CharacterPayload<Character>;

export const attackCharacter = actionCreator<AttackCharacterPayload>(
  'ATTACK_CHARACTER'
);
export const dealDamage = actionCreator<SourceTargetPayload>('DEAL_DAMAGE');
export const exhaust = actionCreator<ExhaustPayload>('EXHAUST');
