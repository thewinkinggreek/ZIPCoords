import parseCoords from "./parseCoords";
import { InputType, ParsedInput } from "./types";
import { isZIPCode } from "./regexes";


export default function parseInput(input: string): ParsedInput
{
    input = input
        .trim()
        .replace(/\s*,\s*/g, ",")
        .replace(/\s+/g, " ");
    if (isZIPCode(input)) {
        return {
            type: InputType.zip,
            value: parseInt(input, 10)
        };
    }
    const coords = parseCoords(input);
    if (coords) {
        return {
            type: InputType.coords,
            value: coords
        };
    }
    return {
        type: InputType.unknown,
        value: null
    };
}
