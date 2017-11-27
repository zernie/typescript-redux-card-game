import * as React from 'react';
import { ModalProps, Modal, Transition } from 'semantic-ui-react';
import { Hero } from '../Hero';
import { PlayState } from '../enums';

export type EndGameScreenProps = ModalProps & {
  player: Hero;
  opponent: Hero;
  open: boolean;
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
  open,
  ...props,
}) => (
  <Transition animation={'fade up'} duration={500} visible={open}>
    <Modal {...props} open={open}>
      <Modal.Header>{endGameHeader(player, opponent)}</Modal.Header>
      <Modal.Content />
    </Modal>
  </Transition>
);

export default EndGameScreen;
