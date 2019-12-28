import React from "react";
import {
  isValidTarget,
  Minion as IMinion,
  minionsFromContainer,
  ownerMinions
} from "../../types/Minion";
import { performAttack } from "../../redux/modules/play/characterReducer";
import { useDrag, useDrop } from "react-dnd";
import { CardType } from "../../types/enums";
import { useGame } from "../hooks";
import { canAttack, Character } from "../../types/Character";
import { useDispatch } from "react-redux";
import { MinionContainer } from "../../types/Board";
import Minion from "../components/Minion";

export interface MinionProps {
  character: IMinion;
}

const DnDMinion: React.FC<MinionProps> = ({ character }) => {
  const dispatch = useDispatch();
  const { owner } = character;
  const { play, state } = useGame();
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: [CardType.Minion],
    drop: (source: Character, monitor) => {
      return dispatch(
        performAttack({
          id: character.id,
          source,
          target: character
        })
      );
    },
    canDrop: (target: IMinion) => {
      const enemyMinions = ownerMinions(
        character.owner,
        minionsFromContainer(play)
      ) as MinionContainer;

      return (
        target.owner !== character.owner &&
        isValidTarget(character, enemyMinions)
      );
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const [{ canDrag }, dragRef] = useDrag({
    item: character,
    canDrag: monitor => owner === state.activePlayer && canAttack(character),
    // canDrag: (monitor) => owner === state.activePlayer && canAttack(monitor.getItem() as Character),
    collect: monitor => ({
      canDrag: monitor.canDrag()
    })
  });

  return (
    <div ref={dropRef}>
      <div ref={dragRef}>
        <Minion {...character} active={canDrop || canDrag} />
      </div>
    </div>
  );
};

export default DnDMinion;
