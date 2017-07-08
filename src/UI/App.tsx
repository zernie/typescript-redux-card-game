import * as React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import BoardContainer from './BoardContainer';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Grid container>
        <Grid.Row centered>
          <Header textAlign="center">
            Hearthstone-inspired card game written using React and Redux.
          </Header>
        </Grid.Row>

        <Grid.Row >
          <BoardContainer/>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
