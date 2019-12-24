import React from "react";
import { Label, List, Segment, Transition } from "semantic-ui-react";
import Sleep from "./Sleep";
import CardArt from "../CardArt";
import { Minion as IMinion } from "../../Minion";

interface MinionProps extends IMinion {
  active: boolean;
}

const Minion: React.FC<MinionProps> = ({
  active,
  abilities,
  attack,
  cardID,
  exhausted,
  health,
  maxHealth,
  name
}) => (
  <div>
    <Segment disabled={!active} compact size="tiny" basic vertical>
      <Transition visible={exhausted} animation="fade up" duration="800">
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

    {/* TODO: extract component */}
    <List.List>
      {abilities.map((ability, i) => (
        <List.Item key={i}>
          <Label color={"black"} horizontal>
            {ability}
          </Label>
        </List.Item>
      ))}
    </List.List>
  </div>
);

export default Minion;
