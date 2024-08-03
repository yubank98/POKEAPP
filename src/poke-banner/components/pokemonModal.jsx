import React, { useState, useEffect } from "react";
import { typeData } from "../../utils/collectionTypes";
import { usePokemonModal } from "../context/pokeModalProv";
import * as Dialog from "@radix-ui/react-dialog";
import DataRow from "./dataRow";
import { useEvolutionChain } from "../../hooks/useEvolutionChain";
import { formatStats, getTypeIcon, getPokemonWeaknesses } from "../../utils/poke-helpers";
import "../styles/modal.css";
import Loader from "./loader";

const PokemonModal = () => {
  const { isModalOpen, closeModal, currentPokemon } = usePokemonModal();
  const [pokemonName, setPokemonName] = useState("");
  const [weakness, setWeakness] = useState([]);
  const { evolutionChain, loading, error } = useEvolutionChain(pokemonName);

  useEffect(() => {
    if (currentPokemon) {
      setPokemonName(currentPokemon.name);
    }
  }, [currentPokemon]);

  useEffect(() => {
    if (currentPokemon) {
      const fetchWeaknesses = async () => {
        try {
          const weaknesses = await getPokemonWeaknesses(currentPokemon.name);
          setWeakness(weaknesses);
        } catch (err) {
          console.error(err);
        }
      };
      fetchWeaknesses();
    }
  }, [currentPokemon]);

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
                : typeData[currentPokemon.types[0].name].color
            })`,
          }}
        >
          <div className="cardInfo">
            <h1 className="name">
              N°{currentPokemon.paddedId} {currentPokemon.name}
            </h1>
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

            <img
              src={`${currentPokemon.imgSrc}`}
              alt={`${currentPokemon.name}`}
              className="modal-image"
            />
            <div className="description">
              <h3>Altura: {currentPokemon.height}</h3>
              <h3>Peso: {currentPokemon.weight}</h3>
              <span className="weaknes">
                <h3>Debilidades</h3>
                {weakness.map((weak) => {
                  const typeImg = getTypeIcon(weak);
                  return (
                    <div key={weak}>
                      <img src={typeImg} alt={weak} />
                    </div>
                  );
                })}
              </span>
            </div>
            <div className="stats">
              <h1>Stats</h1>
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
                          types={currentPokemon.types}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="transforms">
                <h1>Forms</h1>
                <div className="transforms-images">
                  {loading ? (
                    <Loader/>
                  ) : error ? (
                    <p>Error: {error.message}</p>
                  ) : evolutionChain.length > 0 ? (
                    <div className="grid-container">
                      {evolutionChain.map((evolution, index) => (
                        <div key={index} className="grid-item">
                          <h3>
                            #{evolution.paddedId} {evolution.name}
                          </h3>
                          <img
                            src={evolution.imgSrc}
                            alt={evolution.name}
                            className="transforms-image"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No evolutions found.</p>
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
