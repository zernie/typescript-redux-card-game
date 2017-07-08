import Player from './Player';

type Game = {
    currentPlayer: Player;
    firstPlayer: Player;
    secondPlayer: Player;
    turn: number;
    finished: boolean;
};

export default Game;
