export enum CardType {
  Enchantment,
  Minion,
  Spell,
  Weapon,
}

interface Card {
  cost: number;
  name: string;
  desc?: string;
  health: number;
  damage: number;
  type: CardType;
}

export default Card;
