import * as React from 'react';
import { Label, List, Segment } from 'semantic-ui-react';
import { Card as CardInterface } from '../../Card';
import { State } from '../../Game';
import { Hero } from '../../Hero';
import { CardType } from '../../enums';
import CardArt from '../CardArt';

export interface CardProps {
  card: CardInterface;
  connectDragSource: Function;
  hero: Hero;
  isDragging: boolean;
  state: State;
}

export const Card: React.StatelessComponent<CardProps> = ({
  connectDragSource,
  card,
}) =>
  connectDragSource(
    <div>
      <List.Header>{card.name}</List.Header>

      <Segment compact size="tiny" basic vertical>
        <CardArt alt={name} cardID={card.cardID} size="tiny" centered />

        <Label attached={'top left'} circular size="large" color="blue">
          {card.cost}
        </Label>

        <Label attached={'bottom left'} circular size="large">
          {card.attack}
        </Label>
        <Label attached={'bottom right'} circular size="large">
          {card.type === CardType.Minion && card.maxHealth}
          {card.type === CardType.Weapon && card.durability}
        </Label>
      </Segment>

      <br />

      {/* TODO: extract component */}
      {!!card.abilities && (
        <List verticalAlign="bottom">
          {card.abilities.map((ability, i) => (
            <List.Item>
              <Label key={i} color={'black'} horizontal>
                {ability}
              </Label>
            </List.Item>
          ))}
        </List>
      )}
    </div>
  );
