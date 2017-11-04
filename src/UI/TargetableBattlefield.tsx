import * as React from 'react';
import * as DnD from 'react-dnd';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { Game } from '../Game';
import Battlefield, { BattlefieldProps } from './Battlefield';
import { endTurn } from './gameStateReducer';
import { PlayerKind } from '../Player';

const collect: DnD.DropTargetCollector = (connector, monitor) => ({
  connectDropTarget: connector.dropTarget(),
  isOver: monitor.isOver(),
});

const spec: DnD.DropTargetSpec<BattlefieldProps> = {
  drop: (props, monitor: DnD.DropTargetMonitor) => {
    // const { minion } = monitor.getItem() as MinionProps;
    console.log(props);
    console.log(monitor.getItem());
    // return props.attackFace({
    //   source: minion,
    //   damage: minion.attack,
    //   player: props.owner,
    // });
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

export default connect(mapStateToProps, { endTurn })(
  TargetableBattlefield
) as React.ComponentClass<Partial<BattlefieldProps>>;
