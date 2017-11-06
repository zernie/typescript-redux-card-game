import * as React from 'react';
import * as DnD from 'react-dnd';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { Game } from '../Game';
import { PlayerKind } from '../Hero';
import Battlefield, { BattlefieldProps } from './Battlefield';
import { endTurn } from './gameStateReducer';
import { playCard } from './handReducer';

const collect: DnD.DropTargetCollector = (connector, monitor) => ({
  connectDropTarget: connector.dropTarget(),
  isOver: monitor.isOver(),
});

const spec: DnD.DropTargetSpec<BattlefieldProps> = {
  drop: (props, monitor: DnD.DropTargetMonitor) => {
    const { card } = monitor.getItem() as BattlefieldProps;

    return props.playCard(card);
  },
  canDrop: (props, monitor: DnD.DropTargetMonitor) => true,
};

const TargetableBattlefield = DnD.DropTarget('Card', spec, collect)(Battlefield);

const mapStateToProps = R.pipe(
  R.pick<Game, keyof Game>([
    'board',
    'deck',
    'hand',
    'player',
    'opponent',
    'state',
  ]),
  // TODO: refactor
  R.converge(R.assoc('currentPlayer'), [R.pathEq(['state', 'activePlayer'], PlayerKind.Player), R.identity])
);

export default connect(mapStateToProps, { endTurn, playCard })(
  TargetableBattlefield
) as React.ComponentClass<Partial<BattlefieldProps>>;
