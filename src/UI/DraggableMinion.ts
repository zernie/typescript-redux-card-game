import * as DnD from 'react-dnd';
import { MinionCard, MinionProps } from './Minion';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { ComponentClass } from 'react';

const collect: DnD.DragSourceCollector = (connector, monitor) => ({
  connectDragSource: connector.dragSource(),
});

const spec: DnD.DragSourceSpec<MinionProps> = {
  beginDrag: (props, monitor, component) => props,
  isDragging: (props, monitor: DnD.DragSourceMonitor) => monitor.isDragging(),
  canDrag: (props, monitor: DnD.DragSourceMonitor) =>
    props.minion.owner === props.activePlayer,
};

const DraggableMinion = DnD.DragSource<MinionProps>('Minion', spec, collect)(
  MinionCard
);

const mapStateToProps = R.pick(['activePlayer']);

export default connect(mapStateToProps, {})(DraggableMinion) as ComponentClass<
  Partial<MinionProps>
>;
