import getDecimalCoords from "./getDecimalCoords";
import { InputType, ParsedInput } from "./types";


export default function parseInput(input: string): ParsedInput
{
    const zipRegex = /^\d{5}$/;
    if (zipRegex.test(input)) {
        return {
            type: InputType.zip,
            value: parseInt(input, 10)
        };
    }
    const coords = getDecimalCoords(input);
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
