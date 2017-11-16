import * as React from 'react';
import { List } from 'semantic-ui-react';
import { MinionCard } from '../../Card';

const MinionCard = ({
  abilities,
  attack,
  cost,
  maxHealth,
  name,
  text,
}: MinionCard) => (
  <div>
    <List.Icon name="lightning" />
    {attack}
    <br />
    <List.Icon name="heartbeat" />
    {maxHealth}
    <br />
    {text}
    <br />

    {abilities.map((ability, i) => <div key={i}>{ability}</div>)}
  </div>
);

export default MinionCard;
