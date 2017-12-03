import * as React from 'react';
import * as DnD from 'react-dnd';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { canAttack } from '../../../Character';
import { CardType } from '../../../enums';
import { MinionProps } from './Minion';
import TargetableMinion from './TargetableMinion';

const collect: DnD.DragSourceCollector = (connector, monitor) => ({
  connectDragSource: connector.dragSource(),
  canDrag: monitor.canDrag(),
});

const spec: DnD.DragSourceSpec<MinionProps> = {
  beginDrag: (props, monitor, component) => props,
  canDrag: (props, monitor: DnD.DragSourceMonitor) => {
    return props.character.owner === props.state.activePlayer &&
      canAttack(props.character);
  },
};

const DraggableMinion = DnD.DragSource<MinionProps>(CardType.Minion, spec, collect)(
  TargetableMinion
);

const mapStateToProps = R.pick(['state', 'entities']);

export default connect(mapStateToProps, {})(
  DraggableMinion
) as React.ComponentClass<Partial<MinionProps>>;
