import { connect } from 'react-redux';
import Board from './Board';
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

export default connect(mapStateToProps, { nextTurn })(Board);
