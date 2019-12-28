import React from "react";
import { Image, ImageProps } from "semantic-ui-react";

interface CardArtProps extends ImageProps {
  cardID: string;
  resolution?: 256 | 512;
}

const CardArt: React.FC<CardArtProps> = ({
  cardID,
  resolution,
  ...props
}) => (
  <Image
    // alt={name}
    circular={true}
    src={`https://art.hearthstonejson.com/v1/${resolution}x/${cardID}.jpg`}
    {...props}
  />
);

CardArt.defaultProps = {
  resolution: 256
} as Partial<CardArtProps>;

export default CardArt;
