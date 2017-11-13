import * as React from 'react';
import { Grid, Header, Segment, Statistic } from 'semantic-ui-react';
import { Hero } from '../../../Hero';
import { performAttack } from '../characterReducer';

interface HeroOwnProps {
  performAttack: typeof performAttack;
  connectDropTarget: Function;
  isOver: boolean;
}

export type HeroProps = Hero & HeroOwnProps;

const Hero: React.StatelessComponent<HeroProps> = ({
  armor,
  connectDropTarget,
  isOver,
  name,
  health,
  mana,
  maximumMana,
}) =>
  connectDropTarget(
    <div className="ui centered grid">
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
  );

export default Hero;
