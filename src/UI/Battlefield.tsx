import * as React from 'react';
import { StatelessComponent } from 'react';
import { Divider, Button, Grid, Segment } from 'semantic-ui-react';
// import * as R from 'ramda';
import { Game } from '../Game';
import { PlayerKind } from '../Player';
import TargetableHero from './TargetableHero';
import { Side } from './Side';
import NextTurn from './NextTurn';

export type BoardProps = Game & { nextTurn: Function };
//
// const ownerEqPlayerKind = (playerKind: PlayerKind) =>
//   R.where<Board>({ owner: R.equals(playerKind) });
//
// const selectMinions = (playerKind: PlayerKind) =>
//   R.filter<Board>(ownerEqPlayerKind(playerKind));

export const Battlefield: StatelessComponent<BoardProps> = ({
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
