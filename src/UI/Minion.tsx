import * as React from 'react';
import { StatelessComponent } from 'react';
import { List } from 'semantic-ui-react';
import { Minion } from '../Minion';
import { State } from '../Game';
import { performAttack } from './characterReducer';

interface MinionOwnProps {
  connectDragSource: Function;
  connectDropTarget: Function;
  isOver: boolean;
  isDragging: boolean;
  performAttack: typeof performAttack;
  state: State;
}

export type MinionProps = Minion & MinionOwnProps;

const MinionCard: StatelessComponent<MinionProps> = ({
  abilities,
  attack,
  connectDragSource,
  connectDropTarget,
  exhausted,
  health,
  name,
}) =>
  connectDropTarget(
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
    )
  );

export default MinionCard;
