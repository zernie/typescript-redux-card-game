import React from "react";
import { Segment, Statistic } from "semantic-ui-react";
import { Weapon as IWeapon } from "../../types";

type WeaponProps = IWeapon & { disabled: boolean };

const Weapon: React.FC<WeaponProps> = ({ attack, disabled, durability }) => (
  <Segment circular tertiary={disabled}>
    <Statistic color="red" value={`${attack}/${durability}`} size="tiny" />
  </Segment>
);

export default Weapon;
