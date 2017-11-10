import * as React from 'react';
import * as DnD from 'react-dnd';
import { connect } from 'react-redux';
import { Hero } from '../Hero';
import { performAttack } from './characterReducer';
import HeroCard, { HeroProps } from './Hero';
import { MinionProps } from './Minion';

const collect: DnD.DropTargetCollector = (connector, monitor) => ({
  connectDropTarget: connector.dropTarget(),
  isOver: monitor.isOver(),
});

const spec: DnD.DropTargetSpec<HeroProps> = {
  drop: (props, monitor: DnD.DropTargetMonitor) => {
    const { minion } = monitor.getItem() as MinionProps;

    return props.performAttack({
      source: minion,
      target: props,
    });
  },
  canDrop: (props, monitor: DnD.DropTargetMonitor) => {
    const { minion: { owner } } = monitor.getItem() as MinionProps;

    return props.owner !== owner;
  },
};

const TargetableHero = DnD.DropTarget('Minion', spec, collect)(HeroCard);

export default connect(null, { performAttack })(
  TargetableHero
) as React.ComponentClass<Hero>;
