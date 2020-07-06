import characterReducer from "./characterReducer";
import {
  EntityContainer,
  makeEntityContainer
} from "../../../models/containers";
import { attackCharacter, dealDamage, exhaust } from "./actions";
import { Hero, importCard, Zone } from "../../../models";
import { cards } from "../../../cards";
import { nextTurn } from "../gameStateReducer";

describe("characterReducer", () => {
  it("should handle EXHAUST", () => {
    const minion = importCard(cards["CS2_173"], Zone.Play, 0);
    const state: EntityContainer = makeEntityContainer([minion]);

    const result = characterReducer(state, exhaust({ id: minion.id }));
    expect(result[minion.id].exhausted).toBeTruthy();
  });

  it("should handle ATTACK_CHARACTER", () => {
    const minion = importCard(cards["CS2_173"], Zone.Play, 0);
    const state: EntityContainer = makeEntityContainer([minion]);

    const result = characterReducer(state, attackCharacter({ id: minion.id }));
    expect(result[minion.id].attacksPerformed).toEqual(1);
  });

  it("should handle DEAL_DAMAGE", () => {
    const minion = importCard(cards["CS2_173"], Zone.Play, 0);
    const hero = importCard(cards["HERO_01"], Zone.Play, 0) as Hero;
    hero.armor = 1;
    const state: EntityContainer = makeEntityContainer([minion, hero]);

    const result = characterReducer(
      state,
      dealDamage({ amount: 5, id: [minion.id, hero.id] })
    );
    expect(result[minion.id].health).toEqual(-4);
    expect(result[minion.id].destroyed).toBeTruthy();

    expect(result[hero.id].health).toEqual(26);
    expect(result[hero.id].destroyed).toBeFalsy();
  });

  it("should handle NEXT_TURN", () => {
    const minion = importCard(cards["CS2_173"], Zone.Play, 0);
    minion.attacksPerformed = 1;
    minion.exhausted = true;
    const state: EntityContainer = makeEntityContainer([minion]);

    const result = characterReducer(state, nextTurn());
    expect(result[minion.id].exhausted).toBeFalsy();
    expect(result[minion.id].attacksPerformed).toEqual(0);
  });
});
