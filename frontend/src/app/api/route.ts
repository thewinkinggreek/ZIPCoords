import parseInput from "./parseInput";
import { CoordsInput, InputType, ZIPInput } from "./types";
import { db } from "./db";
import haversine from "./haversine";


async function getCoords(
    input: ZIPInput
): Promise<{ lat: number, lon: number} | null>
{
    const { data, error } = await db
        .from("zip_coords")
        .select("location")
        .eq("zip", input.value)
        .single();
    if (error || !data) {
        return null;
    }
    const [lon, lat] = data.location.coordinates;
    return { lat, lon };
}


async function getZIP(input: CoordsInput): Promise<{zip: number} | null>
{
    const { lat, lon } = input.value;
    const { data, error } = await db
        .from("zip_coords")
        .select("zip, location")
    if (error || !data) {
        return null;
    }
    let nearestZIP: number | null = null;
    let minDistance = Infinity;
    for (const row of data) {
        const [rowLon, rowLat] = row.location.coordinates;
        const distance = haversine(lat, lon, rowLat, rowLon);
        if (distance < minDistance) {
            minDistance = distance;
            nearestZIP = row.zip;
        }
    }
    return nearestZIP ? {zip: nearestZIP} : null;
}


export default async function api(
    rawInput: string
): Promise<{ zip?: number; lat?: number; lon?: number } | null>
{
    const input = parseInput(rawInput);
    if (input.type === InputType.zip) {
        return await getCoords(input);
    }
    if (input.type === InputType.coords) {
        return await getZIP(input);
    }
    return null;
}
