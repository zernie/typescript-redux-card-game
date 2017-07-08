import * as React from 'react';
import { List } from 'semantic-ui-react';
import MinionProps from '../Minion';

const MinionCard = ({ damage, health, name }: MinionProps) =>
  <List centered>
    <List.Item>
      <List.Icon name="child" />
      {name}
    </List.Item>
    <List.Item>
      <List.Icon name="lightning" />
      {damage}
    </List.Item>
    <List.Item>
      <List.Icon name="heartbeat" />
      {health}
    </List.Item>
  </List>;

export default MinionCard;
