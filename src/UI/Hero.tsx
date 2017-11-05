import * as React from 'react';
import { Header , Segment, Grid, Statistic } from 'semantic-ui-react';
import { Player } from '../Player';
import { attackFace } from './characterReducer';

interface HeroOwnProps {
  attackFace: typeof attackFace;
  connectDropTarget: Function;
  isOver: boolean;
}

export type HeroProps = HeroOwnProps & Player;

const Hero: React.StatelessComponent<HeroProps> = ({
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
        <Segment raised={isOver} tertiary={isOver} >
            <Header>
              {name}
            </Header>

            <Statistic.Group size="small" horizontal>
              <Statistic color="green" value={health} label="hp" />
              <Statistic
                color="blue"
                value={`${mana}/${maximumMana}`}
                label="mana"
              />
            </Statistic.Group>
        </Segment>
      </Grid.Column>
    </div>
  );

export default Hero;
