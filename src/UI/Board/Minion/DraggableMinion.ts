import * as React from "react";
import * as DnD from "react-dnd";
import { connect } from "react-redux";
import * as _ from "lodash/fp";
import { canAttack } from "../../../Character";
import { CardType } from "../../../enums";
import { MinionProps } from "./Minion";
import TargetableMinion from "./TargetableMinion";
import { performAttack } from "../characterReducer";

const collect: DnD.DragSourceCollector = (connector, monitor) => ({
  connectDragSource: connector.dragSource(),
  canDrag: monitor.canDrag()
});

const spec: DnD.DragSourceSpec<MinionProps> = {
  beginDrag: (props, monitor, component) => props,
  canDrag: (props, monitor: DnD.DragSourceMonitor) =>
    props.character.owner === props.state.activePlayer &&
    canAttack(props.character)
};

const DraggableMinion = DnD.DragSource<MinionProps>(
  CardType.Minion,
  spec,
  collect
)(TargetableMinion);

const mapStateToProps = _.pick(["state", "entities"]);

export default connect(
  mapStateToProps,
  { performAttack }
)(DraggableMinion) as React.ComponentClass<Partial<MinionProps>>;
