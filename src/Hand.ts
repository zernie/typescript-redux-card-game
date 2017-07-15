import Card from './Card';

type Hand = Readonly<
  {
    player: Card[];
    opponent: Card[];
  }
>;

export default Hand;
