import React, { useState } from "react";
import "./styles/card.css";
import { typeData } from "./collectionTypes";
import { getTypeIcon } from "../helpers/pokemon-helper";
import "./styles/dashboard.css";

const PokemonTypeIcon = ({ type, onClick }) => {
  const [isBouncing, setIsBouncing] = useState(false);

  if (!typeData[type]) {
    return null;
  }
  const color = typeData[type].color;
  const typeImg = getTypeIcon(type);
  return (
    <span
      className={`Img-type ${isBouncing ? "bounce" : ""}`}
      style={{ backgroundColor: color }}
      onClick={() => {
        setIsBouncing(true);
        setTimeout(() => setIsBouncing(false), 800);
        onClick && onClick();
      }}
    >
      <img src={typeImg} alt={type} />
    </span>
  );
};

export default PokemonTypeIcon;
