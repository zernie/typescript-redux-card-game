import { useSelector } from "react-redux";
import { Game } from "../types/Game";

export const useGame = () => useSelector(state => state) as Game;
