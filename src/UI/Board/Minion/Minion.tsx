import * as React from 'react';
import { StatelessComponent } from 'react';
import { Header, List, Segment, Label } from 'semantic-ui-react';
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
      <div className={'item'}>
        <List disabled={exhausted} size="tiny">
          <List.Content>
            <Segment circular size="small" disabled={exhausted}>
              {exhausted && (
                <Label basic floating circular size="large">
                  <ZZZ />
                </Label>
              )}
              <Header size="small">{name}</Header>
              <br />

              {/* TODO: extract component */}
              <List>
                {abilities.map((ability, i) => (
                  <List.Item>
                    <Label key={i} color={'black'} horizontal>
                      {ability}
                    </Label>
                  </List.Item>
                ))}
              </List>

              <Label attached={'bottom left'} color="red" circular size="large">
                {attack}
              </Label>
              <Label
                attached={'bottom right'}
                color="green"
                circular
                size="large"
              >
                {health}
              </Label>
            </Segment>
          </List.Content>
        </List>
      </div>
    )
  );

export default Minion;
