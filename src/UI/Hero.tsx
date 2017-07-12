import * as React from 'react';
import { StatelessComponent } from 'react';
import { Card } from 'semantic-ui-react';
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
        <Card.Content className="center aligned">
          <Card.Header>
            {name}
          </Card.Header>

          <p>{health}hp</p>
          <p>{mana}/{totalMana} mana</p>
        </Card.Content>
      </Card>
    </div>
);

export default Hero;
