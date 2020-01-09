import { Label, List } from "semantic-ui-react";
import React from "react";
import { Ability } from "../../models";

interface AbilitiesProps {
  list: Ability[];
}

const AbilityList: React.FC<AbilitiesProps> = ({ list }) => {
  if (!list.length) return null;
  return (
    <div>
      <List verticalAlign="bottom">
        {list.map((ability, i) => (
          <List.Item key={i}>
            <Label color={"black"} horizontal>
              {ability}
            </Label>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default AbilityList;
