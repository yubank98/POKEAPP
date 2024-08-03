import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  FaLinkedinIn,
  FaGithubAlt,
  FaUserAstronaut,
  FaCode,
} from "react-icons/fa6";
import { SiPokemon } from "react-icons/si";
import "../styles/navbar.css";

function Navbar({ type }) {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header className={`header ${type}`}>
      <div className="logo">
        <img src="/images/pikachiball.gif" alt="" />
        <h1 >PokeDex</h1>
      </div>
      <nav ref={navRef}>
        <a href="https://github.com/yubank98/POKEAPP">
          <FaCode /> Repo
        </a>
        <a href="https://myubnkdev.netlify.app/">
          <FaUserAstronaut /> Portfolio
        </a>
        <a href="https://www.linkedin.com/in/michael-yubank-5b616b192/">
          <FaLinkedinIn /> Linkedin
        </a>
        <a href="https://github.com/yubank98">
          <FaGithubAlt /> GitHub
        </a>
        <a href="https://github.com/yubank98">
          <SiPokemon />
          PokeApi
        </a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
