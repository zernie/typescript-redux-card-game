import React from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  Hero as IHero,
  CardType,
  Player,
  getWeapon,
  Weapon,
  canAttack,
  Character,
  isValidTarget,
  minionsFromContainer,
  ownerMinions
} from "../../types";
import { performAttack } from "../../redux/modules/play/characterReducer";
import { useGame } from "../hooks";
import { Hero } from "../components";

interface DnDHeroProps {
  hero: IHero;
  player: Player;
}

/**
 * Drag & Drop Hero component
 */
const DnDHero: React.FC<DnDHeroProps> = ({ hero, player }) => {
  const game = useGame();
  const dispatch = useDispatch();
  const {
    state: { activePlayer }
  } = game;
  const { mana, maximumMana } = player;
  const { weaponID } = hero;
  const [collectedProps, drag] = useDrag({
    item: hero,
    canDrag: monitor => {
      const item = monitor.getItem() as Character;
      return hero.owner === activePlayer && canAttack(hero);
    }
  });

  const [{ isOver }, drop] = useDrop({
    accept: [CardType.Minion, CardType.Hero],
    drop: (char: Character) => {
      return dispatch(
        performAttack({
          id: hero.id,
          source: char,
          target: hero
        })
      );
    },
    canDrop: (item: Character, monitor) => {
      const enemyMinions = ownerMinions(
        hero.owner,
        minionsFromContainer(game.play)
      );

      return item.owner !== player.id && isValidTarget(item, enemyMinions);
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  });
  const weapon = (weaponID && getWeapon(weaponID, game)) as Weapon | null;

  return (
    <div ref={drop}>
      <div ref={drag}>
        <Hero
          {...hero}
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
