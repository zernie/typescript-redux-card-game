import { connect } from 'react-redux';
import { Battlefield } from './Battlefield';
import { nextTurn } from './turnReducer';
import { pick } from 'ramda';

const mapStateToProps = pick([
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
