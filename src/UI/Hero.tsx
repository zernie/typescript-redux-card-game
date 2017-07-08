import * as React from 'react';
import { Card } from 'semantic-ui-react';
import PlayerProps from '../Player';
import { StatelessComponent } from 'react';

const Hero: StatelessComponent<PlayerProps> = ({ name, health, mana }) =>
  <Card centered>
    <Card.Content>
      <Card.Header className="center aligned">
        {name}
        <p>{health}hp</p>
      </Card.Header>
    </Card.Content>
  </Card>;

export default Hero;
