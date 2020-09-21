import _ from "lodash/fp";
import { Character, ICharacter } from "./Character";
import { Abilities } from "./Abilities";
import { newId } from "./utils";
import { Game } from "./Game";
import { CardClass, CardType, Controller, Zone } from "./enums";
import { isHero } from "./Entity";
import { MAX_HEALTH } from "./constants";
// import { Model } from "redux-orm";

export interface Hero extends ICharacter {
  readonly type: CardType.Hero;
  weaponID: number | null;
}

interface CraftHeroProps {
  cardID: string;
  name: string;
  owner: Controller;

  cardClass?: CardClass;
  abilities?: Abilities;
  armor?: number;
  attack?: number;
  attacksPerformed?: number;
  exhausted?: boolean;
  health?: number;
  maxHealth?: number;
  weaponId?: number;
  zone?: Zone;
}

export const craftHero = (props: CraftHeroProps): Hero =>
  ({
    abilities: [],
    armor: 0,
    attack: 0,
    attacksPerformed: 0,
    attacking: false,
    defending: false,
    cost: 0,
    destroyed: false,
    exhausted: false,
    health: props.maxHealth || MAX_HEALTH,
    id: newId(),
    maxHealth: 30,
    zone: Zone.Play,
    cardClass: CardClass.Neutral,
    weaponID: null,
    text: null,
    ...props,
    type: CardType.Hero
  } as Hero);

export const reduceArmor = (hero: Hero, damage: number): number =>
  Math.max(0, hero.armor - damage);

export const reduceHealth = (character: Character, damage: number): number =>
  Math.min(
    character.health,
    isHero(character)
      ? character.health + character.armor - damage
      : character.health - damage
  );

export const getPlayerHero = (game: Game): Hero =>
  game.play[game.state.playerHeroID] as Hero;

export const getOpponentHero = (game: Game): Hero =>
  game.play[game.state.opponentHeroID] as Hero;

// export class Hero extends Model {
//   static modelName = "Hero";
// }
