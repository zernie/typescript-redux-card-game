import { connect } from 'react-redux';
// import { toggleEmailWorkflow as handleEmailToggle } from './reducer';
import { head, last } from 'ramda';
import Board from './Board';
import Game from '../Game';

const mapStateToProps = (state: Game) => {
  const { players } = state;

  return { firstPlayer: head(players), secondPlayer: last(players) };
};
const mapDispatchToProps = {
  // handleEmailToggle
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
