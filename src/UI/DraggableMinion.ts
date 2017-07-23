import {
  DragSource,
  DragSourceMonitor,
  DragSourceCollector,
  DragSourceSpec,
} from 'react-dnd';
import { MinionCard, MinionProps } from './Minion';
import { connect } from 'react-redux';
import { pick } from 'ramda';
import { ComponentClass } from 'react';

const collect: DragSourceCollector = (connector, monitor) => ({
  connectDragSource: connector.dragSource(),
});

const spec: DragSourceSpec<MinionProps> = {
  beginDrag: (props, monitor, component) => props,
  isDragging: (props, monitor: DragSourceMonitor) => monitor.isDragging(),
  canDrag: (props, monitor: DragSourceMonitor) => {
    console.log(props);

    return props.minion.owner === props.activePlayer;
  },
};

const DraggableMinion = DragSource<MinionProps>('Minion', spec, collect)(
  MinionCard
);

const mapStateToProps = pick(['activePlayer']);

export default connect(mapStateToProps, {})(DraggableMinion) as ComponentClass<
  Partial<MinionProps>
>;
