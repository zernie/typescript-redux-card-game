import { useSelector } from "react-redux";
import {
  Game,
  getOpponent,
  getOpponentHero,
  getPlayer,
  getPlayerHero,
  isGameOver,
  minionsFromContainer,
  opponentCards,
  opponentMinions,
  playerCards,
  playerMinions
} from "../models";

export const useGame = () => useSelector((game: Game) => game);
export const useGameState = () => useSelector((game: Game) => game.state);
// export const useActiveHand = () => useSelector(state => state.hand) as EntityContainer;

export const useIsPlayerActive = () =>
  useSelector((game: Game) => game.state.activePlayer === game.state.playerID);
export const useIsOpponentActive = () =>
  useSelector(
    (game: Game) => game.state.activePlayer === game.state.opponentID
  );

export const usePlayer = () => useSelector((game: Game) => getPlayer(game));
export const useOpponent = () => useSelector((game: Game) => getOpponent(game));

export const usePlayerHero = () =>
  useSelector((game: Game) => getPlayerHero(game));
export const useOpponentHero = () =>
  useSelector((game: Game) => getOpponentHero(game));

export const usePlayMinions = () =>
  useSelector((game: Game) => minionsFromContainer(game.play));
export const usePlayerMinions = () =>
  useSelector((game: Game) => playerMinions(game));
export const useOpponentMinions = () =>
  useSelector((game: Game) => opponentMinions(game));

export const usePlayerCards = () =>
  useSelector((game: Game) => playerCards(game));
export const useOpponentCards = () =>
  useSelector((game: Game) => opponentCards(game));

export const useIsGameOver = () =>
  useSelector((game: Game) => isGameOver(game.state));
