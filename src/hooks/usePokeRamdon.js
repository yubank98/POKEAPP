import { useState, useEffect } from 'react';
import { apiFetch } from '../utils/pokeapi';
import { formatPokemon } from '../utils/poke-helpers';

const getPokemonCount = async (type) => {
    const data = await apiFetch(`/pokemon?type=${type}&limit=1`);
    return data.count;
};

const getRandomPokemonId = (count) => {
    return Math.floor(Math.random() * count) + 1;
};

export const useRandomPokemon = (type) => {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                const count = await getPokemonCount(type);
                const randomId = getRandomPokemonId(count);
                const data = await apiFetch(`/pokemon/${randomId}?type=${type}`);
                const ftPoke = formatPokemon(data);
                setPokemon(ftPoke);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [type]);

    return { pokemon, loading, error };
};
