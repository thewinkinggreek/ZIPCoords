import { Response } from "./types";


export default async function fetchResponse(
    input: string
): Promise<{ response: Response | null; error: string | null}>
{
    try {
        input = input
            .trim()
            .replace(/\s*,\s*/g, ",")
            .replace(/\s+/g, " ");
        const res = await fetch(`/api?q=${encodeURIComponent(input)}`);
        const data = await res.json();
        if (!res.ok) {
            return { response: null, error: data.error || "Unknown error" };
        }
        return { response: data, error: null};
    } catch {
        return { response: null, error: "Request failed" };
    }
}
