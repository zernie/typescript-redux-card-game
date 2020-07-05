import data from "./cards.json";
import _ from "lodash/fp";
import { EntityContainer } from "./models/containers/EntityContainer";
import { CardData } from "./models";

export const cards = _.indexBy("id", data) as EntityContainer<CardData>;
