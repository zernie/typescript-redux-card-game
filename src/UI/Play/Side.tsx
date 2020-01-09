import React from "react";
import { List, Segment, Transition } from "semantic-ui-react";
import _ from "lodash/fp";
import DnDMinion from "./DnDMinion";
import { Minion, MinionContainer } from "../../models";

export interface SideProps {
  active?: boolean;
  board: MinionContainer;
}

const Side: React.FC<SideProps> = ({ active, board }) => (
  <Segment basic style={{ minHeight: 120 }} disabled={!active}>
    <Transition.Group
      as={List}
      animation="pulse"
      duration={800}
      relaxed
      horizontal
      size="huge"
    >
      {_.map(
        (minion: Minion) => (
          <List.Item key={minion.id}>
            <DnDMinion character={minion} />
          </List.Item>
        ),
        board
      )}
    </Transition.Group>
  </Segment>
);

export default Side;
