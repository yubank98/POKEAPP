import React, { useEffect, useState } from "react";
import { getPokemonDetails } from "../Api/pokeapi";
import PokemonTypeIcon from "./typeIcon";
import { typeData } from "./collectionTypes";
import "./styles/card.css";

export function Card({ title, onClick }) {
  const [content, setContent] = useState({
    abilities: [],
    image: "",
    types: [],
  });
  const [color , setColor] = useState(
    {
      primaryColor : "",
      secondaryColor : "",
    }
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const pokemon = await getPokemonDetails(title);
        const abilities = pokemon.abilities.map((typeObj) => typeObj.ability.name);
        const types = pokemon.types.map((typeObj) => typeObj.type.name);

        setContent({
          abilities,
          image: pokemon.sprites.front_default,
          types,
        });
        setColor({
          primaryColor : typeData[types[0]].color,
          secondaryColor : types[1] ? typeData[types[1]].color : typeData[types[0]].color,
        });
      } catch (error) {
        console.error("Error al obtener los detalles del Pokémon", error);
      }
    }

    fetchData();
  }, [title]);


  return (
    <div className="pokeCard" style={{ background: `linear-gradient(to top, #fff, ${color.secondaryColor})`}} onClick={onClick}>
      <div className="pokeCard-bg"></div>
      <img
        src={content.image}
        alt={`${title}`}
        className="pokeCard-image"
      />
      <div className="pokemon-name">
        
        {content.types.map((type, index) => (
          <PokemonTypeIcon className="icon" key={index} type={type} />
        ))}
        <h3>{title}</h3>
      </div>
      <h3  style={{color: color.primaryColor}}>Habilidades</h3>
      <div className="info-pokemon"  style={{backgroundColor: color.primaryColor}}>
        <p>{content.abilities.join(", ")}</p>
      </div>
    </div>
  );
}

