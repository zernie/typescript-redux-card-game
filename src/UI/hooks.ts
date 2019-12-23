import { useSelector } from "react-redux";
import { Game } from "../Game";

export const useGame = () => useSelector(state => state) as Game;
