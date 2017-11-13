import * as React from 'react';
import { Segment, Statistic } from 'semantic-ui-react';
import { CardList } from '../../Card';
import { size } from '../../utils';

export interface SideProps {
  deck: CardList;
}

const deckColor = (deck: CardList) => size(deck) > 0 ? 'blue' : 'red';

const Deck: React.StatelessComponent<SideProps> = ({ deck }) => (
  <Segment basic>
    <Statistic color={deckColor(deck)} value={size(deck)} label="Cards" />
  </Segment>
);

export default Deck;
