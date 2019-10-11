import * as React from "react";
import * as DnD from "react-dnd";
import { connect } from "react-redux";
import * as _ from "lodash/fp";
import { performAttack } from "../characterReducer";
import { canAttack } from "../../../Character";
import { CardType } from "../../../enums";
import { HeroProps } from "./Hero";
import TargetableHero from "./TargetableHero";
import { Weapon } from "../../../Weapon";

const collect: DnD.DragSourceCollector = (connector, monitor) => ({
  connectDragSource: connector.dragSource()
});

const spec: DnD.DragSourceSpec<HeroProps> = {
  beginDrag: (props, monitor, component) => ({
    ...props,
    weapon:
      props.character.weapon &&
      (props.entities[props.character.weapon] as Weapon)
  }),
  canDrag: (props, monitor: DnD.DragSourceMonitor) =>
    props.character.owner === props.state.activePlayer &&
    canAttack(props.character)
};

const DraggableHero = DnD.DragSource<HeroProps>(CardType.Hero, spec, collect)(
  TargetableHero
);

const mapStateToProps = _.pick(["state"]);

export default connect(
  mapStateToProps,
  { performAttack }
)(DraggableHero) as React.ComponentClass<Partial<HeroProps>>;
