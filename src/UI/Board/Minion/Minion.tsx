import * as React from 'react';
import { StatelessComponent } from 'react';
import { List } from 'semantic-ui-react';
import { Minion } from '../../../Minion';
import { State } from '../../../Game';
import { performAttack } from '../characterReducer';

interface MinionOwnProps {
  connectDragSource: Function;
  connectDropTarget: Function;
  isOver: boolean;
  isDragging: boolean;
  performAttack: typeof performAttack;
  state: State;
}

export type MinionProps = Minion & MinionOwnProps;

const ZZZ: StatelessComponent<{}> = () => (
  <span>
    z<sup>
      z<sup>z</sup>
    </sup>
  </span>
);

const Minion: StatelessComponent<MinionProps> = ({
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
      <div className={`item ${exhausted ? 'disabled' : undefined}`}>
        {exhausted ? <ZZZ /> : undefined}
        <List.Header>{name}</List.Header>
        <List.Content>
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

export default Minion;
