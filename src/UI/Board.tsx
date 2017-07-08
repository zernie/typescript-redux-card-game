import * as React from 'react';
import { Segment } from 'semantic-ui-react';
import Player from './Player';
import Side from "./Side";

const Board = (props: object) =>
  <Segment.Group>
    <Player name="Warrior" />

    <Side id="first" color="red" inverted />
    <Side id="second" color="green" inverted />
    <Player name="Mage" />
  </Segment.Group>;

export default Board;
