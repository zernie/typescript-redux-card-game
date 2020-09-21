// import _ from "lodash/fp";
import { ThunkAction } from "redux-thunk";
import { Game } from "./Game";
import { Action } from "redux";
import { CardData, CardType, Controller, Zone } from "./enums";
import { craftMinion } from "./Minion";
import { craftWeapon } from "./Weapon";
import { Card } from "./Card";
import { craftHero } from "./Hero";

let _lastId = 0;
export const newId = (): number => new Date().getTime() + _lastId++;

export type AppThunk = ThunkAction<void, Game, null, Action<string>>;

/** Import a card from hearthstonejson.com */
export function importCard(
  data: CardData,
  zone: Zone,
  owner: Controller
): Card {
  switch (data.type) {
    case CardType.Hero:
      return craftHero({
        cardID: data.id,
        health: data.health || 0,
        abilities: data.mechanics || [],
        attack: data.attack || 0,
        name: data.name,
        zone,
        owner
      });
    case CardType.Minion:
      return craftMinion({
        cardID: data.id,
        maxHealth: data.health || 0,
        abilities: data.mechanics || [],
        attack: data.attack || 0,
        cost: data.cost || 0,
        name: data.name,
        zone,
        owner
      });
    case CardType.Weapon:
      return craftWeapon({
        cardID: data.id,
        health: data.health || 0,
        abilities: data.mechanics || [],
        attack: data.attack || 0,
        heroId: 0, // FIXME
        cost: data.cost || 0,
        name: data.name,
        zone,
        owner
      });
    default:
      throw new Error(`Import of CardType "${data.type}" is not implemented yet.`);
  }
}
