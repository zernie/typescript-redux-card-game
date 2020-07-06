import React from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  Hero as IHero,
  CardType,
  Player,
  Character,
  getWeapon,
  canAttack,
  isValidTarget,
  minionsFromContainer,
  ownerMinions,
  Weapon
} from "../../models";
import { performAttack } from "../../redux/modules/play/characterReducer";
import { useGame } from "../hooks";
import { Hero } from "../components";

interface DnDHeroProps {
  active: boolean;
  hero: IHero;
  player: Player;
}

/**
 * Drag & Drop Hero component
 */
const DnDHero: React.FC<DnDHeroProps> = ({ active, hero, player }) => {
  const game = useGame();
  const dispatch = useDispatch();
  const {
    state: { activePlayer }
  } = game;
  const { mana, maximumMana } = player;
  const { weaponID } = hero;
  const [collectedProps, drag] = useDrag({
    item: hero,
    canDrag: (monitor) => hero.owner === activePlayer && canAttack(hero)
  });

  const [{ isOver }, drop] = useDrop({
    accept: [CardType.Minion, CardType.Hero],
    drop: (char: Character) =>
      dispatch(
        performAttack({
          source: char,
          target: hero
        })
      ),
    canDrop: (item: Character, monitor) => {
      const enemyMinions = ownerMinions(
        hero.owner,
        minionsFromContainer(game.play)
      );

      return item.owner !== player.id && isValidTarget(item, enemyMinions);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });
  const weapon = getWeapon(game.play, weaponID) as Weapon;

  return (
    <div ref={drop}>
      <div ref={drag}>
        <Hero
          {...hero}
          active={active}
          isOver={isOver}
          weapon={weapon}
          mana={mana}
          maximumMana={maximumMana}
        />
      </div>
    </div>
  );
};

export default DnDHero;
