import * as React from 'react';
import * as DnD from 'react-dnd';
import { connect } from 'react-redux';
import { Game, getBoard, getDeck, getHand } from '../Game';
import { activeHero, getOpponent, getPlayer } from '../Hero';
import Battlefield, { BattlefieldProps } from './Battlefield';
import { endTurn } from './gameStateReducer';
import { playCard } from './Hand/handReducer';

interface CollectedProps {
  isOver: boolean
  canDrop: boolean
  connectDropTarget: DnD.ConnectDropTarget
}


const collect: DnD.DropTargetCollector<CollectedProps> = (connector: DnD.DropTargetConnector, monitor: DnD.DropTargetMonitor) => ({
  canDrop: true,
  connectDropTarget: connector.dropTarget(),
  isOver: monitor.isOver(),
});

const spec: DnD.DropTargetSpec<BattlefieldProps> = {
  canDrop: (props, monitor: DnD.DropTargetMonitor) => true,
  drop: (props, monitor: DnD.DropTargetMonitor) => {
    const { card } = monitor.getItem();

    return props.playCard(card);
  },
};

const TargetableBattlefield = DnD.DropTarget('Card', spec, collect)(
  Battlefield
);

const mapStateToProps = (game: Game) =>
  ({
    board: getBoard(game),
    currentPlayer: activeHero(game) === getPlayer(game),
    deck: getDeck(game),
    hand: getHand(game),
    opponent: getOpponent(game),
    player: getPlayer(game),
    ...game
  });

export default connect(mapStateToProps, { endTurn, playCard })(
  TargetableBattlefield
) as React.ComponentClass<Partial<BattlefieldProps>>;
