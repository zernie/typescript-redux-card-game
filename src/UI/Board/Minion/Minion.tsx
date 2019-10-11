import React from "react";
import { Label, List, Segment, Transition } from "semantic-ui-react";
import { Minion } from "../../../Minion";
import { State } from "../../../Game";
import { performAttack } from "../characterReducer";
import CardArt from "../../CardArt";
import { EntityContainer } from "../../../Entity";

export interface MinionProps {
  canDrop: boolean;
  canDrag: boolean;
  character: Minion;
  connectDragSource: Function;
  connectDropTarget: Function;
  entities: EntityContainer;
  isOver: boolean;
  performAttack: typeof performAttack;
  state: State;
}

const ZZZ: React.FunctionComponent<{}> = () => (
  <span>
    z
    <sup>
      z<sup>z</sup>
    </sup>
  </span>
);

const MinionComponent: React.FunctionComponent<MinionProps> = ({
  canDrop,
  canDrag,
  character: { abilities, attack, cardID, exhausted, health, maxHealth, name },
  connectDragSource,
  connectDropTarget
}) =>
  connectDropTarget(
    connectDragSource(
      <div>
        <Segment
          disabled={!(canDrop || canDrag)}
          compact
          size="tiny"
          basic
          vertical
        >
          <Transition visible={exhausted} animation="fade up" duration="800">
            <Label floating circular size="large" color="green">
              <ZZZ />
            </Label>
          </Transition>

          <CardArt alt={name} cardID={cardID} size="tiny" />

          <Label attached={"bottom left"} circular size="large">
            {attack}
          </Label>
          <Label
            attached={"bottom right"}
            color={health < maxHealth ? "red" : undefined}
            circular
            size="large"
          >
            {health}
          </Label>
        </Segment>

        {/* TODO: extract component */}
        <List.List>
          {abilities.map((ability, i) => (
            <List.Item>
              <Label key={i} color={"black"} horizontal>
                {ability}
              </Label>
            </List.Item>
          ))}
        </List.List>
      </div>
    )
  );

export default MinionComponent;
