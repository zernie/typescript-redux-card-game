import _ from "lodash/fp";
import { Ability, Controller, Zone } from "./enums";
import { Weapon } from "./Weapon";
import { HeroPower } from "./HeroPower";
import { Character } from "./Character";
import { CardContainer } from "./Container";
import { Game } from "./Game";
import { canSpendMana, Player } from "./Player";

// TODO: add Spell, Enchantment
export type Card = Character | Weapon | HeroPower;

// FIXME
// export const selectCards = _.curry((playerID: number, cards: CardContainer) =>
//   _.pickBy((card: Card) => card.owner === playerID, cards)
// );
//
// export const playerHand = selectCards(Controller.Player);
// export const opponentHand = selectCards(Controller.Opponent);

export const selectCards = _.curry(
  (player: Controller, cards: CardContainer) =>
    _.pickBy((card: Card) => card.owner === player, cards) as CardContainer
);

export const playerHand = (game: Game) =>
  selectCards(game.state.playerID, game.hand);
export const opponentHand = (game: Game) =>
  selectCards(game.state.opponentID, game.hand);

export const playerDeck = (game: Game) =>
  selectCards(game.state.playerID, game.deck);
export const opponentDeck = (game: Game) =>
  selectCards(game.state.opponentID, game.deck);

export const cardListFrom = (array: Card[]) =>
  _.indexBy<Card>(_.prop("id"), array) as CardContainer;

export const hasAbility = (ability: Ability) => (entity: Card): boolean =>
  _.contains(ability, entity.abilities) as boolean;

export const hasTaunt = hasAbility(Ability.Taunt);
export const hasCharge = hasAbility(Ability.Charge);
export const hasWindfury = hasAbility(Ability.Windfury);

export const canUseCard = (card: Card, player: Player) =>
  card.zone === Zone.Hand && canSpendMana(player, card.cost);
