import React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { Container, Header } from "semantic-ui-react";
import TargetableBattlefield from "./Battlefield";

const App: React.FC = props => (
  <Container textAlign="center">
    <Header as="h1">
      <Header.Content>
        Hearthstone-like card game written using React and Redux.
      </Header.Content>
    </Header>

    <DndProvider backend={HTML5Backend}>
      <TargetableBattlefield />
    </DndProvider>
  </Container>
);

export default App;
