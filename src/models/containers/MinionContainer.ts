import _ from "lodash/fp";
import {
  CharacterContainer,
  EntityContainer,
  makeEntityContainer
} from "./index";
import { CardType, Controller } from "../enums";
import { Game } from "../Game";
import { craftMinion, CraftMinionProps, Minion } from "../Minion";
import { hasTaunt } from "../Card";
import { Character } from "../Character";
import { Container } from "../Container";

export type MinionContainer = Container<Minion>;

export const ownerMinions = _.curry(
  (controller: Controller, container: EntityContainer) =>
    _.pickBy(
      _.whereEq({ owner: controller, type: CardType.Minion }),
      container
    ) as MinionContainer
);
export const playerMinions = (game: Game) =>
  ownerMinions(game.state.playerID, game.play);
export const opponentMinions = (game: Game) =>
  ownerMinions(game.state.opponentID, game.play);

export const craftMinions = (...props: CraftMinionProps[]) =>
  _.map(craftMinion, props) as Minion[];
export const craftMinionContainer = (...props: CraftMinionProps[]) =>
  makeEntityContainer(craftMinions(...props)) as MinionContainer;

export const minionsFromContainer = (entities: EntityContainer) =>
  _.pickBy(_.whereEq({ type: CardType.Minion }), entities) as MinionContainer;

export const anyTaunts = (minions: CharacterContainer) =>
  _.any(hasTaunt, minions);

export const isValidTarget = (
  target: Character,
  characters: CharacterContainer
) => (anyTaunts(characters) ? hasTaunt(target) : true);
