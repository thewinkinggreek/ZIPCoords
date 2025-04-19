"use client";


export default function Output(
    { result, error }:
    {
        result: { zip?: number; lat?: number; lon?: number } | null;
        error: string | null;
    }
) {
    if (error) {
        return <p className="error">{error}</p>;
    }
    if (!result) {
        return null;
    }
    return (
        <div>
            {result.zip && <p>ZIP Code: {result.zip}</p>}
            {result.lat && result.lon && (
                <p>Coordinates: {result.lat.toFixed(6)}, {result.lon.toFixed(6)}</p>
            )}
        </div>
    );
}