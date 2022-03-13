import React from "react";
import classnames from "classnames";
import pokeball from "../../../assets/images/data.png";
import "./card.scss";

const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive
      })}
      onClick={handleClick} 
    >
      <div className="card-face card-font-face">
      
      </div>
      <div className="card-face card-back-face">
      <h6>{card.index}</h6>
        <h6>{card.mot}</h6>
      </div>
    </div>
  );
};

export default Card;