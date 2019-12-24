import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { Button, Divider, Grid, Segment } from "semantic-ui-react";
import classNames from "classnames";
import { Card, opponentCards, playerCards } from "../Card";
import { CardType, Step } from "../enums";
import { activeHero, getOpponentHero, getPlayerHero } from "../Hero";
import {
  minionsFromContainer,
  opponentMinions,
  playerMinions
} from "../Minion";
import Side from "./Play/Minion/Side";
import NextTurn from "./Play/NextTurn";
import Deck from "./Deck/Deck";
import EndGameScreen from "./EndGameScreen";
import { endTurn } from "./gameStateReducer";
import Hand from "./Hand/Hand";
import { playerUseCard } from "./Hand/handReducer";
import HeroComponent from "./Play/Hero/Hero";
import { useGame } from "./hooks";
import { getOpponent, getPlayer } from "../Player";

const Battlefield: React.FC = props => {
  // TODO: Refactor
  const dispatch = useDispatch();
  const game = useGame();
  const {
    deck,
    hand,
    play,
    state: { turn, activePlayer, step }
  } = game;
  const isCurrentPlayer = activeHero(game) === getPlayerHero(game);
  const playerHero = getPlayerHero(game);
  const opponentHero = getOpponentHero(game);
  const player = getPlayer(game);
  const opponent = getOpponent(game);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [CardType.Minion, CardType.Weapon],
    drop: (props, monitor) => {
      const card = monitor.getItem() as Card;
      console.log(card);

      return dispatch(playerUseCard(card));
    },
    canDrop: (item, monitor) => {
      console.log("canDrop", item);
      return true;
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  // TODO: extract hook
  const minions = minionsFromContainer(play);

  return (
    <Segment>
      <EndGameScreen
        player={player}
        opponent={opponent}
        open={step === Step.FinalGameOver}
        dimmer="blurring"
      />
      <Grid>
        <Grid.Column computer={14} mobile={16}>
          <Hand active={!isCurrentPlayer} hand={opponentCards(game.hand)} />
          <HeroComponent hero={opponentHero} player={opponent} />

          <div ref={drop}>
            <Segment
              basic
              className={classNames({
                "inverted green raised": isOver && canDrop
              })}
            >
              <Side board={opponentMinions(minions)} />
              <Divider section={true} />
              <Side board={playerMinions(minions)} />
            </Segment>
          </div>

          <HeroComponent hero={playerHero} player={player} />
          <Hand active={isCurrentPlayer} hand={playerCards(hand)} />
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

            <NextTurn onClick={() => dispatch(endTurn())} />
          </Button.Group>
          <Deck deck={playerCards(deck)} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default Battlefield;
