import * as React from 'react';
import * as DnD from 'react-dnd';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { canSpendMana } from '../Hero';
import { currentPlayer, Game, } from '../Game';
import { Card, CardProps } from './Card';

const collect: DnD.DragSourceCollector = (connector, monitor) => ({
  connectDragSource: connector.dragSource(),
});

const spec: DnD.DragSourceSpec<CardProps> = {
  beginDrag: (props, monitor, component) => props,
  isDragging: (props, monitor: DnD.DragSourceMonitor) => monitor.isDragging(),
  canDrag: (props, monitor: DnD.DragSourceMonitor) =>
    props.card.owner === props.state.activePlayer &&
    canSpendMana(props.hero, props.card.cost),
};

const DraggableCard = DnD.DragSource<CardProps>('Card', spec, collect)(Card);

const mapStateToProps = (state: Game) => R.assoc('hero', currentPlayer(state), state) as Partial<CardProps>;

export default connect(mapStateToProps, {})(DraggableCard) as React.ComponentClass<
  Partial<CardProps>
>;
