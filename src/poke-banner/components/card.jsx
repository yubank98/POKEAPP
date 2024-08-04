import React from "react";
import { getTypeIcon } from "../../utils/poke-helpers";
import "../styles/card.css";
import { usePokemonModal } from "../context/pokeModalProv";

export const Card = ({
  pokemon,
  pokemon: { paddedId, name, types, imgSrc },
}) => {
  const { openModal } = usePokemonModal();
  const fallbackimg = "/images/pokebolas.png";
  const handleError = (e) => {
    e.target.src = fallbackimg;
  };

  return (
    <div
      onClick={() => openModal(pokemon)}
      className={`pokeCard ${types[0].name}`}
    >
      <div className="pokeCard-bg"></div>

      <div className="pokemon-info">
        <img
          src={imgSrc || fallbackimg}
          alt={name || "pokemon sin imagen"}
          onError={handleError}
          className="pokeCard-image"
        />
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
