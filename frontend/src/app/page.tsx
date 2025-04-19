"use client";


import { useState } from "react";
import Input from "@/components/Input";
import Output from "@/components/Output";
import "../styles/index.css";


export default function Home()
{
    const [result, setResult] = useState<{ zip?: number; lat?: number; lon?: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    return (
        <div className="main">
            <h1>
                <span>ZIPCoords</span>
                <span style={{color: "orange"}}>2025</span>
            </h1>
            <Input setResult={setResult} setError={setError} />
            <Output result={result} error={error} />
        </div>
    );
}
