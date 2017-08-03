import { connect } from 'react-redux';
import * as R from 'ramda';
import { Battlefield } from './Battlefield';
import { nextTurn } from './turnReducer';

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
