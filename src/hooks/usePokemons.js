import { useQuery } from "@tanstack/react-query";
import { apiFetch } from '../utils/pokeapi';
import { formatPokemon } from '../utils/poke-helpers';

export const usePokemon = (type) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['pokemons', type],
        queryFn: async () => {
            try {
                const { pokemon: pokelist } = await apiFetch(`/type/${type}`);
                if (!Array.isArray(pokelist)) {
                    throw new Error('Datos de Pokémon no válidos');
                }

                const pokemons = await Promise.all(
                    pokelist.map(async ({ pokemon }) => {
                        try {
                            const res = await fetch(pokemon.url);
                            if (!res.ok) {
                                throw new Error(`Error al obtener datos de Pokémon: ${res.statusText}`);
                            }

                            const data = await res.json();
                            return formatPokemon(data);
                        } catch (fetchError) {
                            console.error(`Error al obtener Pokémon desde ${pokemon.url}:`, fetchError.message);
                            return null; 
                        }
                    })
                );

                return pokemons.filter(pokemon => pokemon !== null);
            } catch (fetchError) {
                console.error('Error al obtener la lista de Pokémon:', fetchError.message);
                throw fetchError;
            }
        }
    });

    return { data, isLoading, isError, error };
};
