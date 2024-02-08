import { useQuery } from "@tanstack/react-query";
import { apiFetch } from '../utils/pokeapi';
import { formatPokemon } from '../utils/poke-helpers';


export const usePokemon = (type) => {
    const {data} = useQuery({
        queryKey: ['pokemons', type],
        queryFn: async () => {
            const { pokemon: pokelist } = await apiFetch(`/type/${ type }`);
            const pokemons = await Promise.all(
                pokelist.map(async ({pokemon}) => {
                    const res = await fetch(pokemon.url);
                    const data = await res.json();
                    return formatPokemon(data);
                })
            );
            return pokemons;
        }
    });
    return data;
};


