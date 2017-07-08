import * as React from 'react';
import { Segment } from 'semantic-ui-react';
import Hero from './Hero';
import Side from "./Side";

const Board = (props: object) =>
  <Segment.Group>
    <Hero name="Warrior" />

    <Side id="first" color="red" inverted />
    <Side id="second" color="green" inverted />
    <Hero name="Mage" />
  </Segment.Group>;

export default Board;
