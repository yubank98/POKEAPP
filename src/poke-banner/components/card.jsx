import React from "react";
import { getTypeIcon } from "../../utils/poke-helpers";
import "../styles/card.css";
import { usePokemonModal } from "../context/pokeModalProv";

export const Card = ({
  pokemon,
  pokemon: { paddedId, name, types, imgSrc },
}) => {
  const {openModal} = usePokemonModal();
  return (
    <div
      onClick={() => openModal(pokemon)}
      className={`pokeCard ${types[0].name}`}
    >
      <div className="pokeCard-bg"></div>
      <img src={imgSrc} alt={name} className="pokeCard-image" />
      <div className="pokemon-info">
        <span className="pokemon-number">{"#" + paddedId + " "}</span>
        <span className="pokemon-name">{name}</span>
        <span className="cardIcon">
          {types.map(({ name }) => {
            const typeImg = getTypeIcon(name);
            return (
              <div key={name} className={name}>
                <img src={typeImg} alt={name} />
                <span className="type-name">{name}</span>
              </div>
            );
          })}
        </span>
      </div>
    </div>
  );
};
