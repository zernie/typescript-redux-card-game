import * as React from 'react';
import { StatelessComponent } from 'react';
import { Card, Statistic } from 'semantic-ui-react';
import Player from '../Player';

interface HeroOwnProps {
  connectDropTarget: Function;
}

export type HeroProps = HeroOwnProps & Player;

const Hero: StatelessComponent<HeroProps> = ({
  connectDropTarget,
  name,
  health,
  mana,
  totalMana,
}) =>
  connectDropTarget(
    <div>
      <Card centered>
        <Card.Content>
          <Card.Header>
            {name}
          </Card.Header>

          <Statistic.Group size="small" horizontal>
            <Statistic color="green" value={health} label="hp" />
            <Statistic
              color="blue"
              value={`${mana}/${totalMana}`}
              label="mana"
            />
          </Statistic.Group>
        </Card.Content>
      </Card>
    </div>
  );

export default Hero;
