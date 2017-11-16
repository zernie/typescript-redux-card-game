import * as React from 'react';
import * as DnD from 'react-dnd';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { performAttack } from '../characterReducer';
import HeroCard, { HeroProps } from './Hero';
import {  MinionProps } from '../Minion/Minion';

const collect: DnD.DropTargetCollector = (connector, monitor) => ({
  connectDropTarget: connector.dropTarget(),
  isOver: monitor.isOver(),
});

const spec: DnD.DropTargetSpec<HeroProps> = {
  drop: (props, monitor: DnD.DropTargetMonitor) => {
    const attacker = monitor.getItem() as MinionProps;

    return props.performAttack({
      id: props.id,
      source: attacker,
      target: props,
    });
  },
  canDrop: (props, monitor: DnD.DropTargetMonitor) => {
    const { owner } = monitor.getItem() as MinionProps;

    return props.owner !== owner;
  },
};

const TargetableHero = DnD.DropTarget(['Minion', 'Hero'], spec, collect)(
  HeroCard
);

export default connect(R.identity, { performAttack })(
  TargetableHero
) as React.ComponentClass<HeroProps>;
