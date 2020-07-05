import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import {
  Container,
  Grid,
  Header,
  GridRow,
  GridColumn
} from "semantic-ui-react";
import TargetableBattlefield from "./Play/Battlefield";
import Toastr from "toastr";
import "toastr/build/toastr.css";
import { isTouchDevice } from "./utils";

Toastr.options.timeOut = 3000;

const DnDBackend = isTouchDevice() ? TouchBackend : HTML5Backend;

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
              Hearthstone simulator written using React & Redux.
            </Header.Content>
          </Header>

          <DndProvider backend={DnDBackend}>
            <TargetableBattlefield />
          </DndProvider>
        </Container>
      </GridColumn>
    </GridRow>
  </Grid>
);

export default App;
