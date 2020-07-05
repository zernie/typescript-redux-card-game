// import _ from "lodash/fp";
import { ThunkAction } from "redux-thunk";
import { Game } from "./Game";
import { Action } from "redux";
import { CardData, CardType, Controller, Zone } from "./enums";
import { craftMinion, Minion } from "./Minion";

let _lastId = 0;
export const newId = (): number => new Date().getTime() + _lastId++;

export type AppThunk = ThunkAction<void, Game, null, Action<string>>;

/** Import a card from hearthstonejson.com */
export const importCard = (
  data: CardData,
  zone: Zone,
  owner: Controller
) => {
  switch (data.type) {
    case CardType.Minion:
      return craftMinion({
        cardID: data.id,
        maxHealth: data.health || 0,
        abilities: data.mechanics || [],
        attack: data.attack || 0,
        cost: data.cost || 0,
        zone,
        name: data.name,
        owner
      }) as Minion;
    default:
      throw new Error(`CardType ${data.type} is not implemented.`);
  }
};
