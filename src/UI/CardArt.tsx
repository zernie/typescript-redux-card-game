import React from "react";
import { Image, ImageProps } from "semantic-ui-react";

export type CardArtProps = ImageProps & {
  cardID: string;
  resolution?: 256 | 512;
};

const CardArt: React.FC<CardArtProps> = ({
  cardID,
  resolution = 512,
  ...props
}) => (
  <Image
    // alt={name}
    shape="circular"
    src={`https://art.hearthstonejson.com/v1/${resolution}x/${cardID}.jpg`}
    {...props}
  />
);

export default CardArt;
