"use server";


import parseInput from "@/lib/parseInput";
import { CoordsInput, InputType, ZIPInput } from "@/lib/types";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


async function getCoords(
    input: ZIPInput
): Promise<{ lat: number, lon: number} | null>
{
    const { data, error } = await db.rpc("get_coords", { input: input.value });
    if (error || !data || data.length === 0) {
        return null;
    }
    const { lat, lon } = data[0];
    return { lat, lon };
}


async function getZIP(
    input: CoordsInput
): Promise<{zip_code: number} | null>
{
    const { lat, lon } = input.value;
    const { data, error } = await db.rpc("get_zip", { lat, lon });
    if (error || !data || data.length == 0) {
        return null;
    }
    return { zip_code: data[0].zip }
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
        const result = await getCoords(input);
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
