import actionCreatorFactory from 'typescript-fsa';
import { upcastingReducer } from 'typescript-fsa-reducers';
import * as R from 'ramda';
import { canSpendMana, Hero, reduceArmor, reduceHealth } from '../../../Hero';
import {
  attackCharacter,
  CharacterPayload,
  dealDamage,
  SourceTargetPayload,
} from '../actions';
import { Character } from '../../../Character';
import { Weapon } from '../../../Weapon';

const actionCreator = actionCreatorFactory();

type GainManaPayload = CharacterPayload<{
  amount?: number;
}>;
type SpendManaPayload = CharacterPayload<{
  amount: number;
}>;
type EquipWeaponPayload = CharacterPayload<{
  weapon: Weapon;
}>;

const attackCharacterHandler = R.evolve<Hero>({
  attacksPerformed: R.inc,
  weapon: { durability: R.dec },
});
export const equipWeapon = actionCreator<EquipWeaponPayload>('EQUIP_WEAPON');
export const gainMana = actionCreator<GainManaPayload>('GAIN_MANA');
export const restoreMana = actionCreator<CharacterPayload>('RESTORE_MANA');
export const spendMana = actionCreator<SpendManaPayload>('SPEND_MANA');

const maximumManaLens = R.lensProp<number, Hero>('maximumMana');
const manaLens = R.lensProp<number, Hero>('mana');

const equipWeaponHandler = (state: Hero, payload: EquipWeaponPayload) =>
  R.merge<Hero, {}>(state, { attack: payload.weapon.attack, weapon: payload.weapon });

const gainManaHandler = (state: Hero, payload: GainManaPayload) =>
  state.maximumMana < 10
    ? R.over(maximumManaLens, R.add(payload.amount || 1), state)
    : state;

const restoreManaHandler = (state: Hero) =>
  R.set(manaLens, R.view(maximumManaLens, state), state);

const spendManaHandler = (state: Hero, payload: SpendManaPayload) =>
  canSpendMana(state, payload.amount)
    ? R.set(manaLens, state.mana - payload.amount, state)
    : state;

const damageHeroHandler = (state: Hero, payload: SourceTargetPayload): Hero => {
  const health = reduceHealth(state, payload.source.attack);

  return R.merge(state, {
    armor: reduceArmor(state, payload.source.attack),
    destroyed: health <= 0,
    health: health,
  });
};

export default upcastingReducer<Hero, Character>()
  .case(attackCharacter, attackCharacterHandler)
  .case(equipWeapon, equipWeaponHandler)
  .case(gainMana, gainManaHandler)
  .case(restoreMana, restoreManaHandler)
  .case(spendMana, spendManaHandler)
  .case(dealDamage, damageHeroHandler);
