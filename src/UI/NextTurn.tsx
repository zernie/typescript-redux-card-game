import * as React from 'react';
import { Button } from 'semantic-ui-react';
import { StatelessComponent } from 'react';

const NextTurn: StatelessComponent<any> = props =>
  <Button fluid color="green" {...props}>Finish</Button>;

export default NextTurn;
