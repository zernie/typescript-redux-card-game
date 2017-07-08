import * as React from 'react';
import { Card } from 'semantic-ui-react';

interface MinionProps {
  health: number,
  damage: number,
  name: string,
}

const MinionCard = ({ damage, health, name }: MinionProps) =>
  <Card centered>
    <Card.Content>
      <Card.Header className="center aligned">
        {name}
      </Card.Header>
    </Card.Content>
  </Card>;

export default MinionCard;
