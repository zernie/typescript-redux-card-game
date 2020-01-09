import { useSelector } from "react-redux";
import { Game } from "../models/Game";

export const useGame = () => useSelector(state => state) as Game;
