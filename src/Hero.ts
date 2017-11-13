import { Character, CharacterType, Playable } from './Character';
import { Ability } from './Abilities';
import { newId } from './utils';
import * as R from 'ramda';
import { Game } from './Game';

export type Hero = Readonly<
  Playable & {
    armor: number;
    mana: number;
    maximumMana: number;
    type: CharacterType.Hero;
  }
>;

export enum PlayerKind {
  Player = 'PLAYER',
  Opponent = 'OPPONENT',
}

export const other = (player: PlayerKind): PlayerKind =>
  player === PlayerKind.Player ? PlayerKind.Opponent : PlayerKind.Player;
export const craftPlayer = (props: {
  abilities?: Ability[];
  armor?: number;
  attack?: number;
  attacksPerformed?: number;
  exhausted?: boolean;
  health?: number;
  mana?: number;
  maxHealth?: number;
  maximumMana?: number;
  name: string;
  owner: PlayerKind;
}): Hero => ({
  abilities: [],
  armor: 0,
  attack: 0,
  attacksPerformed: 0,
  exhausted: false,
  health: props.maxHealth || 30,
  id: newId(),
  maxHealth: 30,
  maximumMana: 0,
  ...props,
  mana: 0,
  type: CharacterType.Hero,
});

export const canSpendMana = (hero: Hero, amount: number) =>
  hero.mana - amount >= 0;
export const reduceArmor = (hero: Hero, damage: number): number =>
  R.max(0, hero.armor - damage);
export const reduceHealth = (character: Character, damage: number): number =>
  R.min(
    character.health,
    character.type === CharacterType.Hero
      ? character.health + character.armor - damage
      : character.health - damage
  );

export const activeHero = (game: Game): Hero =>
  game.state.activePlayer === PlayerKind.Player
    ? getPlayer(game)
    : getOpponent(game);

export const getPlayer = (game: Game): Hero =>
  game.board[game.state.playerID] as Hero;
export const getOpponent = (game: Game): Hero =>
  game.board[game.state.opponentID] as Hero;
export const playerID = (player: PlayerKind, game: Game): number =>
  player === PlayerKind.Player ? getPlayer(game).id : getOpponent(game).id;
