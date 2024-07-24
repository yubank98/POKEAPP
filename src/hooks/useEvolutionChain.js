import { useState, useEffect } from 'react';
import { apiFetch } from '../utils/pokeapi';
import { formatPokemon } from '../utils/poke-helpers';

export const useEvolutionChain = (pokemonName) => {
    const [evolutionChain, setEvolutionChain] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!pokemonName) return;

        const fetchEvolutionChain = async () => {
            setLoading(true);
            setError(null);

            try {
                const responseSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`);
                const speciesData = await responseSpecies.json();
                const evolutionChainUrl = speciesData.evolution_chain.url;
                const responseEvolution = await fetch(evolutionChainUrl);
                const evolutionData = await responseEvolution.json();
                async function extractEvolutions(chain, omit) {
                    const evolutions = [];

                    async function traverseEvolution(node) {
                        if (!node) return;
                        if (node.species.name !== omit) {
                            const pokeEvo = await apiFetch(`/pokemon/${node.species.name}`);
                            const formattedPokemon = formatPokemon(pokeEvo);
                            evolutions.push(formattedPokemon);
                        }
                        await Promise.all(node.evolves_to.map(traverseEvolution));
                    }

                    await traverseEvolution(chain);
                    return evolutions;
                }
                const chain = await extractEvolutions(evolutionData.chain, pokemonName);
                setEvolutionChain(chain);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvolutionChain();
    }, [pokemonName]);
    return { evolutionChain, loading, error };
};

