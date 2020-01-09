import React from "react";
import { Modal, ModalProps, Transition } from "semantic-ui-react";
import { hasLost, Player } from "../models";

export type EndGameScreenProps = ModalProps & {
  player: Player;
  opponent: Player;
  open: boolean;
};

const endGameHeader = (player: Player, opponent: Player): string => {
  if (hasLost(player)) {
    if (hasLost(opponent)) {
      return "It's a draw!";
    }

    return `${opponent.name} has won!`;
  }
  return `${opponent.name} has won!`;
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
