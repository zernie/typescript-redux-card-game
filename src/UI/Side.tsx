import * as React from 'react';
import { StatelessComponent } from 'react';
import { List, Segment } from 'semantic-ui-react';
import * as R from 'ramda';
import DraggableMinion from './DraggableMinion';
import { Board } from '../Board';
import { Minion } from '../Minion';

export interface SideProps {
  active: boolean;
  board: Board;
}

const Side: StatelessComponent<SideProps> = ({ active, board }) => (
  <Segment basic disabled={!active}>
    <List relaxed selection horizontal size="huge">
      {R.map(
        (minion: Minion) => <DraggableMinion key={minion.id} minion={minion} />,
        R.values(board)
      )}
    </List>
  </Segment>
);

export default Side;
