import * as React from 'react';
import * as DnD from 'react-dnd';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { performAttack } from '../characterReducer';
import MinionCard, { MinionProps } from './Minion';
import { getMinions, isValidTarget, ownerMinions } from '../../../Minion';

const collect: DnD.DropTargetCollector = (connector, monitor) => ({
  connectDropTarget: connector.dropTarget(),
  isOver: monitor.isOver(),
});

const spec: DnD.DropTargetSpec<MinionProps> = {
  drop: (props, monitor: DnD.DropTargetMonitor) => {
    const { character } = monitor.getItem() as MinionProps;

    return props.performAttack({
      id: props.character.id,
      source: character,
      target: props.character,
    });
  },
  canDrop: (props, monitor: DnD.DropTargetMonitor) => {
    const { character } = monitor.getItem() as MinionProps;

    const enemyMinions = ownerMinions(
      props.character.owner,
      getMinions(props.entities)
    );

    return (
      props.character.owner !== character.owner &&
      isValidTarget(props.character, enemyMinions)
    );
  },
};

const TargetableMinion = DnD.DropTarget(['Minion', 'Hero'], spec, collect)(
  MinionCard
);

export default connect(R.identity, { performAttack })(
  TargetableMinion
) as React.ComponentClass<MinionProps>;
