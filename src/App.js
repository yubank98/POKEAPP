import Modal from "react-modal";
import './App.css';
import Home from './poke-banner/components/home';
import { PokemonModalProvider } from "./poke-banner/context/pokeModalProv";
import PokemonModal from "./poke-banner/components/pokemonModal";


Modal.setAppElement("#root");

function App() {
  return (
    <PokemonModalProvider>
      <div className="App">
      <Home />
      <PokemonModal />
    </div>
    </PokemonModalProvider>
  );
}

export default App;

