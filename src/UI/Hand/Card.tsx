import * as React from 'react';
import { List } from 'semantic-ui-react';
import { Card as CardInterface,  } from '../../Card';
import { State } from '../../Game';
import { Hero } from '../../Hero';
import MinionCard from './MinionCard';
import WeaponCard from './WeaponCard';
import { CardType } from '../../enums';

export interface CardProps {
  card: CardInterface;
  connectDragSource: Function;
  hero: Hero;
  isDragging: boolean;
  state: State;
}

const cardComponent = (card: CardInterface) =>
  card.type === CardType.Minion ? (
    <MinionCard {...card} />
  ) : (
    <WeaponCard {...card} />
  );

export const Card: React.StatelessComponent<CardProps> = ({
  connectDragSource,
  card,
}) =>
  connectDragSource(
    <div className="item">
      <List.Content>
        <List.Header>
          <List.Icon name="child" />
          {card.name}
        </List.Header>

        <List.Icon name="circle" />
        {card.cost}
        <br />

        {cardComponent(card)}
      </List.Content>
    </div>
  );
