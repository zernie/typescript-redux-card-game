import React from "react";
import { Label, List, Segment } from "semantic-ui-react";
import { AbilityList, CardArt } from "./index";
import { Card as ICard, isMinion, isWeapon } from "../../types";

type CardProps = {
  card: ICard;
  disabled?: boolean;
};

const Card: React.FC<CardProps> = ({ card, disabled = false }) => {
  const { attack, cardID, cost, name } = card;

  return (
    <div>
      <List.Header>{name}</List.Header>

      <Segment compact size="tiny" basic vertical disabled={disabled}>
        <CardArt alt={name} cardID={cardID} size="tiny" centered />

        <Label attached={"top left"} circular size="large" color="blue">
          {cost}
        </Label>

        <Label attached={"bottom left"} circular size="large">
          {attack}
        </Label>
        <Label attached={"bottom right"} circular size="large">
          {isMinion(card) && card.maxHealth}
          {isWeapon(card) && card.durability}
        </Label>
      </Segment>

      <br />

      <AbilityList list={card.abilities} />
    </div>
  );
};

export default Card;
