import { CardClass, CardType, Controller, PlayState } from "./enums";
import { newId } from "./utils";
import { Game } from "./Game";

export interface Player {
  cardClass: CardClass;
  id: number;
  hero: number;
  mana: number;
  maximumMana: number;
  playState: PlayState;
  owner: Controller;
  weapon: number | null;
  type: CardType.Player;
}

interface CraftPlayerProps {
  cardClass: CardClass;
  mana?: number;
  hero: number;
  maximumMana?: number;
  owner: Controller;
  weapon?: number | null;
}

export const craftPlayer = (props: CraftPlayerProps): Player =>
  ({
    id: newId(),
    mana: 0,
    maximumMana: 10,
    playState: PlayState.Playing,
    weapon: null,
    ...props,
    type: CardType.Player
  } as Player);

export const canSpendMana = (player: Player, amount: number) =>
  player.mana - amount >= 0;

export const other = (player: Controller): Controller =>
  player === Controller.Player ? Controller.Opponent : Controller.Player;

export const getPlayer = (game: Game): Player =>
  game.entities[game.state.playerID] as Player;
export const getOpponent = (game: Game): Player =>
  game.entities[game.state.opponentID] as Player;
