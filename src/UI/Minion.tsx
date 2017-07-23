import * as React from 'react';
import { StatelessComponent } from 'react';
import { List } from 'semantic-ui-react';
import { Minion } from '../Minion';
import { PlayerKind } from '../Player';

export interface MinionProps {
  activePlayer: PlayerKind;
  connectDragSource: Function;
  isDragging: boolean;
  minion: Minion;
}

export const MinionCard: StatelessComponent<MinionProps> = ({
  connectDragSource,
  minion: { damage, health, id, name },
}) =>
  connectDragSource(
    <div className="item">
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
    </div>
  );
