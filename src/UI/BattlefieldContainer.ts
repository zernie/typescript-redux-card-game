import { connect } from 'react-redux';
import * as R from 'ramda';
import { Battlefield } from './Battlefield';
import { endTurn } from './turnReducer';
import { Game } from '../Game';

const mapStateToProps = R.pick<Game, keyof Game>([
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
