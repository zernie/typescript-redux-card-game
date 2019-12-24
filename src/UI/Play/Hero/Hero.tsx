import React from "react";
import _ from "lodash/fp";
import { useDrag, useDrop } from "react-dnd";
import { Grid, Header, Segment, Statistic } from "semantic-ui-react";
import { Hero } from "../../../Hero";
import CardArt from "../../CardArt";
import { CardType } from "../../../enums";
import { Player } from "../../../Player";
import { performAttack } from "../characterReducer";
import { useDispatch } from "react-redux";
import { Minion } from "../../../Minion";

export interface HeroProps {
  hero: Hero;
  player: Player;
}
// FIXME+
// {
//   beginDrag: (props, monitor, component) => ({
//     ...props,
//     weapon:
//       props.character.weapon &&
//       (props.entities[props.character.weapon] as Weapon)
//   }),
//     canDrag: (props, monitor: DnD.DragSourceMonitor) =>
//   props.character.owner === props.state.activePlayer &&
//   canAttack(props.character)
// };
// {
//   drop: (props, monitor: DnD.DropTargetMonitor) => {
//     const { character } = monitor.getItem() as MinionProps;
//
//     return props.performAttack({
//       id: props.character.id,
//       source: character,
//       target: props.character
//     });
//   },
//     canDrop: (props, monitor: DnD.DropTargetMonitor) => {
//   const { character, entities } = monitor.getItem() as MinionProps;
//
//   const enemyMinions = ownerMinions(
//     props.character.owner,
//     minionsFromContainer(entities)
//   );
//
//   return (
//     props.character.owner !== character.owner &&
//     isValidTarget(props.character, enemyMinions)
//   );
// }
// };

const HeroComponent: React.FC<HeroProps> = ({
  hero,
  player: { mana, maximumMana }
}) => {
  const { id, armor, cardID, exhausted, name, health, type } = hero;
  const dispatch = useDispatch();
  // FIXME
  const weapon = { attack: 1, durability: 2 };
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [CardType.Minion, CardType.Hero],
    drop: (item: Minion) => {
      return dispatch(
        performAttack({
          id: id,
          source: hero,
          target: hero
        })
      );
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: _.T
    })
  });
  const [collectedProps, drag] = useDrag({
    item: hero
  });

  return (
    <div ref={drop}>
      <div ref={drag}>
        <div className="ui grid">
          <Grid.Column width={4} />
          <Grid.Column width={2} verticalAlign="middle">
            {!!weapon && (
              <Segment circular tertiary={exhausted}>
                <Statistic
                  color="red"
                  value={`${weapon.attack}/${weapon.durability}`}
                  size="tiny"
                />
              </Segment>
            )}
          </Grid.Column>
          <Grid.Column computer={5} tablet={12} mobile={16}>
            <Segment raised={isOver} tertiary={isOver}>
              <Header>{name}</Header>

              <CardArt cardID={cardID} size="tiny" centered />

              <Statistic.Group size="tiny" widths={armor > 0 ? 3 : 2}>
                {armor > 0 && (
                  <Statistic color="blue" value={armor} label="armor" />
                )}
                <Statistic color="green" value={health} label="hp" />

                <Statistic
                  color="blue"
                  value={`${mana}/${maximumMana}`}
                  label="mana"
                  size="tiny"
                />
              </Statistic.Group>
            </Segment>
          </Grid.Column>
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
