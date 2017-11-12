import actionCreatorFactory from 'typescript-fsa';
import { Character } from '../Character';

const actionCreator = actionCreatorFactory();

export interface CharactersPayload {
  source: Character;
  target: Character;
}
export const attackCharacter = actionCreator<CharactersPayload>(
  'ATTACK_CHARACTER'
);
export const dealDamage = actionCreator<CharactersPayload>('DEAL_DAMAGE');
export const exhaust = actionCreator<CharactersPayload>('EXHAUST');
