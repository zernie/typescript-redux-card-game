import * as React from "react";
import { createDndContext } from "react-dnd/lib/common/DndContext";
import HTML5Backend from "react-dnd-html5-backend";
import { Container, Header } from "semantic-ui-react";
import TargetableBattlefield from "./TargetableBattlefield";

const App: React.FunctionComponent<{}> = props => (
  <Container textAlign="center">
    <Header as="h1">
      <Header.Content>
        Hearthstone-like card game written using React and Redux.
      </Header.Content>
    </Header>

    <TargetableBattlefield />
  </Container>
);

export default createDndContext(HTML5Backend)(App);
