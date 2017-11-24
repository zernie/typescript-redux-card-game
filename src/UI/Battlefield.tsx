import * as React from 'react';
import { Button, Divider, Grid, Segment } from 'semantic-ui-react';
import { Game } from '../Game';
import { Card, opponentCards, playerCards } from '../Card';
import { opponentMinions, playerMinions } from '../Minion';
import DraggableHero from './Board/Hero/DraggableHero';
import Side from './Board/Minion/Side';
import NextTurn from './Board/NextTurn';
import { endTurn as endTurnFunction } from './gameStateReducer';
import { Hand } from './Hand/Hand';
import { playCard } from './Hand/handReducer';
import { Hero } from '../Hero';
import Deck from './Deck/Deck';
import { Step } from '../enums';
import EndGameScreen from './EndGameScreen';

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
  deck,
  isOver,
  endTurn,
  hand,
  player,
  opponent,
  state: { turn, activePlayer, step },
}) => (
  <Segment>
    <EndGameScreen
      player={player}
      opponent={opponent}
      open={step === Step.FinalGameOver}
    />
    <Grid>
      <Grid.Column computer={14} mobile={16}>
        <Hand active={!currentPlayer} hand={opponentCards(hand)} />
        <DraggableHero {...opponent} />

        {connectDropTarget(
          <div
            className={`ui basic segment ${isOver
              ? 'inverted green raised'
              : ''}`}
          >
            <Side active={!currentPlayer} board={opponentMinions(board)} />
            <Divider section />
            <Side active={currentPlayer} board={playerMinions(board)} />
          </div>
        )}

        <DraggableHero {...player} />
        <Hand active={currentPlayer} hand={playerCards(hand)} />
      </Grid.Column>

      <Grid.Column computer={2} mobile={16} verticalAlign="middle" stretched>
        <Deck deck={opponentCards(deck)} />

        <Button.Group vertical size="large">
          <Button color="green" basic>
            Turn: {turn}
          </Button>

          <NextTurn onClick={endTurn} />
        </Button.Group>
        <Deck deck={playerCards(deck)} />
      </Grid.Column>
    </Grid>
  </Segment>
);

export default Battlefield;
