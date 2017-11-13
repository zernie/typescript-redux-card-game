import * as React from 'react';
import { List, Segment } from 'semantic-ui-react';
import * as R from 'ramda';
import { Card, CardList } from '../../Card';
import DraggableCard from './DraggableCard';

interface HandProps {
  active: boolean;
  hand: CardList;
}

export const Hand: React.StatelessComponent<HandProps> = ({ active, hand }) => {
  return (
    <Segment disabled={!active} basic>
      <List relaxed selection divided horizontal size="large" >
        {R.map(
          (card: Card) => <DraggableCard key={card.id} card={card} />,
          R.values(hand)
        )}
      </List>
    </Segment>
  );
};
