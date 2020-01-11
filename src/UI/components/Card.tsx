import React from "react";
import { Label, List, Popup, Segment } from "semantic-ui-react";
import { AbilityList, CardArt } from "./index";
import { Card as ICard, isMinion, isWeapon } from "../../models";

interface CardProps {
  active?: boolean;
  card: ICard;
}

const Card: React.FC<CardProps> = ({ card, active = true }) => {
  const { attack, cardID, cost, name, text } = card;

  return (
    <Popup
      trigger={
        <div>
          <List.Header>{name}</List.Header>

          <Segment basic vertical disabled={!active}>
            <CardArt alt={name} cardID={cardID} size="tiny" centered />

            <Label attached={"top left"} circular size="large" color="blue">
              {cost}
            </Label>

            <Label attached={"bottom left"} circular size="large">
              {attack}
            </Label>
            <Label attached={"bottom right"} circular size="large">
              {isMinion(card) && card.maxHealth}
              {isWeapon(card) && card.health}
            </Label>
          </Segment>
        </div>
      }
      content={
        <div>
          <h4>{name}</h4>
          <p>{text}</p>
          <AbilityList list={card.abilities} />
        </div>
      }
    />
  );
};

export default Card;
