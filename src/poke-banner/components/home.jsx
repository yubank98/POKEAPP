import React, { Suspense, useState } from "react";
import Dashboard from "./dashboard";
import NavBar from "./navbar";
import Banner from "./banner";
import Footer from "./footer";
import TypeBar from "./typesBar";
import PokemonModal from "./pokemonModal";
import { PokemonModalProvider } from "../context/pokeModalProv";
import Loader from "./loader";

function Home() {
  const [type, setType] = useState("water");
  return (
    <PokemonModalProvider>
      <PokemonModal />
      <NavBar />
      <Banner />
      <TypeBar toggleTypes={setType} />
      <Suspense fallback={<Loader />}>
        <Dashboard type={type} />
      </Suspense>
      <Footer />
    </PokemonModalProvider>
  );
}

export default Home;
