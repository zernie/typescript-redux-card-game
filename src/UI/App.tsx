import React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import {
  Container,
  Grid,
  Header,
  GridRow,
  GridColumn
} from "semantic-ui-react";
import TargetableBattlefield from "./Play/Battlefield";

const App: React.FC = props => (
  <Grid>
    <GridRow>
      <GridColumn>
        <Container textAlign="center">
          <Header as="h1" attached={true}>
            <Header.Content
              as={"a"}
              href={"https://github.com/zernie/typescript-redux-card-game"}
              target="_blank"
            >
              Hearthstone clone written using React and Redux.
            </Header.Content>
          </Header>

          <DndProvider backend={HTML5Backend}>
            <TargetableBattlefield />
          </DndProvider>
        </Container>
      </GridColumn>
    </GridRow>
  </Grid>
);

export default App;
