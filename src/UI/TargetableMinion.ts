import * as React from 'react';
import * as DnD from 'react-dnd';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { performAttack } from './characterReducer';
import MinionCard, { MinionProps } from './Minion';

const collect: DnD.DropTargetCollector = (connector, monitor) => ({
  connectDropTarget: connector.dropTarget(),
  isOver: monitor.isOver(),
});

const spec: DnD.DropTargetSpec<MinionProps> = {
  drop: (props, monitor: DnD.DropTargetMonitor) => {
    const minion = monitor.getItem() as MinionProps;

    return props.performAttack({
      id: props.id,
      source: minion,
      target: props,
    });
  },
  canDrop: (props, monitor: DnD.DropTargetMonitor) => {
    const { owner } = monitor.getItem() as MinionProps;

    return props.owner !== owner;
  },
};

const TargetableMinion = DnD.DropTarget(['Minion', 'Hero'], spec, collect)(MinionCard);

export default connect(R.identity, { performAttack })(
  TargetableMinion
) as React.ComponentClass<MinionProps>;
