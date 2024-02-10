import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../utils/pokeapi";

export const useTypes = () => {
    const { data } = useQuery({
        queryKey: ['types'],
        queryFn: async () => {
            const { results } = await apiFetch('/type');

            //solo typos necesarios 
            return results.filter(({ name }) => name !== 'unknown' && name !== 'shadow');
        }
    });

    return data;
};

