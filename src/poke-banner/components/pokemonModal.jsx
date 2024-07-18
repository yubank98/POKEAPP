import React, { useState, useEffect } from "react";
import { typeData } from "../../utils/collectionTypes";
import { usePokemonModal } from "../context/pokeModalProv";
import * as Dialog from "@radix-ui/react-dialog";
import DataRow from "./dataRow";
import { useEvolutionChain } from "../../hooks/useEvolutionChain";
import { formatStats, getTypeIcon } from "../../utils/poke-helpers";
import "../styles/modal.css";
import Loader from "./loader";

const PokemonModal = () => {
  const { isModalOpen, closeModal, currentPokemon } = usePokemonModal();
  const [pokemonName, setPokemonName] = useState("");

  // Hook para obtener la cadena evolutiva, llamado siempre
  const { evolutionChain, loading, error } = useEvolutionChain(pokemonName);

  // Efecto para actualizar el nombre del Pokémon cuando `currentPokemon` cambia
  useEffect(() => {
    if (currentPokemon) {
      setPokemonName(currentPokemon.name);
    }
  }, [currentPokemon]);

  // Si no hay `currentPokemon`, no renderizar nada
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
          className={`modal ${isModalOpen ? "" : "exit"}`}
          style={{
            backgroundImage: `linear-gradient(${
              typeData[currentPokemon.types[0].name].color
            }, ${
              currentPokemon.types[1]
                ? typeData[currentPokemon.types[1].name].color
                : "#fff"
            })`,
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
            />

            <div className="description">
              <h3>Altura: {currentPokemon.height}</h3>
              <h3>Peso: {currentPokemon.weight}</h3>
              <h3>Tipos:</h3>
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
            <div className="stats">
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
              <div className="transforms">
                <h3>Forms</h3>
                <div className="transforms-images">
                  {loading ? (
                    <Loader className="loader"/>
                  ) : error ? (
                    <p>Error: {error.message}</p>
                  ) : evolutionChain.length > 0 ? (
                    evolutionChain.map((evolution, index) => (
                      <div key={index}>
                        <h5>#{evolution.paddedId} {evolution.name}</h5>
                        <img
                          src={evolution.imgSrc}
                          alt={evolution.name} // Asegúrate de que 'evolution.name' sea una propiedad válida para el atributo alt
                          className="transforms-image"
                        />
                      </div>
                    ))
                  ) : (
                    <p>No evolutions found.</p> // Opcional: Mensaje para el caso en que no haya evoluciones
                  )}
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PokemonModal;
