import * as React from 'react';
import { StatelessComponent } from 'react';
import { List, Segment } from 'semantic-ui-react';
import DraggableMinion from './DraggableMinion';
import Player from '../Player';

const Side: StatelessComponent<Player> = ({ board, ...props }) =>
  <Segment basic>
    <List relaxed selection divided horizontal size="huge">
      {board.map(minion => <DraggableMinion key={minion.id} {...minion} />)}
    </List>
  </Segment>;

export default Side;
