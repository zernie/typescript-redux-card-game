import * as React from 'react';
import { Button, Divider, Grid, Segment } from 'semantic-ui-react';
import { Game } from '../Game';
import { opponentCards, playerCards } from '../Card';
import { opponentMinions, playerMinions } from '../Minion';
import TargetableHero from './TargetableHero';
import Side from './Side';
import NextTurn from './NextTurn';
import { endTurn as endTurnFunction } from './gameStateReducer';
import { Hand } from './Hand';

interface BattlefieldOwnProps {
  currentPlayer: boolean;
  endTurn: typeof endTurnFunction;
  connectDropTarget: Function;
}
export type BattlefieldProps = Game & BattlefieldOwnProps;

const Battlefield: React.StatelessComponent<BattlefieldProps> = ({
  currentPlayer,
  board,
  connectDropTarget,
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

        {connectDropTarget(
          <div>
            <Side
              active={!currentPlayer}
              board={opponentMinions(board)}
            />
            <Divider section />
            <Side
              active={currentPlayer}
              board={playerMinions(board)}
            />
          </div>
        )}

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

export default Battlefield;
