import React from "react";
import { useDrag } from "react-dnd";
import { Card as ICard, getActivePlayer, canSpendMana } from "../../models";
import { useGame } from "../hooks";
import { Card, CardBack } from "../components";

export interface CardProps {
  active: boolean;
  card: ICard;
}

export const DnDCard: React.FC<CardProps> = ({ active, card }) => {
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

  if (!active) return <CardBack />;

  return (
    <div ref={drag}>
      <Card card={card} disabled={!canDrag} />
    </div>
  );
};

export default DnDCard;
