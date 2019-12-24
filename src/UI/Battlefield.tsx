import React from 'react';
import { useDrop } from 'react-dnd';
import { Button, Divider, Grid, Segment } from 'semantic-ui-react';
import classNames from 'classnames';
import { Card, opponentCards, playerCards } from '../Card';
import { CardType, Step } from '../enums';
import { getBoard, getDeck, getHand } from '../Game';
import { activeHero, getOpponentHero, getPlayerHero } from '../Hero';
import { opponentMinions, playerMinions } from '../Minion';
import Side from './Board/Minion/Side';
import NextTurn from './Board/NextTurn';
import Deck from './Deck/Deck';
import EndGameScreen from './EndGameScreen';
import { endTurn } from './gameStateReducer';
import Hand from './Hand/Hand';
import { playCard } from './Hand/handReducer';
import HeroComponent from './Board/Hero/Hero';
import { useGame } from './hooks';
import { useDispatch } from 'react-redux';
import { getOpponent, getPlayer } from '../Player';

// interface BattlefieldOwnProps {
//   card: Card;
//   isCurrentPlayer: boolean;
//   endTurn: typeof endTurnFunction;
//   playCard: typeof playCard;
//   player: Hero;
//   opponent: Hero;
//   board: MinionContainer;
//   hand: CardContainer;
//   deck: CardContainer;
// }

// export type BattlefieldProps = BattlefieldOwnProps;

const Battlefield: React.FC = props => {
  // TODO: Refactor
  const dispatch = useDispatch();
  const game = useGame();
  console.log("game", game)
  const {
    state: { turn, activePlayer, step }
  } = game;
  const isCurrentPlayer = activeHero(game) === getPlayerHero(game);
  const playerHero = getPlayerHero(game);
  const opponentHero = getOpponentHero(game);
  const player = getPlayer(game);
  const opponent = getOpponent(game);
  const board = getBoard(game);
  const hand = getHand(game);
  const deck = getDeck(game);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [CardType.Minion, CardType.Weapon],
    drop: (props, monitor) => {
      const card = monitor.getItem() as Card;
      console.log(card);

      return dispatch(playCard(card));
    },
    canDrop: (item, monitor) => {
      console.log("canDrop", item)
      return true
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  return (
    <Segment>
      <EndGameScreen
        player={playerHero}
        opponent={opponentHero}
        open={step === Step.FinalGameOver}
        dimmer="blurring"
      />
      <Grid>
        <Grid.Column computer={14} mobile={16}>
          <Hand active={!isCurrentPlayer} hand={opponentCards(hand)} />
          <HeroComponent hero={opponentHero} player={opponent} />

          <div ref={drop}>
            <Segment
              basic
              className={classNames({
                "inverted green raised": isOver && canDrop
              })}
            >
              <Side board={opponentMinions(board)} />
              <Divider section={true} />
              <Side board={playerMinions(board)} />
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

            <NextTurn onClick={() => dispatch(endTurn)} />
          </Button.Group>
          <Deck deck={playerCards(deck)} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default Battlefield;
