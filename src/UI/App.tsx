import * as React from 'react';
import { StatelessComponent } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import BoardContainer from './BoardContainer';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

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

export default DragDropContext(HTML5Backend)(App);
