import React from "react";
import { List, Segment, Transition } from "semantic-ui-react";
import _ from "lodash/fp";
import { Card as ICard, CardContainer } from "../../Card";
import Card from "./Card";

interface HandProps {
  active: boolean;
  hand: CardContainer;
}

export const Hand: React.FC<HandProps> = ({ active, hand }) => (
  <Segment disabled={!active} basic>
    <Transition.Group as={List} animation="pulse" horizontal duration={800}>
      {_.map(
        (card: ICard) => (
          <List.Item key={card.id}>
            <List.Content>
              <Card key={card.id} card={card} />
            </List.Content>
          </List.Item>
        ),
        _.values(hand)
      )}
    </Transition.Group>
  </Segment>
);

export default Hand;
