"use client";


import { useState } from "react";
import Input from "@/components/Input";
import Output from "@/components/Output";
import { Response } from "@/lib/types";
import styles from "@/styles/Fields.module.css";
import "@/styles/index.css";


export default function HomePage()
{
    const [result, setResult] = useState<Response | null>(null);
    const [error, setError] = useState<string | null>(null);
    return (
        <main>
            <h1>ZIPCoords</h1>
            <div className={styles.fieldsContainer}>
                <Input setResult={setResult} setError={setError} />
                <Output result={result} error={error} />
            </div>

        </main>
    );
}
