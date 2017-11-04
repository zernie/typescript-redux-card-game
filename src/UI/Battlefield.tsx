import * as React from 'react';
import { Button, Divider, Grid, Segment } from 'semantic-ui-react';
import { Game } from '../Game';
import { PlayerKind } from '../Player';
import TargetableHero from './TargetableHero';
import { Side } from './Side';
import NextTurn from './NextTurn';
import { opponentMinions, playerMinions } from '../Minion';
import { endTurn as endTurnFunction } from './gameStateReducer';
import { opponentCards, playerCards } from '../Card';
import { Hand } from './Hand';

export interface BoardPropsActions {
  endTurn: typeof endTurnFunction;
}
export type BoardProps = Game & BoardPropsActions;

export const Battlefield: React.StatelessComponent<BoardProps> = ({
  board,
  endTurn,
  hand,
  player,
  opponent,
  state: {
    turn,
    activePlayer,
  },
}) =>
  <Segment>
    <Grid>
      <Grid.Column width={14}>
        <Hand hand={opponentCards(hand)}/>
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
        <Hand hand={playerCards(hand)}/>
      </Grid.Column>

      <Grid.Column width={2} verticalAlign="middle">
        <Button.Group vertical size="large">
          <Button color="green" basic>Turn: {turn}</Button>

          <NextTurn onClick={endTurn} />
        </Button.Group>
      </Grid.Column>
    </Grid>
  </Segment>;
