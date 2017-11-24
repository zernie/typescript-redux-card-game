import * as React from 'react';
import { ModalProps, Modal } from 'semantic-ui-react';
import { Hero } from '../Hero';
import { PlayState } from '../enums';

export type EndGameScreenProps = ModalProps & {
  player: Hero;
  opponent: Hero;
};

const endGameHeader = (player: Hero, opponent: Hero): string => {
  if (
    player.playState === PlayState.Lost &&
    opponent.playState === PlayState.Lost
  ) {
    return 'It\'s a draw!';
  }

  if (player.playState === PlayState.Lost) {
    return `${opponent.name} has won!`;
  }
  if (opponent.playState === PlayState.Lost) {
    return `${player.name} has won!`;
  }

  return 'This shouldn\'t have happened';
};

const EndGameScreen: React.StatelessComponent<EndGameScreenProps> = ({
  player,
  opponent,
  ...props,
}) => (
  <Modal {...props}>
    <Modal.Header>{endGameHeader(player, opponent)}</Modal.Header>
    <Modal.Content />
  </Modal>
);

export default EndGameScreen;
