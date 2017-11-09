import * as React from 'react';
import { StatelessComponent } from 'react';
import { List } from 'semantic-ui-react';
import { Minion } from '../Minion';
import { State } from '../Game';

export interface MinionProps {
  state: State;
  connectDragSource: Function;
  isDragging: boolean;
  minion: Minion;
}

export const MinionCard: StatelessComponent<MinionProps> = ({
  connectDragSource,
  minion: { abilities, attack, exhausted, health, name },
}) =>
  connectDragSource(
    <div className="item">
      {exhausted ? 'Exhausted' : undefined}
      <List.Content>
        <List.Header>
          <List.Icon name="child" />
          {name}
        </List.Header>

        <List.Icon name="lightning" />
        {attack}
        <br />
        <List.Icon name="heartbeat" />
        {health}
        <br />

        {abilities.map((ability, i) => <div key={i}>{ability}</div>)}
      </List.Content>
    </div>
  );
