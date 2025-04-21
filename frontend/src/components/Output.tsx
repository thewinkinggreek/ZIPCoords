"use client";


import copyIcon from "@/../public/copy.png";
import Image from "next/image";
import { Response } from "@/lib/types";
import styles from "@/styles/Fields.module.css";


export default function Output(
    { result, error }:
    {
        result: Response | null;
        error: string | null;
    }
)
{
    if (error) {
        return <p className="error">{error}</p>;
    }
    if (!result) {
        return null;
    }
    async function handleCopy(text: string) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error("Error on copy attempt:", err);
        }
    }
    const copyText = result.zip_code?.toString() ??
        (result.lat && result.lon ? `${result.lat}, ${result.lon}` : null);
    if (!copyText) {
        return null;
    }
    return (
        <div
            className={`${styles.fieldContainer} ${styles.output}`}
            onClick={() => handleCopy(copyText)}
            title="Click to copy"
            style={{ cursor: "pointer" }}
        >
            <div className={styles.innerContainer}>
                {result.zip_code &&
                    <div className={styles.textContainer}>
                        {result.zip_code}
                    </div>
                }
                {result.lat && result.lon && (
                    <div className={styles.textContainer}>
                        {result.lat}, {result.lon}
                    </div>
                )}
                <Image
                    src={copyIcon}
                    alt="Copy"
                    className={styles.copyIconContainer}
                />
            </div>
        </div>
    );
}
