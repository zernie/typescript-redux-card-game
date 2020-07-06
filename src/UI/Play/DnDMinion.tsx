import React from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  canAttack,
  CardType,
  Character,
  isValidTarget,
  Minion as IMinion,
  MinionContainer,
  minionsFromContainer,
  ownerMinions
} from "../../models";
import { performAttack } from "../../redux/modules/play/characterReducer";
import { useGame } from "../hooks";
import { Minion } from "../components/";

export interface MinionProps {
  character: IMinion;
}

/**
 * Drag & Drop Minion component
 */
const DnDMinion: React.FC<MinionProps> = ({ character }) => {
  const dispatch = useDispatch();
  const { play, state } = useGame();
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: [CardType.Minion, CardType.Hero],
    drop: (source: Character, monitor) =>
      dispatch(
        performAttack({
          source,
          target: character
        })
      ),
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
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const [{ canDrag }, dragRef] = useDrag({
    item: character,
    canDrag: (monitor) =>
      character.owner === state.activePlayer && canAttack(character),
    collect: (monitor) => ({
      canDrag: monitor.canDrag()
    })
  });

  return (
    <div ref={dropRef}>
      <div ref={dragRef}>
        <Minion {...character} active={canDrop || canDrag} isOver={isOver} />
      </div>
    </div>
  );
};

export default DnDMinion;
