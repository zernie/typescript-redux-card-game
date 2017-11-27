import * as R from 'ramda';
import { CardType, PlayerKind, Step, Zone } from './enums';
import { CardContainer } from './Card';
import { EntityContainer } from './Entity';
import { MinionContainer } from './Board';
import { CharacterContainer } from './Character';

export type State = Readonly<{
  activePlayer: PlayerKind;
  step: Step;
  playerID: number;
  opponentID: number;
  turn: number;
}>;

export type Game = Readonly<{
  entities: EntityContainer;
  cards: CardContainer;
  state: State;
}>;

export const getCharacters = (game: Game): CharacterContainer =>
  R.filter(
    R.propSatisfies(R.contains(R.__, [CardType.Minion, CardType.Hero]), 'type'),
    game.entities
  );

export const getHand = (game: Game): CardContainer =>
  R.pickBy(R.propEq('zone', Zone.Hand), game.cards);

export const getDeck = (game: Game): CardContainer =>
  R.pickBy(R.propEq('zone', Zone.Deck), game.cards);

export const getBoard = (game: Game): MinionContainer =>
  R.pickBy(R.propEq('type', CardType.Minion), game.entities);
