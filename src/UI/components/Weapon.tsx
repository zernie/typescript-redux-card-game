import React from "react";
import { Segment, Statistic, Popup } from "semantic-ui-react";
import { Weapon as IWeapon } from "../../models";
import CardArt from "./CardArt";

type WeaponProps = IWeapon & { disabled: boolean };

const Weapon: React.FC<WeaponProps> = ({
  attack,
  cardID,
  disabled,
  health,
  name,
  text
}) => (
  <Segment circular tertiary={disabled}>
    <Popup
      header={name}
      content={
        <div>
          <CardArt cardID={cardID} />

          <p>{text}</p>
        </div>
      }
      trigger={
        <Statistic color="red" value={`${attack}/${health}`} size="tiny" />
      }
    />
  </Segment>
);

export default Weapon;
