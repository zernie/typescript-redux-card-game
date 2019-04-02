import * as React from 'react';
import { List, Segment, Transition } from 'semantic-ui-react';
import _ from 'lodash/fp';
import DraggableMinion from './DraggableMinion';
import { MinionContainer } from '../../../Board';
import { Minion } from '../../../Minion';

export interface SideProps {
  board: MinionContainer;
}

const Side: React.FunctionComponent<SideProps> = ({ board }) => (
  <Segment basic>
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
            <DraggableMinion character={minion} />
          </List.Item>
        ),
        _.values(board)
      )}
    </Transition.Group>
  </Segment>
);

export default Side;
