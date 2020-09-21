import React from "react";
import { List, Segment, Transition } from "semantic-ui-react";
import _ from "lodash/fp";
import { Card as ICard, CardContainer } from "../../models";
import DnDCard from "./DnDCard";

interface HandProps {
  active?: boolean;
  hand: CardContainer;
}

export const Hand: React.FC<HandProps> = ({ active = true, hand }) => (
  <Segment disabled={!active} basic>
    <Transition.Group as={List} animation="pulse" horizontal duration={800}>
      {_.map(
        (card: ICard) => (
          <List.Item key={card.id}>
            <List.Content>
              <DnDCard card={card} active={active} />
            </List.Content>
          </List.Item>
        ),
        hand
      )}
    </Transition.Group>
  </Segment>
);

export default Hand;
