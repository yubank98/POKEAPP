const base = 'https://pokeapi.co/api/v2';

class APIError extends Error {
    constructor(status, message) {
        super(message); 
        this.status = status;
        this.name = "APIError"; 
    }
}

export const apiFetch = async (endpoint) => {
    const res = await fetch(base + endpoint);

    if (!res.ok) {
        const errorText = await res.text();
        console.log("soy el error", errorText);
        throw new APIError(res.status, res.statusText);
    }

    return res.json();
}





