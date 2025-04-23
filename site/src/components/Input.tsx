import { useState } from "react";
import fetchResponse from "@/lib/fetchResponse";
import { isZIPCodeOrCoords } from "@/lib/regexes";
import { Response } from "@/lib/types";
import styles from "@/styles/Fields.module.css";


export default function Input(
    { setResult, setError }:
    {
        setResult: (data: Response | null) => void;
        setError: (err: string | null) => void
    }
)
{
    const [input, setInput] = useState("");
    async function fetchResult(input: string)
    {
        const { response, error } =  await fetchResponse(input);
        if (error) {
            setResult(null);
            setError(error);
        } else {
            setResult(response);
            setError(null);
        }
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        const val = e.target.value;
        setInput(val);
        if (isZIPCodeOrCoords(val)) {
            fetchResult(val);
        } else {
            setResult(null);
            setError(null);
        }
    }
    return (
        <div className={styles.fieldContainer}>
            <input
                className={styles.textContainer}
                value={input}
                onChange={handleChange}
                placeholder="Enter a ZIP Code or a set of Coordinates"
            />
        </div>
    );
}
