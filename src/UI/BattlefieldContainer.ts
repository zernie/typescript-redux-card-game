import { connect } from 'react-redux';
import * as R from 'ramda';
import { Battlefield } from './Battlefield';
import { endTurn } from './gameStateReducer';
import { Game } from '../Game';

const mapStateToProps = R.pick<Game, keyof Game>([
  'board',
  'deck',
  'hand',
  'player',
  'opponent',
  'state',
]);

export const BattleFieldContainer = connect(mapStateToProps, { endTurn })(
  Battlefield
);
