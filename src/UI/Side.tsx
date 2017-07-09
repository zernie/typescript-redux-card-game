import * as React from 'react';
import { StatelessComponent } from 'react';
import { List, Segment } from 'semantic-ui-react';
import Minion from './Minion';
import Player from '../Player';

const Side: StatelessComponent<Player> = ({ minions, ...props }) =>
  <Segment basic>
    <List relaxed selection divided horizontal size="big">
      {minions.map(minion => <Minion key={minion.id} {...minion} />)}
    </List>
  </Segment>;

export default Side;
