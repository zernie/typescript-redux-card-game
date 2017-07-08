import * as React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import Board from './Board';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Grid container>
        <Grid.Column>
          <Header textAlign="center">
            Hearthstone-inspired card game written using React and Redux.
          </Header>

          <Board />
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
