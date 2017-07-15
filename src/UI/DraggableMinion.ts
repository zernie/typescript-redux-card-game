import { DragSource, DragSourceMonitor, DragSourceCollector, DragSourceSpec } from 'react-dnd';
import MinionCard from './MinionCard';
import Minion from '../Minion';
import { ComponentClass, connect } from 'react-redux';
import { pick } from 'ramda';

const collect: DragSourceCollector = (connector, monitor) => ({
  connectDragSource: connector.dragSource(),
});

const spec: DragSourceSpec<Minion> = {
  beginDrag: (props, monitor, component) => props,
  isDragging: (props, monitor: DragSourceMonitor) => monitor.isDragging(),
  canDrag: (props, monitor: DragSourceMonitor) => {
    console.log(props);
    console.log(monitor.getItem());

    return true;
  },
};

const DraggableMinion = DragSource('Minion', spec, collect)(MinionCard);

const mapStateToProps = pick(['activePlayer']);

export default connect(mapStateToProps, {  })(
  DraggableMinion
) as ComponentClass<Minion>;
