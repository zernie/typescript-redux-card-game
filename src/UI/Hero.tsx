import * as React from 'react';
import { Card } from 'semantic-ui-react';
import PlayerProps from '../Player';
import { StatelessComponent } from 'react';

const Hero: StatelessComponent<PlayerProps> = ({
  name,
  health,
  mana,
  totalMana,
}) =>
  <Card centered>
    <Card.Content className="center aligned">
      <Card.Header>
        {name}
      </Card.Header>

      <p>{health}hp</p>
      <p>{mana}/{totalMana} mana</p>
    </Card.Content>
  </Card>;

export default Hero;
