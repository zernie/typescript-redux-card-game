import * as React from 'react';
import { List, Segment, Transition } from 'semantic-ui-react';
import _ from 'lodash/fp';
import { Card, CardContainer } from '../../Card';
import DraggableCard from './DraggableCard';

interface HandProps {
  active: boolean;
  hand: CardContainer;
}

export const Hand: React.FunctionComponent<HandProps> = ({ active, hand }) => {
  return (
    <Segment disabled={!active} basic>
      <Transition.Group as={List} animation="pulse" horizontal duration={800}>
        {_.map(
          (card: Card) => (
            <List.Item key={card.id}>
              <List.Content>
                <DraggableCard key={card.id} card={card} />
              </List.Content>
            </List.Item>
          ),
          _.values(hand)
        )}
      </Transition.Group>
    </Segment>
  );
};
