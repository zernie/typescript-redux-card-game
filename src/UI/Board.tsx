import * as React from 'react';
import { StatelessComponent } from 'react';
import { Divider, Label, Grid, Segment } from 'semantic-ui-react';
import TargetableHero from './TargetableHero';
import Side from './Side';
import Game from '../Game';
import NextTurn from './NextTurn';
import { ActivePlayer } from '../Player';

export type BoardProps = Game & { nextTurn: Function };

const Board: StatelessComponent<BoardProps> = ({
  activePlayer,
  board,
  nextTurn,
  player,
  opponent,
  turn,
}) =>
  <Segment>
    <Grid >
      <Grid.Column width={14}>
        <TargetableHero {...opponent} />

        <Side
          {...opponent}
          active={activePlayer === ActivePlayer.Opponent}
          board={board.opponent}
        />
        <Divider section />
        <Side
          {...player}
          active={activePlayer === ActivePlayer.Player}
          board={board.player}
        />

        <TargetableHero {...player} />
      </Grid.Column>

      <Grid.Column width={2} verticalAlign="middle">
        <Label color="blue" attached="top" size="large">Turn: {turn}</Label>

        <NextTurn onClick={nextTurn} />
      </Grid.Column>
    </Grid>
  </Segment>;

export default Board;
