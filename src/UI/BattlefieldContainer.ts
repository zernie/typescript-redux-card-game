import { connect, MapDispatchToProps } from 'react-redux';
import { Battlefield, BoardPropsActions } from './Battlefield';
import * as R from 'ramda';
import { incTotalMana, restoreMana } from './characterReducer';

const mapStateToProps = R.pick([
  'activePlayer',
  'board',
  'deck',
  'hand',
  'player',
  'opponent',
  'turn',
]);

const mapDispatchToProps: MapDispatchToProps<
  BoardPropsActions,
  {}
> = dispatch => ({
  nextTurn: () => {
    dispatch(incTotalMana({}));
    dispatch(restoreMana({}));
  },
});

export const BattleFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Battlefield);
