import * as React from 'react';
import { Grid, Header, Segment, Statistic } from 'semantic-ui-react';
import { Hero } from '../../../Hero';
import { performAttack } from '../characterReducer';
import { State } from '../../../Game';

interface HeroOwnProps {
  performAttack: typeof performAttack;
  connectDragSource: Function;
  connectDropTarget: Function;
  isOver: boolean;
  state: State;
}

export type HeroProps = Hero & HeroOwnProps;

const Hero: React.StatelessComponent<HeroProps> = ({
  armor,
  connectDropTarget,
  connectDragSource,
  exhausted,
  isOver,
  name,
  health,
  mana,
  maximumMana,
  weapon,
}) =>
  connectDropTarget(
    connectDragSource(
      <div className="ui grid">
        <Grid.Column width={4} />
        <Grid.Column width={2} verticalAlign="middle">
          {!!weapon && (
            <Segment circular tertiary={exhausted}>
              <Statistic
                color="red"
                value={`${weapon.attack}/${weapon.durability}`}
                size="tiny"
              />
            </Segment>
          )}
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment raised={isOver} tertiary={isOver}>
            <Header>{name}</Header>

            <Statistic.Group size="tiny" widths={armor > 0 ? 3 : 2}>
              {armor > 0 && (
                <Statistic color="blue" value={armor} label="armor" />
              )}
              <Statistic color="green" value={health} label="hp" />

              <Statistic
                color="blue"
                value={`${mana}/${maximumMana}`}
                label="mana"
                size="tiny"
              />
            </Statistic.Group>
          </Segment>
        </Grid.Column>
      </div>
    )
  );

export default Hero;
