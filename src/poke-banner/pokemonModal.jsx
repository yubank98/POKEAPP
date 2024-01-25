import React from "react";
import ReactModal from "react-modal";
import PokemonTypeIcon from "./typeIcon";
import { typeData } from "./collectionTypes";

const PokemonModal = ({ selectedPokemon, closeModal }) => {
  return (
    <ReactModal
      isOpen={selectedPokemon !== null}
      onRequestClose={closeModal}
      className="modal"
      contentLabel="Detalles del Pokémon"
      overlayClassName="modal-overlay"
    >
      {selectedPokemon && (
        <div
          className="cardInfo-container"
          style={{
            backgroundImage: `linear-gradient(${
              typeData[selectedPokemon.types[0].type.name].color
            }, ${
              selectedPokemon.types[1]
                ? typeData[selectedPokemon.types[1].type.name].color
                : "#fff"
            }`,
          }}
        >
          <h2 className="name">{selectedPokemon.name}</h2>
          <img
            src={`https://img.pokemondb.net/artwork/large/${selectedPokemon.name}.jpg`}
            alt={`${selectedPokemon.name}`}
            className="modal-image"
            style={{
              border: `5px solid ${
                typeData[selectedPokemon.types[0].type.name].color
              }`,
            }}
          />

          <div
            className="description"
            style={{
              backgroundImage: `linear-gradient(${
                typeData[selectedPokemon.types[0].type.name].color
              }, #fff)`,
            }}
          >
            <h3>
              N° {selectedPokemon.id} Pokémon Altura:{" "}
              {selectedPokemon.height / 10} m Peso:{" "}
              {selectedPokemon.weight / 10} kg
            </h3>
            <h3>Tipos: </h3>
            {selectedPokemon.types.map((type, index) => (
              <h3 key={index} className="modal-icon" >
                <PokemonTypeIcon type={type.type.name} />
              </h3>
            ))}
          </div>
          <div
            className="stats"
            style={{
              backgroundImage: `linear-gradient(${
                typeData[selectedPokemon.types[0].type.name].color
              }, #fff)`,
            }}
          >
            <h3>Stats</h3>
            <div className="info-stats">
              {selectedPokemon.stats.map((stat, index) => (
                <div
                  className="data-stats"
                  key={index}
                  style={{
                    background: ` ${
                      typeData[selectedPokemon.types[0].type.name].color
                    }`,
                  }}
                >
                  <span>{stat.stat.name}:</span>
                  <span> {stat.base_stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </ReactModal>
  );
};

export default PokemonModal;
