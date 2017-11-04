import * as React from 'react';
import * as DnD from 'react-dnd';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { MinionCard, MinionProps } from './Minion';

const collect: DnD.DragSourceCollector = (connector, monitor) => ({
  connectDragSource: connector.dragSource(),
});

const spec: DnD.DragSourceSpec<MinionProps> = {
  beginDrag: (props, monitor, component) => props,
  isDragging: (props, monitor: DnD.DragSourceMonitor) => monitor.isDragging(),
  canDrag: (props, monitor: DnD.DragSourceMonitor) => props.minion.owner === props.state.activePlayer,
};

const DraggableMinion = DnD.DragSource<MinionProps>('Minion', spec, collect)(
  MinionCard
);

const mapStateToProps = R.pick(['state']);

export default connect(mapStateToProps, {})(DraggableMinion) as React.ComponentClass<Partial<MinionProps>>;
