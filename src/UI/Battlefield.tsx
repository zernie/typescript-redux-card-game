import * as React from 'react';
import { Button, Divider, Grid, Segment } from 'semantic-ui-react';
import { Game } from '../Game';
import { PlayerKind } from '../Player';
import TargetableHero from './TargetableHero';
import { Side } from './Side';
import NextTurn from './NextTurn';
import { opponentMinions, playerMinions } from '../Minion';

export type BoardProps = Game & { nextTurn: Function };

export const Battlefield: React.StatelessComponent<BoardProps> = ({
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
          board={opponentMinions(board)}
        />
        <Divider section />
        <Side
          active={activePlayer === PlayerKind.Player}
          board={playerMinions(board)}
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
