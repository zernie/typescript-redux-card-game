import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { Button, Divider, Grid, Segment } from "semantic-ui-react";
import classNames from "classnames";
import { Card, opponentCards, playerCards } from "../../types/Card";
import { CardType, Step, Zone } from "../../types/enums";
import { activeHero, getOpponentHero, getPlayerHero } from "../../types/Hero";
import {
  minionsFromContainer,
  opponentMinions,
  playerMinions
} from "../../types/Minion";
import Side from "./Side";
import NextTurn from "./NextTurn";
import Deck from "../Deck/Deck";
import EndGameScreen from "../EndGameScreen";
import { endTurn } from "../../redux/modules/gameStateReducer";
import Hand from "../Hand/Hand";
import { playerUseCard } from "../../redux/modules/handReducer";
import HeroComponent from "./DnDHero";
import { useGame } from "../hooks";
import { canSpendMana, getOpponent, getPlayer } from "../../types/Player";

const Battlefield: React.FC = props => {
  const dispatch = useDispatch();
  const game = useGame();
  const {
    deck,
    hand,
    play,
    state: { turn, activePlayer, step }
  } = game;
  // TODO: extract hooks
  const isCurrentPlayer = activeHero(game) === getPlayerHero(game);
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
      canSpendMana(player, item.cost),
      // item.zone === Zone.Hand && canSpendMana(player, item.cost),
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
          <Hand active={!isCurrentPlayer} hand={opponentCards(game.hand)} />
          <HeroComponent hero={opponentHero} player={opponent} />

          <div ref={drop}>
            <Segment
              basic
              className={classNames({
                "inverted green raised": isOver && canDrop
              })}
              style={{ padding: 0 }}
            >
              <Side board={opponentMinions(minions)} />
              <Divider section={true} style={{ margin: 2 }} />
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
