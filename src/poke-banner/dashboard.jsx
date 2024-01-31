import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Card } from "./card";
import chroma from "chroma-js";
import { getPokemon } from "../Api/pokeapi";
import ReactPaginate from "react-paginate";
import { typeData } from "./collectionTypes";
import PokemonTypeIcon from "./typeIcon";
import PokemonModal from "./pokemonModal";

import "./styles/dashboard.css";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("todos");
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [typeFilter, setTypeFilter] = useState("");
  const perPage = 24;

  const [filter, setFilter] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getPokemon()
      .then((data) => {
        setPokemonList(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de Pokémon", error);
        setIsLoading(false);
      });
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setFilter("");
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  const handleTypeFilter = (type) => {
    setTypeFilter(type);
    setSelectedType(type || "todos");
  };

  const handleButtonClick = () => {
    const pokemonFound = pokemonList.find(
      (pokemon) => pokemon.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (pokemonFound) {
      setFilter(inputValue);
      setError(null);
    } else {
      setError("No se encontraron resultados para tu búsqueda.");
    }
    setInputValue("");
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filter.toLowerCase())
  );

  const filteredByType =
    typeFilter && typeFilter !== "pokeball"
      ? filteredPokemon.filter((pokemon) =>
          pokemon.types.some((type) => type.type.name === typeFilter)
        )
      : filteredPokemon;

  const totalFilteredPokemon =
    filter || typeFilter ? filteredByType : pokemonList;

  const pageCount = Math.ceil(totalFilteredPokemon.length / perPage);

  const displayedPokemon = totalFilteredPokemon.slice(
    currentPage * perPage,
    (currentPage + 1) * perPage
  );

  return (
    <div>
      <div key="search-input">
        <button className="search-input-btn" onClick={handleButtonClick}>
          Buscar
        </button>
        <input
          className="search-input"
          type="text"
          placeholder="Filtrar Pokémon por nombre"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div
        key="types-bar"
        className={`types-Bar`}
        style={{
          backgroundColor:
            selectedType === "todos"
              ? "#ddd"
              : chroma(typeData[selectedType].color).brighten(1.3).css(),
        }}
      >
        {Object.keys(typeData).map((typeName) => (
          <PokemonTypeIcon
            key={typeName}
            type={typeName}
            onClick={() => handleTypeFilter(typeName)}
          />
        ))}
      </div>

      <h2>Lista de Pokémon</h2>
      <div key="pokemon-list" className="dashboard-widgets">
        {isLoading ? (
          <div className="chargeImg">
            <img src="/images/pikachiball.gif" alt="Cargando..." />
            <h4>Cargando...</h4>
          </div>
        ) : (
          displayedPokemon.map((pokemon, index) => (
            <Card
              key={index}
              title={pokemon.name}
              onClick={() => handlePokemonClick(pokemon)}
            />
          ))
        )}
      </div>

      {!isLoading && (
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
        />
      )}

      {selectedPokemon && (
        <PokemonModal
          selectedPokemon={selectedPokemon}
          closeModal={closeModal}
        />
      )}

      <Modal
        isOpen={!!error}
        onRequestClose={() => setError(null)}
        className="ErrorModal"
        overlayClassName="ErrorModal-overlay"
      >
        <div>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => setError(false)}>Cerrar</button>
        </div>
        <div  className="error-bg" ></div>
      </Modal>
    </div>
  );
}

export default Dashboard;
