import React, { useState } from "react";
import Dashboard from "./dashboard";
import NavBar from "./navbar";
import Banner from "./banner";
import Footer from "./footer";
import TypeBar from "./typesBar";
import PokemonModal from "./pokemonModal";
import { PokemonModalProvider } from "../context/pokeModalProv";
import { getRandomType } from "../../utils/collectionTypes";

function Home() {
  const [type, setType] = useState(getRandomType());
  return (
    <PokemonModalProvider>
      <PokemonModal />
      <NavBar type={type}/>
      <Banner />
      <TypeBar toggleTypes={setType} />
      <Dashboard type={type} />
      <Footer />
    </PokemonModalProvider>
  );
}

export default Home;
