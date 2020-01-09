import React from "react";
import { Segment, SemanticCOLORS, Statistic } from "semantic-ui-react";
import _ from "lodash/fp";
import { CardContainer } from "../../models";

export interface SideProps {
  deck: CardContainer;
}

const deckColor = (deck: CardContainer): SemanticCOLORS =>
  _.size(deck) > 0 ? "blue" : "red";

const Deck: React.FC<SideProps> = ({ deck }) => (
  <Segment basic>
    <Statistic color={deckColor(deck)} value={_.size(deck)} label="Cards" />
  </Segment>
);

export default Deck;
