import {
  DropTarget,
  DropTargetCollector,
  DropTargetMonitor,
  DropTargetSpec,
} from 'react-dnd';
import HeroCard, { HeroProps } from './Hero';
import { ComponentClass } from 'react';
import Player, { ActivePlayer } from '../Player';
import Minion from '../Minion';
import { attackFace } from './characterReducer';
import { connect } from 'react-redux';
import Game from '../Game';

const collect: DropTargetCollector = (connectable, monitor) => ({
  connectDropTarget: connectable.dropTarget(),
  isOver: monitor.isOver(),
});

const spec: DropTargetSpec<HeroProps> = {
  drop: (props, monitor: DropTargetMonitor) => {
    const minion = monitor.getItem() as Minion;
    const damage = minion.damage;

    return props.attackFace({
      damage,
      target: ActivePlayer.Player,
      activePlayer: props.activePlayer,
    });
  },
  canDrop: (props, monitor) => true,
};

const TargetableHero = DropTarget('Minion', spec, collect)(HeroCard);

const mapStateToProps = ({ activePlayer }: Game) => ({ activePlayer });

export default connect(mapStateToProps, { attackFace })(
  TargetableHero
) as ComponentClass<Player>;
