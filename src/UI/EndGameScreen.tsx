import React from 'react';
import { Modal, ModalProps, Transition } from 'semantic-ui-react';
import { Hero } from '../Hero';

export type EndGameScreenProps = ModalProps & {
  player: Hero;
  opponent: Hero;
  open: boolean;
};

// FIXME
const endGameHeader = (player: Hero, opponent: Hero): string => {
  return "FINISH";
  // if (
  //   player.playState === PlayState.Lost &&
  //   opponent.playState === PlayState.Lost
  // ) {
  //   return "It's a draw!";
  // }
  //
  // if (player.playState === PlayState.Lost) {
  //   return `${opponent.name} has won!`;
  // }
  // if (opponent.playState === PlayState.Lost) {
  //   return `${player.name} has won!`;
  // }
  //
  // throw new Error("This shouldn't have happened");
};

const EndGameScreen: React.FC<EndGameScreenProps> = ({
  player,
  opponent,
  open,
  ...props
}) => (
  <Transition animation={"fade up"} duration={1500} visible={open}>
    <Modal {...props} open={open}>
      <Modal.Header>{endGameHeader(player, opponent)}</Modal.Header>
      <Modal.Content />
    </Modal>
  </Transition>
);

export default EndGameScreen;
