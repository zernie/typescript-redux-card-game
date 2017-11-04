import * as React from 'react';
import { List, Segment } from 'semantic-ui-react';
import { Hand as HandInterface } from '../Hand';
import DraggableCard from './DraggableCard';

interface HandProps {
  hand: HandInterface;
}

export const Hand: React.StatelessComponent<HandProps> = ({ hand }) =>
  <Segment basic>
    <List relaxed selection divided horizontal size="huge">
      {hand.map((card, i) => <DraggableCard key={i} card={card} />)}
    </List>
  </Segment>;
