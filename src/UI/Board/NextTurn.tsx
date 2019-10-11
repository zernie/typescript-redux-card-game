import * as React from "react";
import { Button } from "semantic-ui-react";

interface NextTurnProps {
  onClick: Function;
}

const NextTurn: React.FunctionComponent<NextTurnProps> = ({ onClick }) => (
  <Button fluid positive onClick={() => onClick()}>
    Finish
  </Button>
);

export default NextTurn;
