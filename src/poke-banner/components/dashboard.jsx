import React from "react";
import { Card } from "./card";
import { usePokemon } from "../../hooks/usePokemons";

import "../styles/dashboard.css";

function Dashboard({ type }) {
  const pokemons = usePokemon(type);

  return (
    <div className="dashboard">
      <h2>Lista de Pokémon</h2>
      <div key="pokemon-list" className="dashboard-widgets">
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
