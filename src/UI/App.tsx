import * as React from 'react';
import { Container, Header } from 'semantic-ui-react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import TargetableBattlefield from './TargetableBattlefield';

const App: React.StatelessComponent<{}> = props =>
  <Container textAlign="center">
    <Header as="h1">
      <Header.Content>
        Hearthstone-inspired card game written using React and Redux.
      </Header.Content>
    </Header>

    <TargetableBattlefield />
  </Container>;

export default DragDropContext(HTML5Backend)(App);
