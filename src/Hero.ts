import { Character } from './Character';
import { Abilities } from './Abilities';
import { newId } from './utils';
import * as R from 'ramda';
import { Game } from './Game';
import { Playable } from './Playable';
import { Weapon } from './Weapon';
import { CardType, PlayerKind, PlayState } from './enums';

export type Hero = Readonly<
  Playable & {
    armor: number;
    mana: number;
    maximumMana: number;
    playState: PlayState;
    type: CardType.Hero;
    weapon?: Weapon;
  }
>;

export const other = (player: PlayerKind): PlayerKind =>
  player === PlayerKind.Player ? PlayerKind.Opponent : PlayerKind.Player;
export const craftHero = (props: {
  abilities?: Abilities;
  armor?: number;
  attack?: number;
  attacksPerformed?: number;
  cardID: string;
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
  destroyed: false,
  exhausted: false,
  health: props.maxHealth || 30,
  id: newId(),
  mana: 0,
  maxHealth: 30,
  maximumMana: 0,
  ...props,
  playState: PlayState.Playing,
  type: CardType.Hero,
});

export const canSpendMana = (hero: Hero, amount: number) =>
  hero.mana - amount >= 0;
export const reduceArmor = (hero: Hero, damage: number): number =>
  R.max(0, hero.armor - damage);
export const reduceHealth = (character: Character, damage: number): number =>
  R.min(
    character.health,
    character.type === CardType.Hero
      ? character.health + character.armor - damage
      : character.health - damage
  );

export const activeHero = (game: Game): Hero =>
  game.state.activePlayer === PlayerKind.Player
    ? getPlayer(game)
    : getOpponent(game);

export const getPlayer = (game: Game): Hero =>
  game.entities[game.state.playerID] as Hero;
export const getOpponent = (game: Game): Hero =>
  game.entities[game.state.opponentID] as Hero;
export const playerID = (player: PlayerKind, game: Game): number =>
  player === PlayerKind.Player ? getPlayer(game).id : getOpponent(game).id;
export const opponentID = (player: PlayerKind, game: Game): number =>
  player === PlayerKind.Player ? getPlayer(game).id : getOpponent(game).id;
