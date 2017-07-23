import { connect } from 'react-redux';
import { Battlefield } from './Battlefield';
import { nextTurn } from './turnReducer';
import * as R from 'ramda';

const mapStateToProps = R.pick([
  'activePlayer',
  'board',
  'deck',
  'hand',
  'player',
  'opponent',
  'turn',
]);

export const BattleFieldContainer = connect(mapStateToProps, { nextTurn })(
  Battlefield
);
