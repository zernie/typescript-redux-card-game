import Card from './Card';

type Deck = Readonly<
  {
    player: Card[];
    opponent: Card[];
  }
>;

export default Deck;
