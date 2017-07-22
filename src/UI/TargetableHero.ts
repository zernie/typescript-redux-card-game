import {
  DropTarget,
  DropTargetCollector,
  DropTargetMonitor,
  DropTargetSpec,
} from 'react-dnd';
import HeroCard, { HeroProps } from './Hero';
import { ComponentClass } from 'react';
import { Player } from '../Player';
import { attackFace } from './characterReducer';
import { connect } from 'react-redux';
import { pick } from 'ramda';
import { MinionProps } from './Minion';

const collect: DropTargetCollector = (connector, monitor) => ({
  connectDropTarget: connector.dropTarget(),
  isOver: monitor.isOver(),
});

const spec: DropTargetSpec<HeroProps> = {
  drop: (props, monitor: DropTargetMonitor) => {
    const { minion } = monitor.getItem() as MinionProps;

    return props.attackFace({
      source: minion,
      damage: minion.damage,
      target: props,
    });
  },
  canDrop: (props, monitor) => true,
};

const TargetableHero = DropTarget('Minion', spec, collect)(HeroCard);

const mapStateToProps = pick(['activePlayer']);

export default connect(mapStateToProps, { attackFace })(
  TargetableHero
) as ComponentClass<Player>;
