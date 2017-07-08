import * as React from 'react';
import { Card } from 'semantic-ui-react';

interface PlayerProps {
  name: string;
}

const Player = ({ name }: PlayerProps) => <Card centered >
  <Card.Content>
    <Card.Header className="center aligned">
      {name}
    </Card.Header>
  </Card.Content>
</Card>;

export default Player;
