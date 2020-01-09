import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { Divider, Grid, Segment } from "semantic-ui-react";
import classNames from "classnames";
import {
  Card,
  CardType,
  Step,
  Zone,
  canSpendMana
} from "../../models";
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
  useIsPlayerActive,
  useOpponent,
  useOpponentCards,
  useOpponentHero,
  useOpponentMinions,
  usePlayer,
  usePlayerCards,
  usePlayerHero,
  usePlayerMinions,
} from "../hooks";

// TODO: split up
const Battlefield: React.FC = props => {
  const dispatch = useDispatch();
  const { turn, step } = useGameState();
  const isCurrentPlayer = useIsPlayerActive();
  const playerHero = usePlayerHero();
  const opponentHero = useOpponentHero();
  const player = usePlayer();
  const opponent = useOpponent();
  const playerMinions = usePlayerMinions();
  const opponentMinions = useOpponentMinions();
  const playerCards = usePlayerCards();
  const opponentCards = useOpponentCards();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [
      CardType.Minion,
      CardType.Weapon,
      CardType.Spell,
      CardType.Hero,
      CardType.HeroPower
    ],
    drop: (item: Card, monitor) => dispatch(playerUseCard(item)),
    canDrop: (item: Card, monitor) =>
      item.zone === Zone.Hand && canSpendMana(player, item.cost),
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
        open={step === Step.FinalGameOver}
        dimmer="blurring"
      />
      <Grid>
        <Grid.Column computer={14} mobile={16}>
          <Hand active={!isCurrentPlayer} hand={opponentCards} />
          <DnDHero hero={opponentHero} player={opponent} />

          <div ref={drop}>
            <Segment
              basic
              className={classNames({
                "inverted green raised": isOver && canDrop
              })}
              style={{ padding: 0 }}
            >
              <Side board={opponentMinions} />
              <Divider section={true} style={{ margin: 2 }} />
              <Side board={playerMinions} />
            </Segment>
          </div>

          <DnDHero hero={playerHero} player={player} />
          <Hand active={isCurrentPlayer} hand={playerCards} />
        </Grid.Column>

        <Grid.Column
          computer={2}
          mobile={16}
          verticalAlign="middle"
          stretched={true}
        >
          <Deck deck={opponentCards} />
          <NextTurn onClick={nextTurnHandler} turn={turn} />
          <Deck deck={playerCards} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default Battlefield;
