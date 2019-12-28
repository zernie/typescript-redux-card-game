import { CardClass, CardType, Controller, PlayState } from "./enums";
import { newId } from "./utils";
import { Game } from "./Game";
import { Container } from "./Container";

export interface Player {
  id: number;
  hero: number;
  mana: number;
  name: string;
  maximumMana: number;
  playState: PlayState;
  owner: Controller;
  type: CardType.Player;
}

// export type PlayerContainer = Container<Player>;

interface CraftPlayerProps {
  cardClass: CardClass;
  mana?: number;
  hero: number;
  maximumMana?: number;
  name: string;
  owner: Controller;
  weapon?: number | null;
}

export const craftPlayer = (props: CraftPlayerProps): Player =>
  ({
    id: newId(),
    mana: 0,
    maximumMana: 1,
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
  game.play[game.state.playerID] as Player;
export const getOpponent = (game: Game): Player =>
  game.play[game.state.opponentID] as Player;

export const hasLost = (player: Player) => player.playState === PlayState.Lost;
