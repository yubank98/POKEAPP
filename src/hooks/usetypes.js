import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../utils/pokeapi";

export const useTypes = () => {
    const { data, error, isError, isLoading } = useQuery({
        queryKey: ['types'],
        queryFn: async () => {
            try {
                const { results } = await apiFetch('/type');
                // Filtrar los tipos necesarios y que no sean null
                return results.filter(({ name }) => name !== 'unknown' && name !== 'shadow' && name !== 'stellar');
            } catch (err) {
                throw new Error("Error al obtener los tipos de Pokémon");
            }
        }
    });

    if (isLoading) return { isLoading, data: [] };
    if (isError) {
        console.error("Error al obtener los tipos de Pokémon:", error.message);
        return { isLoading: false, data: [], error };
    }

    return { isLoading, data };
};