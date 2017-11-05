import * as React from 'react';
import { List, Segment } from 'semantic-ui-react';
import { CardList } from '../Card';
import DraggableCard from './DraggableCard';

interface HandProps {
  active: boolean;
  hand: CardList;
}

export const Hand: React.StatelessComponent<HandProps> = ({ active, hand }) =>
  <Segment disabled={!active} basic>
    <List relaxed selection divided horizontal size="huge">
      {hand.map((card, i) => <DraggableCard key={i} card={card} />)}
    </List>
  </Segment>;
