import { hasWindfury } from './Card';
import { Container } from './Container';
import { CardType } from './enums';
import { Game } from './Game';
import { Hero } from './Hero';
import { Minion } from './Minion';

export type Character = Hero | Minion;
export type CharacterContainer = Container<Character>;

export const getCharacter = (id: number, game: Game): Character => {
  const entity = game.play[id];

  if (entity.type === CardType.Hero || entity.type === CardType.Minion)
    return entity;

  throw new Error(`Entity ${id} is not a character.`);
};

// export const getCharacters = (game: Game): CharacterContainer =>
//   _.filter(
//     _.propEq("type", _.contains([CardType.Minion, CardType.Hero])),
//     game.play
//   ) as CharacterContainer;

export const canAttack = (character: Character): boolean =>
  character.attack > 0 && !character.exhausted;

export const shouldExhaust = (character: Character): boolean =>
  hasWindfury(character)
    ? character.attacksPerformed >= 2
    : character.attacksPerformed >= 1;
