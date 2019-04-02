import * as React from 'react';
import { Segment, Statistic } from 'semantic-ui-react';
import { CardContainer } from '../../Card';
import { size } from '../../utils';

export interface SideProps {
  deck: CardContainer;
}

const deckColor = (deck: CardContainer) => size(deck) > 0 ? 'blue' : 'red';

const Deck: React.FunctionComponent<SideProps> = ({ deck }) => (
  <Segment basic>
    <Statistic color={deckColor(deck)} value={size(deck)} label="Cards" />
  </Segment>
);

export default Deck;
