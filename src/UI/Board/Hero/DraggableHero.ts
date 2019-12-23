// @ts-nocheck
import React from "react";
import * as DnD from "react-dnd";
import { connect } from "react-redux";
import * as _ from "lodash/fp";
import { performAttack } from "../characterReducer";
import { canAttack } from "../../../Character";
import { CardType } from "../../../enums";
import Hero, { HeroProps } from "./Hero";
import { Game } from "../../../Game";
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

const mapStateToProps = ({state} : Game) => ({state});
const mapStateToProps = (game: Game) => game;

export default connect(
  mapStateToProps,
  { performAttack }
)(Hero) as React.ComponentClass<HeroProps>;
