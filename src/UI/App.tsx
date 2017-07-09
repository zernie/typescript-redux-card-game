import * as React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import BoardContainer from './BoardContainer';
import { StatelessComponent } from 'react';

const App: StatelessComponent<{}> = props =>
  <Grid container>
    <Grid.Row centered>
      <Header textAlign="center">
        Hearthstone-inspired card game written using React and Redux.
      </Header>
    </Grid.Row>

    <Grid.Row>
      <div className="column">
        <BoardContainer />
      </div>
    </Grid.Row>
  </Grid>;

export default App;
