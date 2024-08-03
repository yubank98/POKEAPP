import { useState, useEffect } from 'react';
import { apiFetch } from '../utils/pokeapi';

const getPokemonCount = async () => {
    const data = await apiFetch('/pokemon?limit=1'); 
    return data.count;
};

const getRandomPokemonId = (count) => {
    return Math.floor(Math.random() * count) + 1;
};

export const useRandomPokemon = () => {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                const count = await getPokemonCount();
                const randomId = getRandomPokemonId(count);
                const data = await apiFetch(`/pokemon/${randomId}`);
                setPokemon(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);

    return { pokemon, loading, error };
};
