import React from "react";
import { List, Transition } from "semantic-ui-react";
import _ from "lodash/fp";
import DnDMinion from "./DnDMinion";
import { MinionContainer, Minion } from "../../types";

export interface SideProps {
  board: MinionContainer;
}

const Side: React.FC<SideProps> = ({ board }) => (
  <div style={{ minHeight: 120 }}>
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
  </div>
);

export default Side;
