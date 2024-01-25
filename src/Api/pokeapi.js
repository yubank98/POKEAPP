
import axios from 'axios';

const baseURL = 'https://pokeapi.co/api/v2/';

const api = axios.create({
    baseURL,
});

let cachedPokemonList = [];


export const getPokemon = async () => {
    try {
        if (cachedPokemonList.length === 0) {
            const response = await api.get('pokemon/?limit=1000');
            const pokemonList = response.data.results;
            const pokemonListWithDetails = await Promise.all(
                pokemonList.map(async (pokemon) => {
                    const pokemonDetails = await getPokemonDetails(pokemon.name);
                    return pokemonDetails;
                })
            );
            cachedPokemonList = pokemonListWithDetails;
        }
        return cachedPokemonList;
    } catch (error) {
        throw error;
    }
};


export const getPokemonDetails = async (pokemonName) => {
    try {
        const response = await api.get(`pokemon/${pokemonName}`);
        const pokemonDetails = response.data;
        return pokemonDetails;
    } catch (error) {
        throw error;
    }
}

