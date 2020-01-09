import React from "react";
import { Label, Popup, Segment, Transition } from "semantic-ui-react";
import Sleep from "./Sleep";
import CardArt from "./CardArt";
import { Minion as IMinion } from "../../models";
import AbilityList from "./AbilityList";

interface MinionProps extends IMinion {
  active: boolean;
  isOver: boolean;
}

const Minion: React.FC<MinionProps> = ({
  active,
  abilities,
  attack,
  cardID,
  exhausted,
  isOver,
  health,
  maxHealth,
  name,
  text
}) => (
  <Popup
    header={name}
    content={text}
    trigger={
      <div>
        <Segment disabled={!active} compact size="tiny" basic vertical>
          <Transition visible={exhausted} animation="fade up" duration="1500">
            <Label floating circular size="large" color="green">
              <Sleep />
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

        <AbilityList list={abilities} />
      </div>
    }
  />
);

export default Minion;
