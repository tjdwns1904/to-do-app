import ky from "ky";

const baseURL = import.meta.env.VITE_API;

export const kyInstance = ky.create({
    prefixUrl: baseURL,
    credentials: "include",
    headers: {
        'Accept': "application/json",
    }
});