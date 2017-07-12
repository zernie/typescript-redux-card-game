import * as React from 'react';
import { StatelessComponent } from 'react';
import { List } from 'semantic-ui-react';
import Minion from '../Minion';

interface MinionCardOwnProps {
  isDragging: boolean;
  connectDragSource: Function;
}

export type MinionCardProps = Minion & MinionCardOwnProps;

const MinionCard: StatelessComponent<MinionCardProps> = ({
  id,
  damage,
  health,
  name,
  connectDragSource,
}) =>
  connectDragSource(
    <div>
      <List.Item>
        <List.Content>
          <List.Header>
            <List.Icon name="child" />
            {name}
          </List.Header>

          <List.Icon name="lightning" />
          {damage}
          <br />
          <List.Icon name="heartbeat" />
          {health}
        </List.Content>

      </List.Item>
    </div>
  );

export default MinionCard;
