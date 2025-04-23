import rawData from "./data/data_dict.json" with { type: "json" };
const data = rawData as unknown as Record<string, [number, number]>;


export default function zipToCoords(
    zip: string
): { lat: number | null, lon: number | null}
{
    const regex = /^\d{5}$/;
    if (!regex.test(zip)) {
        return { lat: null, lon: null};
    }
    const coords = data[zip];
    if (!coords) {
        return { lat: null, lon: null };
    }
    return { lat: coords[0], lon: coords[1] };
}
