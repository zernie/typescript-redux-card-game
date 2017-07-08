import * as React from 'react';
import { List } from 'semantic-ui-react';
import Minion from './Minion';
import MinionProps from '../Minion';
import { StatelessComponent } from 'react';

interface SideProps {
  minions: MinionProps[];
}

const Side: StatelessComponent<SideProps> = ({ minions, ...props }) =>
  <List horizontal>
    {minions.map(minion => <Minion key={minion.id} {...minion} />)}
  </List>;

export default Side;
