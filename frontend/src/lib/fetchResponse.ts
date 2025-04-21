import { Response } from "./types";


export default async function fetchResponse(
    input: string
): Promise<{ response: Response | null; error: string | null}>
{
    try {
        const res = await fetch(`/api?q=${encodeURIComponent(input.trim())}`);
        const data = await res.json();
        if (!res.ok) {
            return { response: null, error: data.error || "Unkown error" };
        }
        return { response: data, error: null};
    } catch {
        return { response: null, error: "Request failed" };
    }
}
