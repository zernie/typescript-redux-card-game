import * as React from 'react';
import { Button } from 'semantic-ui-react';
import { StatelessComponent } from 'react';

const NextTurn: StatelessComponent<any> = ({onClick}) =>
  <Button fluid positive onClick={() => onClick()}>Finish</Button>;

export default NextTurn;
