import * as React from 'react';
import { Container, Header } from 'semantic-ui-react'

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Container>
          <Header textAlign="center">
            React/Redux Hearthstone-inspired card game.
          </Header>
      </Container>
    );
  }
}

export default App;
