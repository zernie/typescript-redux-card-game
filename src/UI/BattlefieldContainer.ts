import { connect } from 'react-redux';
import * as R from 'ramda';
import { Battlefield } from './Battlefield';
import { endTurn } from './turnReducer';

const mapStateToProps = R.pick([
  'activePlayer',
  'board',
  'deck',
  'hand',
  'player',
  'opponent',
  'turn',
]);

export const BattleFieldContainer = connect(mapStateToProps, { endTurn })(
  Battlefield
);
