import { useQuery } from "@tanstack/react-query";
import { apiFetch } from '../utils/pokeapi';
import { formatPokemon } from '../utils/poke-helpers';

export const usePokemon = (type) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['pokemons', type],
        queryFn: async () => {
            try {
                const response = await apiFetch(`/type/${type}`);
                const { pokemon: pokelist } = response;

                // Verifica que pokelist sea un array antes de mapear
                if (!Array.isArray(pokelist)) {
                    throw new Error('Datos de Pokémon no válidos');
                }

                const pokemons = await Promise.all(
                    pokelist.map(async ({ pokemon }) => {
                        try {
                            const res = await fetch(pokemon.url);

                            // Verifica que la respuesta sea válida
                            if (!res.ok) {
                                throw new Error(`Error al obtener datos de Pokémon: ${res.statusText}`);
                            }

                            const text = await res.text(); // Obtén la respuesta como texto

                            // Verifica si el texto no está vacío
                            if (!text) {
                                throw new Error('Respuesta vacía de la API');
                            }

                            const data = JSON.parse(text); // Analiza el texto como JSON
                            return formatPokemon(data);
                        } catch (fetchError) {
                            console.error(`Error al obtener Pokémon desde ${pokemon.url}:`, fetchError.message);
                            return null; // Manejo de errores: podrías querer manejar esto de manera diferente
                        }
                    })
                );

                // Filtra los Pokémon que fallaron en la carga
                return pokemons.filter(pokemon => pokemon !== null);
            } catch (fetchError) {
                console.error('Error al obtener la lista de Pokémon:', fetchError.message);
                throw fetchError; // Lanza el error para que pueda ser manejado por el llamador
            }
        }
    });

    return { data, isLoading, isError };
};

