import * as React from 'react';
import { StatelessComponent } from 'react';
import { Divider, Grid, Segment } from 'semantic-ui-react';
import TargetableHero from './TargetableHero';
import Side from './Side';
import Game from '../Game';
import NextTurn from './NextTurn';

type BoardProps = Game & {nextTurn: Function};

const Board: StatelessComponent<BoardProps> = ({ nextTurn, player, opponent }) =>
  <Segment>
    <Grid centered>
      <Grid.Column width={14}>
        <TargetableHero {...opponent} />

        <Side {...opponent} />
        <Divider section />
        <Side {...player} />

        <TargetableHero {...player} />
      </Grid.Column>

      <Grid.Column width={2} verticalAlign="middle">
        <NextTurn onClick={nextTurn}/>
      </Grid.Column>
    </Grid>
  </Segment>;

export default Board;
