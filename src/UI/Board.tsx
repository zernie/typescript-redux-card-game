import * as React from 'react';
import { Divider, Grid, Segment } from 'semantic-ui-react';
import Hero from './Hero';
import Side from './Side';
import { StatelessComponent } from 'react';
import Game from '../Game';
import NextTurn from './NextTurn';

const Board: StatelessComponent<Game> = ({ player, opponent }) =>
  <Segment className="grid">
    <Grid.Row>
      <Grid.Column width={14}>
        <Hero {...opponent} />

        <Side {...opponent} />
        <Divider section />
        <Side {...player} />

        <Hero {...player} />
      </Grid.Column>

      <Grid.Column width={2} verticalAlign="middle">
        <NextTurn />
      </Grid.Column>
    </Grid.Row>
  </Segment>;

export default Board;
