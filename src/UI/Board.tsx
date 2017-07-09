import * as React from 'react';
import { Divider, Segment } from 'semantic-ui-react';
import Hero from './Hero';
import Side from './Side';
import { StatelessComponent } from 'react';
import Game from "../Game";

const Board: StatelessComponent<Game> = ({ player, opponent }) =>
  <Segment>
    <Hero {...opponent}/>

    <Side minions={opponent.minions}/>
    <Divider section/>
    <Side minions={player.minions}/>

    <Hero {...player}/>
  </Segment>;

export default Board;
