import React from "react";
import { List, Segment, Transition } from "semantic-ui-react";
import _ from "lodash/fp";
import Minion from "./DnDMinion";
import { MinionContainer } from "../../../Board";
import { Minion as IMinion } from "../../../Minion";

export interface SideProps {
  board: MinionContainer;
}

const Side: React.FC<SideProps> = ({ board }) => (
  <div>
    <Transition.Group
      as={List}
      animation="pulse"
      duration={800}
      relaxed
      horizontal
      size="huge"
    >
      {_.map(
        (minion: IMinion) => (
          <List.Item key={minion.id}>
            <Minion character={minion} />
          </List.Item>
        ),
        board
      )}
    </Transition.Group>
  </Segment>
);

export default Side;
