import * as React from 'react';
import { List } from 'semantic-ui-react';
import { WeaponCard as Weapon } from '../../Card';

const WeaponCard = ({
  abilities,
  attack,
  cost,
  durability,
  name,
  text,
}: Weapon) => (
  <div>
    <List.Icon name="lightning" />
    {attack}
    <br />
    <List.Icon name="heartbeat" />
    {durability}
    <br />
    {text}
    <br />

    {abilities.map((ability, i) => <div key={i}>{ability}</div>)}
  </div>
);

export default WeaponCard;
