import * as React from 'react';
import { Segment } from 'semantic-ui-react';
import { map } from 'ramda';
import Minion from './Minion';
import MinionProps from '../Minion';
import { StatelessComponent } from 'react';

interface SideProps {
  minions: MinionProps[];
}

const Minions = map(Minion);

const Side: StatelessComponent<SideProps> = ({ minions, ...props }) =>
  <Segment {...props}>
    {Minions(minions)}
  </Segment>;

export default Side;
