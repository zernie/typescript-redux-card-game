import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { Button, Divider, Grid, Segment } from "semantic-ui-react";
import classNames from "classnames";
import {
  minionsFromContainer,
  opponentMinions,
  playerMinions,
  Card,
  opponentCards,
  playerCards,
  CardType,
  Step,
  Zone,
  canSpendMana,
  getOpponent,
  getPlayer,
  // activeHero,
  getOpponentHero,
  getPlayerHero
} from "../../types";
import Side from "./Side";
import NextTurn from "./NextTurn";
import Deck from "../Deck/Deck";
import EndGameScreen from "../EndGameScreen";
import { endTurn } from "../../redux/modules/gameStateReducer";
import { playerUseCard } from "../../redux/modules/handReducer";
import Hand from "../Hand/Hand";
import DnDHero from "./DnDHero";
import { useGame } from "../hooks";

const Battlefield: React.FC = props => {
  const dispatch = useDispatch();
  const game = useGame();
  const {
    deck,
    hand,
    play,
    state: { turn, activePlayer, step, playerID }
  } = game;
  // TODO: extract hooks
  const isCurrentPlayer = activePlayer === playerID;
  const playerHero = getPlayerHero(game);
  const opponentHero = getOpponentHero(game);
  const player = getPlayer(game);
  const opponent = getOpponent(game);

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

  // TODO: extract hook
  const minions = minionsFromContainer(play);

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
          <Hand active={!isCurrentPlayer} hand={opponentCards(game)} />
          <DnDHero hero={opponentHero} player={opponent} />

          <div ref={drop}>
            <Segment
              basic
              className={classNames({
                "inverted green raised": isOver && canDrop
              })}
              style={{ padding: 0 }}
            >
              <Side board={opponentMinions(game)} />
              <Divider section={true} style={{ margin: 2 }} />
              <Side board={playerMinions(game)} />
            </Segment>
          </div>

          <DnDHero hero={playerHero} player={player} />
          <Hand active={isCurrentPlayer} hand={playerCards(game)} />
        </Grid.Column>

        <Grid.Column
          computer={2}
          mobile={16}
          verticalAlign="middle"
          stretched={true}
        >
          <Deck deck={opponentCards(game)} />

          <Button.Group vertical={true} size="large">
            <Button color="green" basic={true}>
              Turn: {turn}
            </Button>

            <NextTurn onClick={() => dispatch(endTurn())} />
          </Button.Group>
          <Deck deck={playerCards(game)} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default Battlefield;
