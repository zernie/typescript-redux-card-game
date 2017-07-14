import Mechanics from './Mechanics';

type Minion = Readonly<
  {
    id: number;
    health: number;
    damage: number;
    name: string;
    mechanics: Mechanics[];
  }
>;

export default Minion;
