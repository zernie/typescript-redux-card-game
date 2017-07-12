import {
  DragSource,
  DragSourceCollector,
  DragSourceMonitor,
  DragSourceSpec,
} from 'react-dnd';
import MinionCard from './MinionCard';
import Minion from '../Minion';

const collect: DragSourceCollector = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
});

const spec: DragSourceSpec<Minion> = {
  beginDrag: (props: {}, monitor: DragSourceMonitor, component) => ({}),
  isDragging: (props: {}, monitor: DragSourceMonitor) => monitor.isDragging(),
};

export default DragSource('Minion', spec, collect)(MinionCard);
