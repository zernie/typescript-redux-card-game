import { createAction, createReducer } from "redux-starter-kit";
// import _ from 'lodash/fp';
import { CardContainer } from "../../Card";
import { Zone } from "../../enums";

export const drawCard = createAction<number>("DRAW_CARD");

const drawCardHandler = (
  state: CardContainer,
  action
  // ): CardContainer => { state[action.payload].zone = Zone.Hand };
): void => {
  state[action.payload].zone = Zone.Hand;
};

export default createReducer(undefined, {
  [drawCard]: drawCardHandler
});
