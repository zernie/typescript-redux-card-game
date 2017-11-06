import * as React from 'react';
import * as DnD from 'react-dnd';
import { connect } from 'react-redux';
import { Hero } from '../Hero';
import { attackFace } from './characterReducer';
import HeroCard, { HeroProps } from './Hero';
import { MinionProps } from './Minion';

const collect: DnD.DropTargetCollector = (connector, monitor) => ({
  connectDropTarget: connector.dropTarget(),
  isOver: monitor.isOver(),
});

const spec: DnD.DropTargetSpec<HeroProps> = {
  drop: (props, monitor: DnD.DropTargetMonitor) => {
    const { minion } = monitor.getItem() as MinionProps;

    return props.attackFace({
      source: minion,
      damage: minion.attack,
      player: props.owner,
    });
  },
  canDrop: (props, monitor: DnD.DropTargetMonitor) => {
    const { minion: { owner } } = monitor.getItem() as MinionProps;

    return props.owner !== owner;
  },
};

const TargetableHero = DnD.DropTarget('Minion', spec, collect)(HeroCard);

export default connect(null, { attackFace })(
  TargetableHero
) as React.ComponentClass<Hero>;
