import * as React from 'react';
import { StatelessComponent } from 'react';
import { Card, Statistic } from 'semantic-ui-react';
import { Player } from '../Player';
import { attackFace } from './characterReducer';

interface HeroOwnProps {
  attackFace: typeof attackFace;
  connectDropTarget: Function;
  isOver: boolean;
}

export type HeroProps = HeroOwnProps & Player;

const Hero: StatelessComponent<HeroProps> = ({
  connectDropTarget,
  isOver,
  name,
  health,
  mana,
  maximumMana,
}) =>
  connectDropTarget(
    <div>
      <Card centered color={isOver ? 'red' : undefined}>
        <Card.Content>
          <Card.Header>
            {name}
          </Card.Header>

          <Statistic.Group size="small" horizontal>
            <Statistic color="green" value={health} label="hp" />
            <Statistic
              color="blue"
              value={`${mana}/${maximumMana}`}
              label="mana"
            />
          </Statistic.Group>
        </Card.Content>
      </Card>
    </div>
  );

export default Hero;
