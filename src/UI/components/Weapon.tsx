import React from "react";
import { Segment, Statistic, Popup } from "semantic-ui-react";
import { Weapon as IWeapon } from "../../models";

type WeaponProps = IWeapon & { disabled: boolean };

const Weapon: React.FC<WeaponProps> = ({
  attack,
  disabled,
  durability,
  name
}) => (
  <Segment circular tertiary={disabled}>
    <Popup
      content={name}
      trigger={
        <Statistic color="red" value={`${attack}/${durability}`} size="tiny" />
      }
    />
  </Segment>
);

export default Weapon;
