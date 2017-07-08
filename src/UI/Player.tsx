import * as React from 'react';
import { Card } from 'semantic-ui-react';

interface PlayerProps {
  name: string;
}

const Player = ({ name }: PlayerProps) => <Card centered header={name} />;

export default Player;
