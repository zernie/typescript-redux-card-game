import React from "react";
import { Button } from "semantic-ui-react";

interface NextTurnProps {
  onClick: Function;
  turn: number;
}

const NextTurn: React.FC<NextTurnProps> = ({ turn, onClick }) => (
  <Button.Group vertical={true} size="large">
    <Button color="green" basic={true}>
      Turn: {turn}
    </Button>

    <Button fluid positive onClick={() => onClick()}>
      Finish
    </Button>
  </Button.Group>
);

export default NextTurn;
