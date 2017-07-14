import { DragSource, DragSourceMonitor, DragSourceCollector, DragSourceSpec } from 'react-dnd';
import MinionCard from './MinionCard';
import Minion from '../Minion';

const collect: DragSourceCollector = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
});

const spec: DragSourceSpec<Minion> = {
  beginDrag: (props, monitor, component) => props,
  isDragging: (props, monitor: DragSourceMonitor) => monitor.isDragging(),
};

export default DragSource('Minion', spec, collect)(MinionCard);
