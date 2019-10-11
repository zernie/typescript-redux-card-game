import * as React from "react";
import * as DnD from "react-dnd";
import { connect } from "react-redux";
import * as _ from "lodash/fp";
import { activeHero } from "../../Hero";
import { Game } from "../../Game";
import { Card, CardProps } from "./Card";
import { canSpendMana } from "../../Player";

const collect: DnD.DragSourceCollector = (connector, monitor) => ({
  connectDragSource: connector.dragSource()
});

const spec: DnD.DragSourceSpec<CardProps> = {
  beginDrag: (props, monitor, component) => props,
  isDragging: (props, monitor: DnD.DragSourceMonitor) => monitor.isDragging(),
  canDrag: (props, monitor: DnD.DragSourceMonitor) =>
    props.card.owner === props.state.activePlayer &&
    canSpendMana(props.hero, props.card.cost)
};

const DraggableCard = DnD.DragSource<CardProps>("Card", spec, collect)(Card);

const mapStateToProps = (state: Game) =>
  _.assoc("hero", activeHero(state), state) as Partial<CardProps>;

export default connect(
  mapStateToProps,
  {}
)(DraggableCard) as React.ComponentClass<Partial<CardProps>>;
