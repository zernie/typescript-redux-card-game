import * as React from 'react';
import { StatelessComponent } from 'react';
import { Image, Label, List, Segment } from 'semantic-ui-react';
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
  cardID,
  connectDragSource,
  connectDropTarget,
  exhausted,
  health,
  name,
}) =>
  connectDropTarget(
    connectDragSource(
      <div>
        <Segment compact size="tiny" disabled={exhausted} basic>
          {exhausted && (
            <Label basic floating circular size="large">
              <ZZZ />
            </Label>
          )}
          <br />

          <Image
            alt={name}
            shape="circular"
            src={`https://art.hearthstonejson.com/v1/256x/${cardID}.jpg`}
            size="tiny"
          />

          <Label attached={'bottom left'} color="red" circular size="large">
            {attack}
          </Label>
          <Label attached={'bottom right'} color="green" circular size="large">
            {health}
          </Label>
        </Segment>
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
      </div>
    )
  );

export default Minion;
