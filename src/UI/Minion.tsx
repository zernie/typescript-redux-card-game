import * as React from 'react';
import { List } from 'semantic-ui-react';
import MinionProps from '../Minion';

const MinionCard = ({ id, damage, health, name }: MinionProps) =>
      <List.Item>
        <List.Content>
          <List.Header>
            <List.Icon name="child" />
            {name}
          </List.Header>

          <List.Icon name="lightning" />
          {damage}
          <br/>
          <List.Icon name="heartbeat" />
          {health}
        </List.Content>

      </List.Item>;

export default MinionCard;
