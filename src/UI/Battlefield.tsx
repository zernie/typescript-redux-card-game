import * as React from 'react';
import { Button, Divider, Grid, Segment } from 'semantic-ui-react';
import { Game } from '../Game';
import { Card, opponentCards, playerCards } from '../Card';
import { opponentMinions, playerMinions } from '../Minion';
import TargetableHero from './TargetableHero';
import Side from './Side';
import NextTurn from './NextTurn';
import { endTurn as endTurnFunction } from './gameStateReducer';
import { Hand } from './Hand';
import { playCard } from './handReducer';
import { Hero } from '../Hero';

interface BattlefieldOwnProps {
  card: Card;
  connectDropTarget: Function;
  currentPlayer: boolean;
  endTurn: typeof endTurnFunction;
  isOver: boolean;
  playCard: typeof playCard;
  player: Hero;
  opponent: Hero;
}
export type BattlefieldProps = Game & BattlefieldOwnProps;

const Battlefield: React.StatelessComponent<BattlefieldProps> = ({
  currentPlayer,
  board,
  connectDropTarget,
  isOver,
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
      <Grid.Column computer={14} mobile={16}>
        <Hand active={!currentPlayer} hand={opponentCards(hand)}/>
        <TargetableHero {...opponent} />

        {connectDropTarget(
          <div className={`ui basic segment ${isOver ? 'inverted olive raised' : undefined}`}>
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
        <Hand active={currentPlayer} hand={playerCards(hand)}/>
      </Grid.Column>

      <Grid.Column computer={2} mobile={16} verticalAlign="middle" stretched>
        <Button.Group vertical size="large">
          <Button color="green" basic>Turn: {turn}</Button>

          <NextTurn onClick={endTurn} />
        </Button.Group>
      </Grid.Column>
    </Grid>
  </Segment>;

export default Battlefield;
