import * as React from 'react';
import { StatelessComponent } from 'react';
import { Divider, Button, Grid, Segment } from 'semantic-ui-react';
import TargetableHero from './TargetableHero';
import { Side } from './Side';
import { Game } from '../Game';
import NextTurn from './NextTurn';
import { PlayerKind } from '../Player';
// import { where, equals } from 'ramda';
// import { Board } from '../Board';

export type BoardProps = Game & { nextTurn: Function };
//
// const selectMinions: Board = (playerKind: PlayerKind) => (minions: Board) =>
//   where({ owner: equals(playerKind) });
//
// const playerMinions = selectMinions(PlayerKind.Player);

const Board: StatelessComponent<BoardProps> = ({
  activePlayer,
  board,
  nextTurn,
  player,
  opponent,
  turn,
}) =>
  <Segment>
    <Grid>
      <Grid.Column width={14}>
        <TargetableHero {...opponent} />

        <Side
          active={activePlayer === PlayerKind.Opponent}
          board={board}
        />
        <Divider section />
        <Side
          active={activePlayer === PlayerKind.Player}
          board={board}
        />

        <TargetableHero {...player} />
      </Grid.Column>

      <Grid.Column width={2} verticalAlign="middle">
        <Button.Group vertical size="large">
          <Button color="green" basic>Turn: {turn}</Button>

          <NextTurn onClick={nextTurn} />
        </Button.Group>
      </Grid.Column>
    </Grid>
  </Segment>;

export default Board;
