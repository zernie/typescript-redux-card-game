import { useSelector } from "react-redux";
import {
  Controller,
  Game,
  getOpponent,
  getOpponentHero,
  getPlayer,
  getPlayerHero,
  isGameOver,
  minionsFromContainer,
  opponentDeck,
  opponentHand,
  opponentMinions,
  ownerMinions,
  playerDeck,
  playerHand,
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
export const useOwnerMinions = (owner: Controller) =>
  useSelector((game: Game) => ownerMinions(owner, game.play));

export const usePlayerHand = () =>
  useSelector((game: Game) => playerHand(game));
export const useOpponentHand = () =>
  useSelector((game: Game) => opponentHand(game));

export const usePlayerDeck = () =>
  useSelector((game: Game) => playerDeck(game));
export const useOpponentDeck = () =>
  useSelector((game: Game) => opponentDeck(game));

export const useIsGameOver = () =>
  useSelector((game: Game) => isGameOver(game.state));
