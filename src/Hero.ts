import { Character } from "./Character";
import { Abilities } from "./Abilities";
import { newId } from "./utils";
import * as _ from "lodash/fp";
import { Game } from "./Game";
import { Playable } from "./Playable";
import { CardType, Controller, Zone } from "./enums";
import { getOpponent, getPlayer, Player } from "./Player";

export interface Hero extends Playable {
  armor: number;
  type: CardType.Hero;
}

export interface CraftHeroProps {
  abilities?: Abilities;
  armor?: number;
  attack?: number;
  attacksPerformed?: number;
  cardID: string;
  exhausted?: boolean;
  health?: number;
  maxHealth?: number;
  name: string;
  owner: Controller;
  zone: Zone;
}

export const craftHero = (props: CraftHeroProps): Hero =>
  ({
    abilities: [],
    armor: 0,
    attack: 0,
    attacksPerformed: 0,
    cost: 0,
    destroyed: false,
    exhausted: false,
    health: props.maxHealth || 30,
    id: newId(),
    maxHealth: 30,
    ...props,
    type: CardType.Hero
  } as Hero);

export const canSpendMana = (player: Player, amount: number) =>
  player.mana - amount >= 0;
export const reduceArmor = (hero: Hero, damage: number): number =>
  Math.max(0, hero.armor - damage);

export const reduceHealth = (character: Character, damage: number): number =>
  Math.min(
    character.health,
    character.type === CardType.Hero
      ? character.health + character.armor - damage
      : character.health - damage
  );

export const activeHero = (game: Game): Hero =>
  game.state.activePlayer === Controller.Player
    ? getPlayerHero(game)
    : getOpponentHero(game);

export const getActivePlayer = (game: Game) =>
  _.find(
    entity =>
      entity.type === CardType.Player &&
      entity.owner === game.state.activePlayer,
    game.entities
  ) as Player;

export const getPlayerHero = (game: Game): Hero =>
  game.entities[getPlayer(game).hero] as Hero;
export const getOpponentHero = (game: Game): Hero =>
  game.entities[getOpponent(game).hero] as Hero;
// export const playerID = (player: Player, game: Game): number =>
//   player === Player.Player ? getPlayerHero(game).id : getOpponentHero(game).id;
// export const opponentID = (player: Player, game: Game): number =>
//   player === Player.Player ? getPlayerHero(game).id : getOpponentHero(game).id;
