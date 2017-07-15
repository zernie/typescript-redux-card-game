import * as React from 'react';
import { StatelessComponent } from 'react';
import { List, Segment } from 'semantic-ui-react';
import DraggableMinion from './DraggableMinion';
import Player from '../Player';
import Minion from '../Minion';

interface SideOwnProps {
  active: boolean;
  board: Minion[];
}

type SideProps = Player & SideOwnProps;

const Side: StatelessComponent<SideProps> = ({ active, board, ...props }) =>
  <Segment basic disabled={!active}>
    <List relaxed selection divided horizontal size="huge">
      {board.map(minion => <DraggableMinion key={minion.id} {...minion} />)}
    </List>
  </Segment>;

export default Side;
