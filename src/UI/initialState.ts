import * as R from 'ramda';
import { Game } from '../Game';
import { craftPlayer, Hero } from '../Hero';
import {
  CardList,
  cardListFrom,
  craftMinionCard,
  craftWeaponCard,
} from '../Card';
import { Board, boardFrom } from '../Board';
import { craftMinion } from '../Minion';
import { Ability } from '../Abilities';
import { Character } from '../Character';
import { GameState, PlayerKind } from '../enums';

const rawDeck = [
  {
    attack: 3,
    cost: 2,
    maxHealth: 2,
    name: 'Bloodfen Raptor',
    owner: PlayerKind.Player,
    texture: 'CS2_172',
  },
  {
    attack: 5,
    cost: 5,
    maxHealth: 4,
    name: 'Booty Bay Bodyguard',
    owner: PlayerKind.Opponent,
    texture: 'CS2_187',
  },
  {
    attack: 3,
    cost: 4,
    maxHealth: 4,
    name: 'Chillwind Yeti',
    owner: PlayerKind.Player,
    texture: 'CS2_182',
  },
  {
    attack: 2,
    cost: 2,
    maxHealth: 2,
    name: 'Frostwolf Grunt',
    owner: PlayerKind.Opponent,
    texture: 'CS2_121',
  },
  {
    attack: 2,
    cost: 3,
    maxHealth: 2,
    name: 'Ironforge Rifleman',
    owner: PlayerKind.Player,
    texture: 'CS2_141',
  },
  {
    attack: 3,
    cost: 3,
    maxHealth: 3,
    name: 'Ironfur Grizzly',
    owner: PlayerKind.Player,
    texture: 'CS2_125',
  },
];

export const deck: CardList = cardListFrom(R.map(craftMinionCard, rawDeck));

const handMinions = R.map(craftMinionCard, [
  {
    abilities: [Ability.Charge],
    attack: 1,
    cost: 2,
    maxHealth: 2,
    name: 'Bluegill Warrior',
    owner: PlayerKind.Player,
    texture: 'CS2_173',
  },
  {
    abilities: [Ability.Windfury],
    attack: 3,
    cost: 4,
    maxHealth: 4,
    name: 'Windspeaker',
    owner: PlayerKind.Player,
    texture: 'EX1_587',
  },
  {
    attack: 6,
    cost: 6,
    maxHealth: 7,
    name: 'Boulderfist Ogre',
    owner: PlayerKind.Opponent,
    texture: 'CS2_200',
  },
]);

export const handWeapons = R.map(craftWeaponCard, [
  {
    attack: 3,
    cost: 3,
    durability: 3,
    name: 'Fiery War Axe',
    owner: PlayerKind.Opponent,
  },
]);

export const hand: CardList = cardListFrom([...handMinions, ...handWeapons]);

export const player: Hero = craftPlayer({
  name: 'Mage',
  owner: PlayerKind.Player,
  maximumMana: 4,
});

export const opponent: Hero = craftPlayer({
  armor: 3,
  name: 'Warrior',
  owner: PlayerKind.Opponent,
  maximumMana: 4,
});

const minions = R.map(craftMinion, [
  {
    attack: 1,
    exhausted: false,
    maxHealth: 1,
    name: 'Elven archer',
    owner: PlayerKind.Opponent,
    texture: 'CS2_189',
  },
  {
    attack: 2,
    exhausted: false,
    maxHealth: 2,
    name: 'Frostwolf Grunt',
    owner: PlayerKind.Opponent,
    texture: 'CS2_121',
  },
  {
    attack: 2,
    exhausted: false,
    maxHealth: 4,
    name: 'Gnomish Inventor',
    owner: PlayerKind.Player,
    texture: 'CS2_147',
  },
]);

const characters: Array<Character> = [player, opponent, ...minions];

export const board: Board = boardFrom(characters);

const initialState: Game = {
  board,
  deck,
  hand,
  state: {
    activePlayer: PlayerKind.Player,
    gameState: GameState.Playing,
    playerID: player.id,
    opponentID: opponent.id,
    turn: 1,
  },
};

export default initialState;
