// @ts-nocheck
import React from "react";
import * as DnD from "react-dnd";
import { connect } from "react-redux";
import _ from "lodash/fp";
import { Game, getBoard, getDeck, getHand } from "../Game";
import { activeHero, getOpponentHero, getPlayerHero } from "../Hero";
import Battlefield, { BattlefieldProps } from "./Battlefield";
import { endTurn } from "./gameStateReducer";
import { playCard } from "./Hand/handReducer";

const collect: DnD.DropTargetCollector = (connector, monitor) => ({
  connectDropTarget: connector.dropTarget(),
  isOver: monitor.isOver()
});

const spec: DnD.DropTargetSpec<BattlefieldProps> = {
  drop: (props, monitor: DnD.DropTargetMonitor) => {
    const { card } = monitor.getItem() as BattlefieldProps;

    return props.playCard(card);
  },
  canDrop: _.T
};

const TargetableBattlefield = DnD.DropTarget("Card", spec, collect)(
  Battlefield
);

const mapStateToProps = (game: Game) => ({
  ...game,
  isCurrentPlayer: activeHero(game) === getPlayerHero(game),
  player: getPlayerHero(game),
  opponent: getOpponentHero(game),
  board: getBoard(game),
  hand: getHand(game),
  deck: getDeck(game)
});

export default connect(
  mapStateToProps,
  { endTurn, playCard }
)(Battlefield); // as React.ComponentClass<Partial<BattlefieldProps>>;
