import * as React from 'react';
import { List } from 'semantic-ui-react';
import { Card as CardInterface } from '../Card';
import { State } from '../Game';

export interface CardProps {
  state: State;
  connectDragSource: Function;
  isDragging: boolean;
  card: CardInterface;
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
