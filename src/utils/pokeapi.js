const base = 'https://pokeapi.co/api/v2';

export const apiFetch = async (endpoint) => {
    const res = await fetch(base + endpoint);

    if (!res.ok) {
        console.log( "soy el error" , await res.text());
        throw {
            status: res.status,
            message: res.statusText,
        }
    }

    return res.json();
}






