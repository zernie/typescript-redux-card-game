import * as React from 'react';
import { Segment } from 'semantic-ui-react';
import { head, last } from 'ramda';
import Hero from './Hero';
import Side from './Side';
import { PlayersTuple } from '../Game';
import { StatelessComponent } from 'react';

interface BoardProps {
  players: PlayersTuple;
}

const Board: StatelessComponent<BoardProps> = ({ players }) =>
  <Segment.Group>
    <Hero {...last(players)} />

    <Side id="first" color="red" inverted />
    <Side id="second" color="green" inverted />

    <Hero {...head(players)} />
  </Segment.Group>;

export default Board;
