import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { Divider, Grid, Segment } from "semantic-ui-react";
import classNames from "classnames";
import { Card, canPlayCard, PLAYABLE_CARDS } from "../../models";
import Side from "./Side";
import NextTurn from "./NextTurn";
import Deck from "../Deck/Deck";
import EndGameScreen from "../EndGameScreen";
import { endTurn } from "../../redux/modules/gameStateReducer";
import { playerUseCard } from "../../redux/modules/handReducer";
import Hand from "../Hand/Hand";
import DnDHero from "./DnDHero";
import {
  useGameState,
  useIsGameOver,
  useIsOpponentActive,
  useIsPlayerActive,
  useOpponent,
  useOpponentDeck,
  useOpponentHand,
  useOpponentHero,
  useOpponentMinions,
  usePlayer,
  usePlayerDeck,
  usePlayerHand,
  usePlayerHero,
  usePlayerMinions
} from "../hooks";

// TODO: split up
const Battlefield: React.FC = props => {
  const dispatch = useDispatch();
  const { turn } = useGameState();
  const isPlayer = useIsPlayerActive();
  const isOpponent = useIsOpponentActive();
  const playerHero = usePlayerHero();
  const opponentHero = useOpponentHero();
  const player = usePlayer();
  const opponent = useOpponent();
  const playerMinions = usePlayerMinions();
  const opponentMinions = useOpponentMinions();
  const playerDeck = usePlayerDeck();
  const opponentDeck = useOpponentDeck();
  const playerHand = usePlayerHand();
  const opponentHand = useOpponentHand();
  const isGameOver = useIsGameOver();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: PLAYABLE_CARDS,
    drop: (item: Card, monitor) => dispatch(playerUseCard(item)),
    canDrop: (item: Card, monitor) => canPlayCard(item, player),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const nextTurnHandler = () => dispatch(endTurn());

  return (
    <Segment style={{ padding: "0 0.5em" }}>
      <EndGameScreen
        player={player}
        opponent={opponent}
        open={isGameOver}
        dimmer="blurring"
      />
      <Grid>
        <Grid.Column computer={14} mobile={16}>
          <Hand active={isOpponent} hand={opponentHand} />
          <DnDHero hero={opponentHero} player={opponent} active={isOpponent} />

          <div ref={drop}>
            <Segment
              basic
              className={classNames({
                "inverted green raised": isOver && canDrop
              })}
              style={{ padding: 0 }}
            >
              <Side board={opponentMinions} active={isOpponent} />
              <Divider section={true} style={{ margin: 2 }} />
              <Side board={playerMinions} active={isPlayer} />
            </Segment>
          </div>

          <DnDHero hero={playerHero} player={player} active={isPlayer} />
          <Hand active={isPlayer} hand={playerHand} />
        </Grid.Column>

        <Grid.Column
          computer={2}
          mobile={16}
          verticalAlign="middle"
          stretched={true}
        >
          <Deck deck={opponentDeck} />
          <NextTurn onClick={nextTurnHandler} turn={turn} />
          <Deck deck={playerDeck} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default Battlefield;
