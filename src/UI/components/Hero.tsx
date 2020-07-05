import React from "react";
import { Grid, Header, Segment, Statistic } from "semantic-ui-react";
import { Hero as IHero, Weapon as IWeapon } from "../../models";
import CardArt from "./CardArt";
import Weapon from "./Weapon";

interface HeroProps extends IHero {
  active: boolean;
  isOver: boolean;
  weapon: IWeapon | null;
  mana: number;
  maximumMana: number;
}

const Hero: React.FC<HeroProps> = ({
  active,
  exhausted,
  isOver,
  name,
  cardID,
  armor,
  health,
  mana,
  maximumMana,
  weapon
}) => (
  <Grid>
    <Grid.Column width={4} />
    <Grid.Column width={2} verticalAlign="middle">
      {weapon && <Weapon {...weapon} disabled={exhausted} />}
    </Grid.Column>
    <Grid.Column computer={5} tablet={12} mobile={16}>
      <Segment
        raised={isOver}
        tertiary={isOver || !active}
        style={{ padding: "4px 0" }}
      >
        <Header>{name}</Header>

        <CardArt cardID={cardID} size="tiny" centered />

        <Statistic.Group size="tiny" widths={armor > 0 ? 3 : 2}>
          {armor > 0 && <Statistic color="blue" value={armor} label="armor" />}
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
  </Grid>
);

export default Hero;
