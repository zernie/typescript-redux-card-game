import Mechanics from "./Mechanics";

interface Minion {
  id: number;
  health: number;
  damage: number;
  name: string;
  mechanics: Mechanics[];
}

export default Minion;
