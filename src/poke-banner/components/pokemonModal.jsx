import React from "react";
import { typeData } from "../../utils/collectionTypes";
import { usePokemonModal } from "../context/pokeModalProv";
import * as Dialog from "@radix-ui/react-dialog";
import DataRow from "./dataRow";

import { formatStats, getTypeIcon } from "../../utils/poke-helpers";

import "../styles/card.css";

const PokemonModal = () => {
  const { isModalOpen, closeModal, currentPokemon } = usePokemonModal();
  if (!currentPokemon) {
    return null;
  }

  const stats = formatStats(currentPokemon.stats);

  return (
    <Dialog.Root
      open={isModalOpen}
      onOpenChange={(isOpen) => !isOpen && closeModal()}
    >

      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content
          data-content={currentPokemon?.name}
          className={`modal ${isModalOpen ? '' : 'exit'}`}
          style={{
            backgroundImage: `linear-gradient(${
              typeData[currentPokemon.types[0].name].color
            }, ${
              currentPokemon.types[1]
                ? typeData[currentPokemon.types[1].name].color
                : "#fff"
            }`,
          }}
        >
          <div className="cardInfo">
            <span className="name">
                N°{currentPokemon.paddedId} {currentPokemon.name}
            </span>

            <img
              src={`${currentPokemon.imgSrc}`}
              alt={`${currentPokemon.name}`}
              className="modal-image"
              style={{
                border: `5px solid ${
                  typeData[currentPokemon.types[0].name].color
                }`,
              }}
            />

            <div
              className="description"
              style={{
                backgroundImage: `linear-gradient(${
                  typeData[currentPokemon.types[0].name].color
                }, #fff)`,
              }}
            >
              <h3> Altura: {currentPokemon.height}</h3>
              <h3>Peso: {currentPokemon.weight}</h3>
              <h3>Tipos: </h3>
              <span className="icon">
                {currentPokemon.types.map(({ name }) => {
                  const typeImg = getTypeIcon(name);
                  return (
                    <div key={name} className={name}>
                      <img src={typeImg} alt={name} />
                    </div>
                  );
                })}
              </span>
            </div>
            <div
              className="stats"
              style={{
                backgroundImage: `linear-gradient(${
                  typeData[currentPokemon.types[0].name].color
                }, #fff)`,
              }}
            >
              <h3>Stats</h3>

              <div className="info-stats">
                <table>
                  <tbody>
                    {stats.map((stat) => {
                      const { name, value, max } = stat;
                      return (
                        <DataRow
                          key={name}
                          category={name}
                          value={value}
                          max={max}
                          type={currentPokemon.types[0].name}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PokemonModal;
