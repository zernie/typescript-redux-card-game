import { craftOpponent, Game } from "../../models";
import _ from "lodash/fp";
import { craftOpponent, Game, importCard, Minion, Weapon } from "../../models";
import {
  EntityContainer,
  Player,
  CardContainer,
  Hero,
  CardClass,
  Step,
  Zone,
  makeEntityContainer,
  craftPlayer,
  craftHero
} from "../../models";
import { cards } from "../../cards";

// PLAYERS
const player: Player = craftPlayer({
  mana: 5,
  maximumMana: 5
});
const opponent: Player = craftOpponent();

// HEROES
const playerHero: Hero = importCard(
  cards["HERO_02"],
  Zone.Hand,
  player.id
) as Hero;
const opponentHero: Hero = importCard(
  cards["HERO_01"],
  Zone.Hand,
  opponent.id
) as Hero;

player.heroID = playerHero.id;
opponent.heroID = opponentHero.id;

// MINIONS
const handMinions = makeEntityContainer<Minion>([
  importCard(cards["CS2_173"], Zone.Hand, player.id) as Minion,
  importCard(cards["EX1_587"], Zone.Hand, player.id) as Minion,
  importCard(cards["CS2_200"], Zone.Hand, opponent.id) as Minion
]);

const minions = makeEntityContainer<Minion>([
  importCard(cards["CS2_189"], Zone.Play, opponent.id) as Minion,
  importCard(cards["CS2_121"], Zone.Play, player.id) as Minion,
  importCard(cards["CS2_147"], Zone.Play, opponent.id) as Minion
]);

// WEAPONS
const handWeapons = makeEntityContainer<Weapon>([
  importCard(cards["CS2_106"], Zone.Hand, opponent.id) as Weapon
]);

// CARDS
const hand: CardContainer = { ...handMinions, ...handWeapons };

const deck = makeEntityContainer<Minion>([
  importCard(cards["CS2_172"], Zone.Deck, player.id) as Minion,
  importCard(cards["CS2_141"], Zone.Deck, player.id) as Minion,
  importCard(cards["CS2_125"], Zone.Deck, player.id) as Minion,
  importCard(cards["CS2_182"], Zone.Deck, player.id) as Minion,

  importCard(cards["CS2_187"], Zone.Deck, opponent.id) as Minion,
  importCard(cards["CS2_121"], Zone.Deck, opponent.id) as Minion
]);

// TODO: refactor
export const play: EntityContainer = {
  ...makeEntityContainer([player, opponent, playerHero, opponentHero]),
  ...minions
};

const firstPlayerId = _.sample([player.id, opponent.id]) as number; // TODO: add a coin toss action

const initialState: Game = {
  deck,
  hand,
  play,
  graveyard: {},
  secret: {},
  setAside: {},
  state: {
    activePlayer: firstPlayerId,
    step: Step.BeginFirst,
    playerID: player.id,
    opponentID: opponent.id,
    playerHeroID: playerHero.id,
    opponentHeroID: opponentHero.id,
    turn: 1
  }
};

export default initialState;
