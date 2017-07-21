import Card from './Card';

export type Hand = Readonly<
  {
    player: Card[];
    opponent: Card[];
  }
>;
