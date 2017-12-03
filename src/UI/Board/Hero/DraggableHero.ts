import * as React from 'react';
import * as DnD from 'react-dnd';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { canAttack } from '../../../Character';
import { CardType } from '../../../enums';
import { HeroProps } from './Hero';
import TargetableHero from './TargetableHero';

const collect: DnD.DragSourceCollector = (connector, monitor) => ({
  connectDragSource: connector.dragSource(),
});

const spec: DnD.DragSourceSpec<HeroProps> = {
  beginDrag: (props, monitor, component) => props,
  canDrag: (props, monitor: DnD.DragSourceMonitor) =>
    props.character.owner === props.state.activePlayer &&
    canAttack(props.character),
};

const DraggableHero = DnD.DragSource<HeroProps>(CardType.Hero, spec, collect)(
  TargetableHero
);

const mapStateToProps = R.pick(['state']);

export default connect(mapStateToProps, {})(
  DraggableHero
) as React.ComponentClass<Partial<HeroProps>>;
