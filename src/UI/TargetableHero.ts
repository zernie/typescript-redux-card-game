import { DropTarget, DropTargetCollector, DropTargetSpec } from 'react-dnd';
// import { connect } from 'react-redux';
import HeroCard from './Hero';
import Player from '../Player';
// import Game from '../Game';

const collect: DropTargetCollector = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
});

const spec: DropTargetSpec<Player> = {
  drop: (props, monitor, component) => ({}),
  canDrop: (props: any, monitor) => true,
};

// const mapStateToProps = (state: Game) => state;

// export default connect(mapStateToProps, {})(
//   DropTarget('Minion', spec, collect)(HeroCard)
// );

export default DropTarget('Minion', spec, collect)(HeroCard);
