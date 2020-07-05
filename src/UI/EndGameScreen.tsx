import React from "react";
import { Modal, ModalProps, Transition, Button } from "semantic-ui-react";
import { hasLost, Player } from "../models";

export interface EndGameScreenProps extends ModalProps {
  player: Player;
  opponent: Player;
  open: boolean;
}

const endGameHeader = (player: Player, opponent: Player): string => {
  if (hasLost(player)) {
    if (hasLost(opponent)) {
      return "It's a draw!";
    }

    return `${opponent.name} has won!`;
  }
  return `${player.name} has won!`;
};

const EndGameScreen: React.FC<EndGameScreenProps> = ({
  player,
  opponent,
  open,
  ...props
}) => (
  <Transition animation={"fly up"} duration={1500} visible={open}>
    <Modal {...props} open={open}>
      <Modal.Header align={"center"}>
        {endGameHeader(player, opponent)}
        <Button onClick={() => window.location.reload()}>Restart</Button>
      </Modal.Header>
      {/*<Modal.Content />*/}
    </Modal>
  </Transition>
);

export default EndGameScreen;
