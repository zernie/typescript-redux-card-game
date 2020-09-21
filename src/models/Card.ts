import _ from "lodash/fp";
import { Ability, Zone } from "./enums";
import { Weapon } from "./Weapon";
import { HeroPower } from "./HeroPower";
import { Character } from "./Character";
import { canSpendMana, Player } from "./Player";

// TODO: add Spell, Enchantment
export type Card = Character | Weapon | HeroPower;

// FIXME
// export const ownerCards = _.curry((playerID: number, cards: CardContainer) =>
//   _.pickBy((card: Card) => card.owner === playerID, cards)
// );
//
// export const playerHand = ownerCards(Controller.Player);
// export const opponentHand = ownerCards(Controller.Opponent);

export const hasAbility = _.curry(
  (ability: Ability, entity: Card): boolean =>
    entity.abilities.includes(ability)
);

export const hasTaunt = hasAbility(Ability.Taunt);
export const hasCharge = hasAbility(Ability.Charge);
export const hasWindfury = hasAbility(Ability.Windfury);

export const canPlayCard = (card: Card, player: Player) =>
  card.zone === Zone.Hand && canSpendMana(player, card.cost);
