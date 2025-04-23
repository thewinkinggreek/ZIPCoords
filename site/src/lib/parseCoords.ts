import { matchDDCoords, matchDMSCoords, matchDDMCoords, matchPrefixedCoords } from "./regexes";


function isFiniteNum(n: unknown): n is number
{
    return typeof n === "number" && Number.isFinite(n);
}


function convertDegreesToDD(
    degrees: number, minutes: number, seconds: number, direction: string
): number
{
    if (![degrees, minutes, seconds].every(Number.isFinite)) {
        return NaN;
    }
    let dd = degrees + minutes / 60 + seconds / 3600;
    direction = direction.toUpperCase();
    if (direction === 'S' || direction === 'W') {
        dd *= -1;
    }
    return dd;
}


function convertPrefixedToDD(
    input: RegExpMatchArray
): { lat: number, lon: number }
{
    if (input.length !== 3) {
        return { lat: NaN, lon: NaN };
    }
    const latDirection = input[0][0].toUpperCase();
    const lonDirection = input[1][0].toUpperCase();
    let lat = parseFloat(input[0].slice(1));
    let lon = parseFloat(input[1].slice(1));
    if (latDirection === 'S') {
        lat *= -1;
    }
    if (lonDirection === 'W') {
        lon *= -1;
    }
    return { lat, lon };
}


export default function parseCoords(
    input: string
): { lat: number; lon: number} | null
{
    const dd = matchDDCoords(input);
    if (dd) {
        const lat = +dd[1];
        const lon = +dd[2];
        if (isFiniteNum(lat) && isFiniteNum(lon)) {
            return { lat, lon };
        }
    }
    const dms = matchDMSCoords(input);
    if (dms) {
        const lat = convertDegreesToDD(+dms[1], +dms[2], +dms[3], dms[5]);
        const lon = convertDegreesToDD(+dms[6], +dms[7], +dms[8], dms[10]);
        if (isFiniteNum(lat) && isFiniteNum(lon)) {
            return { lat, lon };
        }
    }
    const ddm = matchDDMCoords(input);
    if (ddm) {
        const lat = convertDegreesToDD(+ddm[1], +ddm[2], 0, ddm[3]);
        const lon = convertDegreesToDD(+ddm[4], +ddm[5], 0, ddm[6]);
        if (isFiniteNum(lat) && isFiniteNum(lon)) {
            return { lat, lon };
        }
    }
    const prefixed = matchPrefixedCoords(input);
    if (prefixed) {
        const { lat, lon } = convertPrefixedToDD(prefixed);
        if (isFiniteNum(lat) && isFiniteNum(lon)) {
            return { lat, lon };
        }
    }
    return null;
}
