export enum CardType {
  Enchantment,
  Minion,
  Spell,
  Weapon,
}

type Card = Readonly<
  {
    cost: number;
    name: string;
    desc?: string;
    health: number;
    damage: number;
    type: CardType;
  }
>;

export default Card;
