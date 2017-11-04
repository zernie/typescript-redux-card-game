import * as React from 'react';
import { StatelessComponent } from 'react';
import { List, Segment } from 'semantic-ui-react';
import DraggableMinion from './DraggableMinion';
import { Board } from '../Board';

export interface SideProps {
  active: boolean;
  board: Board;
}

const Side: StatelessComponent<SideProps> = ({ active, board }) =>
  <Segment basic disabled={!active}>
    <List relaxed selection divided horizontal size="huge">
      {board.map(minion => <DraggableMinion key={minion.id} minion={minion} />)}
    </List>
  </Segment>;

export default Side;
