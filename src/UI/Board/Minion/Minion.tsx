import React from "react";
import { Label, List, Segment, Transition } from "semantic-ui-react";
import _ from "lodash/fp";
import { Minion as IMinion } from "../../../Minion";
import { performAttack } from "../characterReducer";
import CardArt from "../../CardArt";
import { useDrag, useDrop } from "react-dnd";
import { CardType } from "../../../enums";
import { BattlefieldProps } from "../../Battlefield";
import { playCard } from "../../Hand/handReducer";
import { useGame } from "../../hooks";
import { canAttack } from "../../../Character";

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
  const { state } = useGame();
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: [CardType.Minion, CardType.Weapon],
    drop: (props, monitor) => {
      const { card } = monitor.getItem(); // as BattlefieldProps;

      return playCard(card);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: _.T
    })
  });
  const [{ canDrag }, dragRef] = useDrag({
    item: { id, type },
    // canDrag: (monitor) => owner === state.activePlayer && canAttack(character),
    collect: monitor => ({
      canDrag: owner === state.activePlayer && canAttack(character)
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
