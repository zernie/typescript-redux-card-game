import * as React from 'react';
import * as DnD from 'react-dnd';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { canAttack } from '../../../Character';
import { HeroProps } from './Hero';
import TargetableHero from './TargetableHero';

const collect: DnD.DragSourceCollector = (connector, monitor) => ({
  connectDragSource: connector.dragSource(),
});

const spec: DnD.DragSourceSpec<HeroProps> = {
  beginDrag: (props, monitor, component) => props,
  isDragging: (props, monitor: DnD.DragSourceMonitor) => monitor.isDragging(),
  canDrag: (props, monitor: DnD.DragSourceMonitor) =>
    props.character.owner === props.state.activePlayer &&
    canAttack(props.character),
};

const DraggableHero = DnD.DragSource<HeroProps>('Hero', spec, collect)(
  TargetableHero
);

const mapStateToProps = R.pick(['state']);

export default connect(mapStateToProps, {})(
  DraggableHero
) as React.ComponentClass<Partial<HeroProps>>;
