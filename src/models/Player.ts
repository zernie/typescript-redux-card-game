import { CardType, Controller, PlayState, Zone } from "./enums";
import { Game, State } from "./Game";

export interface Player {
  id: number;
  fatigue: number;
  heroID: number | null;
  mana: number;
  name: string;
  maximumMana: number;
  playState: PlayState;
  type: CardType.Player;
  zone: Zone;
}

interface CraftPlayerProps {
  name?: string;
  mana?: number;
  heroID?: number;
  maximumMana?: number;
  zone?: Zone;
}

export const craftPlayer = (props: CraftPlayerProps = {}): Player =>
  ({
    id: 0,
    fatigue: 0,
    mana: 0,
    maximumMana: 0,
    name: "Player",
    playState: PlayState.Playing,
    zone: Zone.Play,
    ...props,
    type: CardType.Player
  } as Player);

export const craftOpponent = (props: CraftPlayerProps = {}): Player =>
  ({
    id: 1,
    fatigue: 0,
    mana: 0,
    name: "Opponent",
    maximumMana: 0,
    playState: PlayState.Playing,
    zone: Zone.Play,
    ...props,
    type: CardType.Player
  } as Player);

export const canSpendMana = (player: Player, amount: number) =>
  player.mana - amount >= 0;

export const otherId = (state: State): Controller =>
  state.activePlayer === state.playerID ? state.opponentID : state.playerID;
// export const other = (playerID: Controller): Controller =>
//   playerID === Controller.Player ? Controller.Opponent : Controller.Player;

export const getActivePlayer = (game: Game) =>
  game.play[game.state.activePlayer] as Player;

export const getPlayer = (game: Game) =>
  game.play[game.state.playerID] as Player;

export const getOpponent = (game: Game) =>
  game.play[game.state.opponentID] as Player;

export const hasLost = (player: Player) => player.playState === PlayState.Lost;
export const hasWon = (player: Player) => player.playState === PlayState.Won;
