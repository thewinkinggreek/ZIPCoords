"use server";


import parseInput from "./parseInput";
import { CoordsInput, InputType, ZIPInput } from "./types";
import { db } from "./db";
import haversine from "./haversine";
import { NextRequest, NextResponse } from "next/server";


async function getCoords(
    input: ZIPInput
): Promise<{ lat: number, lon: number} | null>
{
    const { data, error } = await db
        .from("zip_coords")
        .select("location")
        .eq("zip", input.value)
        .single();
    console.log("Data:\n", data)
    if (error || !data || !data.location || !Array.isArray(data.location.coordinates)) {
        return null;
    }
    const [lon, lat] = data.location.coordinates;
    console.log("Lat and lon:\n", lat, lon)
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


export async function GET(req: NextRequest)
{
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    if (!query) {
        return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }
    const input = parseInput(query);
    if (input.type === InputType.zip) {
        console.log("Input:\n", input)
        const result = await getCoords(input);
        console.log("Result:\n", result)
        return result
            ? NextResponse.json(result)
            : NextResponse.json({ error: "ZIP Code not found" }, { status: 404 });
    }
    if (input.type === InputType.coords) {
        const result = await getZIP(input);
        return result
            ? NextResponse.json(result)
            : NextResponse.json({ error: "No nearby ZIP found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
}
