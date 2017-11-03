import * as DnD from 'react-dnd';
import { connect } from 'react-redux';
import * as R from 'ramda';
import * as React from 'react';
import { Player } from '../Player';
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
      damage: minion.damage,
      player: props.kind,
    });
  },
  canDrop: (props, monitor: DnD.DropTargetMonitor) => {
    const { minion: { owner } } = monitor.getItem() as MinionProps;

    return props.kind !== owner;
  },
};

const TargetableHero = DnD.DropTarget('Minion', spec, collect)(HeroCard);

export default connect(R.identity, { attackFace })(
  TargetableHero
) as React.ComponentClass<Player>;
