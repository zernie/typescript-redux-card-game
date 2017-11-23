import * as React from 'react';
import { Label, List, Segment, Transition } from 'semantic-ui-react';
import { Minion } from '../../../Minion';
import { State } from '../../../Game';
import { performAttack } from '../characterReducer';
import CardArt from '../../CardArt';

interface MinionOwnProps {
  connectDragSource: Function;
  connectDropTarget: Function;
  isOver: boolean;
  isDragging: boolean;
  performAttack: typeof performAttack;
  state: State;
}

export type MinionProps = Minion & MinionOwnProps;

const ZZZ: React.StatelessComponent<{}> = () => (
  <span>
    z<sup>
      z<sup>z</sup>
    </sup>
  </span>
);

const Minion: React.StatelessComponent<MinionProps> = ({
  abilities,
  attack,
  cardID,
  connectDragSource,
  connectDropTarget,
  exhausted,
  health,
  maxHealth,
  name,
}) =>
  connectDropTarget(
    connectDragSource(
      <div>
        <Segment compact size="tiny" basic vertical>
          <Transition visible={exhausted} animation="fade up" duration="800">
            <Label floating circular size="large" color="green">
              <ZZZ />
            </Label>
          </Transition>

          <CardArt alt={name} cardID={cardID} size="tiny" />

          <Label attached={'bottom left'} circular size="large">
            {attack}
          </Label>
          <Label
            attached={'bottom right'}
            color={health < maxHealth ? 'red' : undefined}
            circular
            size="large"
          >
            {health}
          </Label>
        </Segment>
        {/* TODO: extract component */}
        <List.List>
          {abilities.map((ability, i) => (
            <List.Item>
              <Label key={i} color={'black'} horizontal>
                {ability}
              </Label>
            </List.Item>
          ))}
        </List.List>
      </div>
    )
  );

export default Minion;
