import * as classNames from "classnames";
import * as React from "react";
import { ConnectDropTarget } from "react-dnd";
import { Button, Divider, Grid, Segment } from "semantic-ui-react";
import { MinionContainer } from "../Board";
import { Card, CardContainer, opponentCards, playerCards } from "../Card";
import { Step } from "../enums";
import { Game } from "../Game";
import { Hero } from "../Hero";
import { opponentMinions, playerMinions } from "../Minion";
import DraggableHero from "./Board/Hero/DraggableHero";
import Side from "./Board/Minion/Side";
import NextTurn from "./Board/NextTurn";
import Deck from "./Deck/Deck";
import EndGameScreen from "./EndGameScreen";
import { endTurn as endTurnFunction } from "./gameStateReducer";
import { Hand } from "./Hand/Hand";
import { playCard } from "./Hand/handReducer";

interface BattlefieldOwnProps {
  card: Card;
  connectDropTarget: ConnectDropTarget;
  isCurrentPlayer: boolean;
  endTurn: typeof endTurnFunction;
  isOver: boolean;
  playCard: typeof playCard;
  player: Hero;
  opponent: Hero;
  board: MinionContainer;
  hand: CardContainer;
  deck: CardContainer;
}

export type BattlefieldProps = Game & BattlefieldOwnProps;

const Battlefield: React.FunctionComponent<BattlefieldProps> = ({
                                                                  isCurrentPlayer,
  board,
  connectDropTarget,
  deck,
  isOver,
  endTurn,
  hand,
  player,
  opponent,
  state: { turn, activePlayer, step }
}) => (
  <Segment>
    <EndGameScreen
      player={player}
      opponent={opponent}
      open={step === Step.FinalGameOver}
      dimmer="blurring"
    />
    <Grid>
      <Grid.Column computer={14} mobile={16}>
        <Hand active={!isCurrentPlayer} hand={opponentCards(hand)} />
        <DraggableHero character={opponent} />

        {connectDropTarget(
          <div
            className={classNames("ui basic segment", {
              "inverted green raised": isOver
            })}
          >
            <Side board={opponentMinions(board)} />
            <Divider section={true} />
            <Side board={playerMinions(board)} />
          </div>
        )}

        <DraggableHero character={player} />
        <Hand active={currentPlayer} hand={playerCards(hand)} />
      </Grid.Column>

      <Grid.Column
        computer={2}
        mobile={16}
        verticalAlign="middle"
        stretched={true}
      >
        <Deck deck={opponentCards(deck)} />

        <Button.Group vertical={true} size="large">
          <Button color="green" basic={true}>
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
