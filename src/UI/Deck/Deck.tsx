import * as React from "react";
import { Segment, Statistic } from "semantic-ui-react";
import _ from "lodash/fp";
import { CardContainer } from "../../Card";
import { SemanticCOLORS } from "semantic-ui-react";

export interface SideProps {
  deck: CardContainer;
}

const deckColor = (deck: CardContainer): SemanticCOLORS =>
  _.size(deck) > 0 ? "blue" : "red";

const Deck: React.FunctionComponent<SideProps> = ({ deck }) => (
  <Segment basic>
    <Statistic color={deckColor(deck)} value={_.size(deck)} label="Cards" />
  </Segment>
);

export default Deck;
