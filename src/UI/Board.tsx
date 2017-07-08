import * as React from 'react';
import { Segment } from 'semantic-ui-react';
import Hero from './Hero';
import Side from './Side';
import { StatelessComponent } from 'react';
import Player from "../Player";

interface BoardProps {
  firstPlayer: Player;
  secondPlayer: Player;
}

const Board: StatelessComponent<BoardProps> = ({ firstPlayer, secondPlayer }) =>
  <Segment.Group>
    <Hero {...secondPlayer}/>

    <Side minions={secondPlayer.minions}/>
    <Side minions={firstPlayer.minions}/>

    <Hero {...firstPlayer}/>
  </Segment.Group>;

export default Board;
