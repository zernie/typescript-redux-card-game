import React from "react";
import { Modal, ModalProps, Transition } from "semantic-ui-react";
import { PlayState } from "../enums";
import { Player } from "../Player";

export type EndGameScreenProps = ModalProps & {
  player: Player;
  opponent: Player;
  open: boolean;
};

const endGameHeader = (player: Player, opponent: Player): string => {
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

const EndGameScreen: React.FunctionComponent<EndGameScreenProps> = ({
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
