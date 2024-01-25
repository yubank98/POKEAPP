import React, { useEffect, useState } from "react";
import { Card } from "./card";
import chroma from 'chroma-js';
import { getPokemon } from "../Api/pokeapi";
import ReactPaginate from "react-paginate";
import { typeData } from "./collectionTypes";
import PokemonTypeIcon from "./typeIcon";
import PokemonModal from "./pokemonModal";

import "./styles/dashboard.css";

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Todos los tipos");
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [typeFilter, setTypeFilter] = useState("");
  const perPage = 24;

  const [filter, setFilter] = useState("");

  useEffect(() => {
    getPokemon()
      .then((data) => {
        setPokemonList(data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de Pokémon", error);
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
    setSelectedType(type || "Todos los tipos");
    setIsMenuOpen(false);
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filter.toLowerCase())
  );

  const filteredByType = typeFilter
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
      <input
        className="search-input"
        type="text"
        placeholder="Filtrar Pokémon por nombre"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <h2>Lista de Pokémon</h2>

      <div>
        <button className="typeFilter-button"
       style={{backgroundColor: selectedType === "Todos los tipos" ? "#A8A878" : chroma(typeData[selectedType].color).brighten(-0.6).css()}}  
        onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="iconBotton">
            {selectedType} 
            <PokemonTypeIcon type={selectedType} iconsize={"1x"}/>
          </span>
        </button>

        {isMenuOpen && (
          <div className={`typeFilter-container ${isMenuOpen ? "open" : ""}`}
          style={{backgroundColor: selectedType === "Todos los tipos" ? "#A8A878" : chroma(typeData[selectedType].color).brighten(1.3).css()}}  
        >
            <span className="typeIcon" onClick={() => handleTypeFilter("")}>
              Todos los tipos
            </span>
            {Object.keys(typeData).map((typeName) => (
              <span
                key={typeName}
                className="typeIcon"
                onClick={() => handleTypeFilter(typeName)}
              >
                {typeName}
                <PokemonTypeIcon type={typeName} iconsize={"1x"} />
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-widgets">
        {displayedPokemon.map((pokemon, index) => (
          <Card
            key={index}
            title={pokemon.name}
            onClick={() => handlePokemonClick(pokemon)}
          />
        ))}
      </div>

      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
      />

      {selectedPokemon && (
        <PokemonModal
          selectedPokemon={selectedPokemon}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default Dashboard;
