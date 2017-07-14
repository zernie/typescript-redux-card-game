import { connect } from 'react-redux';
import Board from './Board';
import Game from '../Game';
import { nextTurn } from './turnReducer';

const mapStateToProps = (state: Game) => {
  const { player, opponent } = state;

  return { player, opponent };
};

export default connect(mapStateToProps, {nextTurn})(Board);
