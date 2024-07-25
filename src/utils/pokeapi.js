const base = 'https://pokeapi.co/api/v2';
class APIError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.name = "APIError";
    }
}

export const apiFetch = async (endpoint) => {
    try {
        const res = await fetch(base + endpoint);
        if (!res.ok) {
            const errorText = await res.text();
            console.log("Response error text:", errorText);
            throw new APIError(res.status, res.statusText);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.error("Error al analizar JSON:", error);
        } else if (error instanceof APIError) {
            console.error(`APIError ${error.status}: ${error.message}`);
        } else {
            console.error("Error inesperado:", error);
        }
        throw error;
    }
}