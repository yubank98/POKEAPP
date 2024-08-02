import React from "react";
import { Card } from "./card";
import { usePokemon } from "../../hooks/usePokemons";

import "../styles/dashboard.css";
import Loader from "./loader";

function Dashboard({ type }) {
  const { data: pokemons = [], isLoading, isError, error } = usePokemon(type);

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (!isError)
    return (
      <div>
        <img className="error-images" src="/images/psyduck.png" alt="error" />
        <h1>Tenemos Problemas con el servidor, recargue la pagina</h1>
      </div>
    );

  return (
    <div className="dashboard">
      <h1>P O K E M O N S</h1>
      <div key="pokemon-list" className="dashboard-widgets">
        {pokemons.length === 0 ? (
          <div>No Pokémon found</div>
        ) : (
          pokemons.map((pokemon) => <Card key={pokemon.id} pokemon={pokemon} />)
        )}
      </div>
    </div>
  );
}

export default Dashboard;
