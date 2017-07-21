import Mechanics from './Mechanics';
import { PlayerKind } from './Player';

type Minion = Readonly<
  {
    owner: PlayerKind;
    id: number;
    health: number;
    damage: number;
    name: string;
    mechanics: Mechanics[];
  }
>;

export default Minion;
