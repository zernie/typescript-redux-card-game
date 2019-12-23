import React from "react";
import _ from "lodash/fp";
import { useDrag, useDrop } from "react-dnd";
import { Grid, Header, Segment, Statistic } from "semantic-ui-react";
import { Hero } from "../../../Hero";
import CardArt from "../../CardArt";
import { playCard } from "../../Hand/handReducer";
import { BattlefieldProps } from "../../Battlefield";
import { CardType } from "../../../enums";
import { useGame } from "../../hooks";
import { Player } from "../../../Player";

export interface HeroProps {
  hero: Hero;
  player: Player;
}

const HeroComponent: React.FC<HeroProps> = ({
  hero: { id, armor, cardID, exhausted, name, health, type },
  player: { mana, maximumMana }
}) => {
  const game = useGame();
  // FIXME
  const weapon = { attack: 1, durability: 2 };
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [CardType.Minion, CardType.Weapon],
    drop: (props, monitor) => {
      const { card } = monitor.getItem() as BattlefieldProps;

      return playCard(card);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: _.T
    })
  });
  const [collectedProps, drag] = useDrag({
    item: { id, type }
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
