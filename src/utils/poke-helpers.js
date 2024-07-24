export const getTypeIcon = (type) => `./images/Icons-type/${type}.svg`;

export const ArtImagUrl = (name) => `https://img.pokemondb.net/artwork/large/${name}.jpg`;

/**
 *  format pokemon data
 * @param {Object} pokemon - Objeto de datos del Pokemon a formatear.
 * @param {number} pokemon.id - El ID del Pokemon.
 * @param {string} pokemon.name - El nombre del Pokemon.
 * @param {Object} pokemon.sprites - El objeto de sprites que contiene URLs de imágenes del Pokemon.
 * @param {number} pokemon.weight - El peso del Pokemon.
 * @param {number} pokemon.height - La altura del Pokemon.
 * @param {Array} pokemon.types - El array de tipos que contiene los tipos del Pokemon.
 * @returns {Object} - El objeto de datos del Pokemon formateado.
 */

export const formatPokemon = (pokemon) => {
    const { id, name, sprites, weight, height, types } = pokemon;

    const weightInKg =( weight / 10) + 'kg';
    const heightInM = (height / 10) + 'm';
    const paddedId = String(id).padStart(3, '0');
    const formatTypes = types.map(({type}) => type);
    const pokeImg = sprites.other.dream_world.front_default || sprites.other['official-artwork'].front_default;

    return {
        ...pokemon,
        paddedId,
        name: removeHyphens(name),
        imgSrc: pokeImg,
        weight : weightInKg,
        height : heightInM,
        types: formatTypes,
    }
}
/**
 * get pokemon image
 * @param {string} url - URL de la imagen del Pokemon.
 * @returns {Promise<string>} - Promesa que se resuelve con la URL de la imagen del Pokemon.
 */


const removeHyphens = (string) => {
    return string.replace(/-/g, ' ');
}

export const formatStats = (stats) => {
    const statsMaxValues = {
        hp: 714,
        attack: 714,
        defense: 614,
        "special-attack": 504,
        "special-defense": 614,
        speed: 504,
    }

    const statsObject = stats.map(({ stat, base_stat }) => {
        return {
            name: removeHyphens(stat.name),
            value: base_stat,
            max: statsMaxValues[stat.name]
        }
    });

    const total = stats.reduce((total, { base_stat }) => total + base_stat, 0);
    
    return [
        ...statsObject,
        { name: 'total', value: total }
    ];
}

export const getPokemonWeaknesses = async (pokemonName) => {
    try {
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!pokemonResponse.ok) {
            throw new Error(`Error fetching Pokémon data: ${pokemonResponse.statusText}`);
        }
        const pokemonData = await pokemonResponse.json();
        const typeUrls = pokemonData.types.map(typeInfo => typeInfo.type.url);

        const typeResponses = await Promise.all(typeUrls.map(url => fetch(url)));
        const typesData = await Promise.all(typeResponses.map(res => {
            if (!res.ok) {
                throw new Error(`Error fetching type data: ${res.statusText}`);
            }
            return res.json();
        }));

        const weaknesses = calculateWeaknesses(typesData);
        return weaknesses;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const calculateWeaknesses = (typesData) => {
    const damageRelations = typesData.flatMap(typeData => typeData.damage_relations);
    const doubleDamageFrom = new Set(damageRelations.flatMap(relations => relations.double_damage_from.map(type => type.name)));
    const halfDamageFrom = new Set(damageRelations.flatMap(relations => relations.half_damage_from.map(type => type.name)));
    const noDamageFrom = new Set(damageRelations.flatMap(relations => relations.no_damage_from.map(type => type.name)));

    doubleDamageFrom.forEach(type => {
        if (halfDamageFrom.has(type) || noDamageFrom.has(type)) {
            doubleDamageFrom.delete(type);
        }
    });

    return Array.from(doubleDamageFrom);
};