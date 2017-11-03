export enum CardType {
  Enchantment,
  Minion,
  Spell,
  Weapon,
}

export type Card = Readonly<
  {
    cost: number;
    desc?: string;
    name: string;
    type: CardType;
  }
>;
