import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { Grid, Header, Segment, Statistic } from "semantic-ui-react";
import { Hero } from "../../types/Hero";
import CardArt from "../components/CardArt";
import { CardType } from "../../types/enums";
import { Player } from "../../types/Player";
import { performAttack } from "../../redux/modules/play/characterReducer";
import { useDispatch } from "react-redux";
import {
  isValidTarget,
  Minion,
  minionsFromContainer,
  ownerMinions
} from "../../types/Minion";
import { useGame } from "../hooks";
import { getWeapon, Weapon } from "../../types/Weapon";
import { canAttack, Character } from "../../types/Character";

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

const HeroComponent: React.FC<HeroProps> = ({ hero, player }) => {
  const game = useGame();
  const {
    state: { activePlayer }
  } = game;
  const { id, armor, cardID, exhausted, name, health, weaponId } = hero;
  const { mana, maximumMana } = player;
  const dispatch = useDispatch();
  // FIXME
  const [{ isOver }, drop] = useDrop({
    accept: [CardType.Minion, CardType.Hero],
    drop: (item: Minion) => {
      return dispatch(
        performAttack({
          id: item.id,
          source: hero,
          target: item
        })
      );
    },
    canDrop: (item: Character, monitor) => {
      const enemyMinions = ownerMinions(
        hero.owner,
        minionsFromContainer(game.play)
      );

      return item.owner !== player.owner && isValidTarget(item, enemyMinions);
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  });
  const [collectedProps, drag] = useDrag({
    item: hero,
    canDrag: monitor => {
      const item = monitor.getItem() as Character;
      return hero.owner === activePlayer && canAttack(hero);
    }
  });

  const weapon = weaponId && (getWeapon(weaponId, game) as Weapon | null);

  return (
    <div ref={drop}>
      <div ref={drag}>
        <div className="ui grid">
          <Grid.Column width={4} />
          <Grid.Column width={2} verticalAlign="middle">
            {weapon && (
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
            <Segment
              raised={isOver}
              tertiary={isOver}
              style={{ padding: "4px 0" }}
            >
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
