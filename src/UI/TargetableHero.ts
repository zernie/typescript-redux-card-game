import { DropTarget, DropTargetCollector, DropTargetSpec } from 'react-dnd';
import HeroCard from './Hero';
import Player from '../Player';

const collect: DropTargetCollector = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
});

const spec: DropTargetSpec<Player> = {
  drop: (props, monitor, component) => ({}),
};

export default DropTarget('Minion', spec, collect)(HeroCard);
