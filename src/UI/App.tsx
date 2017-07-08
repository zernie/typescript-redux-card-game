import * as React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import BoardContainer from './BoardContainer';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Grid container>
        <Grid.Column>
          <Header textAlign="center">
            Hearthstone-inspired card game written using React and Redux.
          </Header>

          <BoardContainer/>
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
