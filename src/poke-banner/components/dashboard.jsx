import React, { Suspense } from "react";
import { Card } from "./card";
import { usePokemon } from "../../hooks/usePokemons";
import "../styles/dashboard.css";
import Loader from "./loader";

function DashboardContent({ type }) {
  const { data: pokemons = [], isError } = usePokemon(type);

 
  if (isError) {
    return (
      <div>
        <img className="error-images" src="/images/psyduck.png" alt="error" />
        <h1>Tenemos Problemas con el servidor, recargue la pagina</h1>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>POKEMONS</h1>
      <h2>{type}</h2>
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

function Dashboard({ type }) {
  return (
    <Suspense fallback={<Loader/>}>
      <DashboardContent type={type} />
    </Suspense>
  );
}

export default Dashboard;
