import React from "react";
import "./styles/card.css";
import { typeData } from './collectionTypes';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faWandMagic ,faCircle, faFire, faTint, faBolt, faLeaf, faSnowflake, faFistRaised, faSkullCrossbones, faMountain, faDove, faBrain, faBug, faGem, faGhost, faMoon, faShieldAlt, faDragon } from '@fortawesome/free-solid-svg-icons';

library.add(faWandMagic,faCircle, faFire, faTint, faBolt, faLeaf, faSnowflake, faFistRaised, faSkullCrossbones, faMountain, faDove, faBrain, faBug, faGem, faGhost, faMoon, faShieldAlt, faDragon);

function PokemonTypeIcon({ type, iconsize }) {
  if (!typeData[type]) {
    return null;
  }
  const { icon, color } = typeData[type];
    return (
    <div className="icon" >
      <FontAwesomeIcon icon={icon} color={color} size={iconsize ? iconsize : '1x'} />
    </div>
  );
}

export default PokemonTypeIcon;