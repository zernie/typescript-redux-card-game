import * as React from 'react';
import { StatelessComponent } from 'react';
import { List, Segment, Transition } from 'semantic-ui-react';
import * as R from 'ramda';
import DraggableMinion from './DraggableMinion';
import { Board, minionsFrom } from '../../../Board';
import { Minion } from '../../../Minion';

export interface SideProps {
  active: boolean;
  board: Board;
}

const Side: StatelessComponent<SideProps> = ({ active, board }) => (
  <Segment basic disabled={!active}>
    <Transition.Group
      as={List}
      animation="pulse"
      duration={800}
      relaxed
      horizontal
      size="huge"
    >
      {R.map(
        (minion: Minion) => (
          <List.Item key={minion.id}>
            <DraggableMinion {...minion} />
          </List.Item>
        ),
        R.values(minionsFrom(board))
      )}
    </Transition.Group>
  </Segment>
);

export default Side;
