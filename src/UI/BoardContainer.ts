import { connect } from 'react-redux';
// import { toggleEmailWorkflow as handleEmailToggle } from './reducer';
import Board from './Board';
import Game from '../Game';

const mapStateToProps = (state: Game) => {
  const { player, opponent } = state;

  return { player, opponent };
};
const mapDispatchToProps = {
  // handleEmailToggle
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
