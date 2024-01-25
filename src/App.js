import Modal from "react-modal";
import './App.css';
import Home from './poke-banner/home';


Modal.setAppElement("#root");

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;

