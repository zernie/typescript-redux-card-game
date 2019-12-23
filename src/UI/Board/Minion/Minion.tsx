import React from "react";
import { Label, List, Segment, Transition } from "semantic-ui-react";
import _ from "lodash/fp";
import { getMinions, isValidTarget, Minion as IMinion, ownerMinions } from '../../../Minion';
import { performAttack } from "../characterReducer";
import CardArt from "../../CardArt";
import { useDrag, useDrop } from "react-dnd";
import { CardType } from "../../../enums";
import { useGame } from "../../hooks";
import { canAttack, Character } from '../../../Character';
import { useDispatch } from 'react-redux';
import { MinionContainer } from '../../../Board';

export interface MinionProps {
  character: IMinion;
}

const ZZZ: React.FC = () => (
  <span>
    z
    <sup>
      z<sup>z</sup>
    </sup>
  </span>
);

const Minion: React.FC<MinionProps> = ({ character }) => {
  const dispatch = useDispatch();
  const {
    abilities,
    attack,
    cardID,
    id,
    exhausted,
    health,
    maxHealth,
    name,
    type,
    owner
  } = character;
  const { entities, state } = useGame();
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: [CardType.Minion],
    drop: (props, monitor) => {
      const item = monitor.getItem() as Character;
      console.log(props, item)

      // TODO: fixme
      return dispatch(performAttack({
        id: character.id,
        source: character,
        target: character
      }));
    },
    canDrop: (target: IMinion) => {
      const enemyMinions = ownerMinions(
        character.owner,
        getMinions(entities)
      );

      return (
        target.owner !== character.owner && isValidTarget(character, enemyMinions as MinionContainer)
      );
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const [{ canDrag }, dragRef] = useDrag({
    item: character,
    canDrag: (monitor) => owner === state.activePlayer && canAttack(character),
    collect: monitor => ({
      canDrag: monitor.canDrag()
    })
  });

  return (
    <div ref={dropRef}>
      <div ref={dragRef}>
        <div>
          <Segment
            disabled={!(canDrop || canDrag)}
            compact
            size="tiny"
            basic
            vertical
          >
            <Transition visible={exhausted} animation="fade up" duration="800">
              <Label floating circular size="large" color="green">
                <ZZZ />
              </Label>
            </Transition>

            <CardArt alt={name} cardID={cardID} size="tiny" />

            <Label attached={"bottom left"} circular size="large">
              {attack}
            </Label>
            <Label
              attached={"bottom right"}
              color={health < maxHealth ? "red" : undefined}
              circular
              size="large"
            >
              {health}
            </Label>
          </Segment>

          {/* TODO: extract component */}
          <List.List>
            {abilities.map((ability, i) => (
              <List.Item key={i}>
                <Label color={"black"} horizontal>
                  {ability}
                </Label>
              </List.Item>
            ))}
          </List.List>
        </div>
      </div>
    </div>
  );
};

export default Minion;
