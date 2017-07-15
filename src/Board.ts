import Minion from './Minion';

type Board = Readonly<
  {
    player: Minion[];
    opponent: Minion[];
  }
>;

export default Board;
