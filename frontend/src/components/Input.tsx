import { useState } from "react";
import fetchResponse from "@/lib/fetchResponse";
import { Response } from "@/types";


export default function Input(
    { setResult, setError }:
    {
        setResult: (data: Response | null) => void;
        setError: (err: string | null) => void
    }
)
{
    const [input, setInput] = useState("");
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setResult(null);
        const { response, error } = await fetchResponse(input);
        if (error) {
            setError(error);
        } else {
            setResult(response);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Enter"
            />
            <button type="submit">Search</button>
        </form>
    );
}