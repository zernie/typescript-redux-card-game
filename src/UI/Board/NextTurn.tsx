import * as React from 'react';
import { StatelessComponent } from 'react';
import { Button } from 'semantic-ui-react';

interface NextTurnProps {
  onClick: Function;
}

const NextTurn: StatelessComponent<NextTurnProps> = ({ onClick }) => (
  <Button fluid positive onClick={() => onClick()}>
    Finish
  </Button>
);

export default NextTurn;
