import * as React from 'react';
import { List } from 'semantic-ui-react';
import { Card as CardInterface } from '../Card';
import { State } from '../Game';
import { Hero } from '../Hero';

export interface CardProps {
  card: CardInterface;
  connectDragSource: Function;
  hero: Hero;
  isDragging: boolean;
  state: State;
}

export const Card: React.StatelessComponent<CardProps> = ({
  connectDragSource,
  card: {
    attack,
    cost,
    health,
    name,
    text,
  },
}) =>
  connectDragSource(
    <div className="item">
      <List.Content>
        <List.Header>
          <List.Icon name="child" />
          {name}
        </List.Header>

        <List.Icon name="circle" />
        {cost}
        <br/>
        <List.Icon name="lightning" />
        {attack}
        <br/>
        <List.Icon name="heartbeat" />
        {cost}
        <br/>
        {text}
      </List.Content>
    </div>
  );
