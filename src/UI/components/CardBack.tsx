import React from "react";
import Img from "../../assets/images/cardback.png";

const CardBack: React.FC<Object> = props => (
  <img src={Img} alt="Unknown card" width={100} {...props} />
);

export default CardBack;
