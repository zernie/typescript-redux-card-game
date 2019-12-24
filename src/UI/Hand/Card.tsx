import React from "react";
import { Label, List, Segment } from "semantic-ui-react";
import { Card as ICard } from "../../Card";
import { getActivePlayer } from "../../Hero";
import { CardType } from "../../enums";
import CardArt from "../CardArt";
import { useDrag } from "react-dnd";
import { useGame } from "../hooks";
import { canSpendMana } from "../../Player";
import AbilityList from "../components/AbilityList";
import CardBack from "../components/CardBack";

export interface CardProps {
  active: boolean;
  card: ICard;
}

export const Card: React.FC<CardProps> = ({active, card }) => {
  const game = useGame();
  const player = getActivePlayer(game);
  const [{ canDrag }, drag] = useDrag({
    item: card,
    canDrag: monitor =>
      card.owner === game.state.activePlayer && canSpendMana(player, card.cost),
    collect: monitor => ({
      canDrag: monitor.canDrag()
    })
  });

  if (!active) return <CardBack/>

  return (
    <div ref={drag}>
      <List.Header>{card.name}</List.Header>

      <Segment compact size="tiny" basic vertical>
        <CardArt alt={card.name} cardID={card.cardID} size="tiny" centered />

        <Label attached={"top left"} circular size="large" color="blue">
          {card.cost}
        </Label>

        <Label attached={"bottom left"} circular size="large">
          {card.attack}
        </Label>
        <Label attached={"bottom right"} circular size="large">
          {card.type === CardType.Minion && card.maxHealth}
          {card.type === CardType.Weapon && card.durability}
        </Label>
      </Segment>

      <br />

      <AbilityList list={card.abilities}/>
    </div>
  );
};

export default Card;
