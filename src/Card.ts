export enum CardType {
  Enchantment,
  Minion,
  Spell,
  Weapon,
}

export type Card = Readonly<
  {
    cost: number;
    damage: number;
    desc?: string;
    health: number;
    name: string;
    type: CardType;
  }
>;
