const DD_REGEX = /^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/;
const DMS_REGEX = /^(\d{1,3})°(\d{1,2})'(\d{1,2}(\.\d+)?)\"([NS])\s+(\d{1,3})°(\d{1,2})'(\d{1,2}(\.\d+)?)\"([EW])$/;
const DDM_REGEX = /^(\d{1,3})°(\d{1,2}(?:\.\d+)?)'([NS])\s+(\d{1,3})°(\d{1,2}(?:\.\d+)?)'([EW])$/;
const PREFIXED_REGEX = /^[NS]\d+(?:\.\d+)?\s+[EW]\d+(?:\.\d+)?$/i;


function isValidCoord(n: unknown): n is number
{
    return typeof n === "number" && Number.isFinite(n);
}


function convertDegreesToDecimal(
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


function convertPrefixedToDecimal(input: string): { lat: number, lon: number }
{
    const parts = input.split(/\s+/);
    if (parts.length !== 2) {
        return { lat: NaN, lon: NaN };
    }
    const latDirection = parts[0][0].toUpperCase();
    const lonDirection = parts[1][0].toUpperCase();
    let lat = parseFloat(parts[0].slice(1));
    let lon = parseFloat(parts[1].slice(1));
    if (latDirection === 'S') {
        lat *= -1;
    }
    if (lonDirection === 'W') {
        lon *= -1;
    }
    return { lat, lon };
}


export default function getDecimalCoords(
    input: string
): { lat: number; lon: number} | null
{
    input = input.trim();

    const dd = input.match(DD_REGEX);
    if (dd) {
        const lat = +dd[1];
        const lon = +dd[2];
        if (isValidCoord(lat) && isValidCoord(lon)) {
            return { lat, lon };
        }
    }

    const dms = input.match(DMS_REGEX);
    if (dms) {
        const lat = convertDegreesToDecimal(+dms[1], +dms[2], +dms[3], dms[5]);
        const lon = convertDegreesToDecimal(+dms[6], +dms[7], +dms[8], dms[10]);
        if (isValidCoord(lat) && isValidCoord(lon)) {
            return { lat, lon };
        }
    }

    const ddm = input.match(DDM_REGEX);
    if (ddm) {
        const lat = convertDegreesToDecimal(+ddm[1], +ddm[2], 0, ddm[3]);
        const lon = convertDegreesToDecimal(+ddm[4], +ddm[5], 0, ddm[6]);
        if (isValidCoord(lat) && isValidCoord(lon)) {
            return { lat, lon };
        }
    }

    const prefixed = input.match(PREFIXED_REGEX);
    if (prefixed) {
        const { lat, lon } = convertPrefixedToDecimal(input);
        if (isValidCoord(lat) && isValidCoord(lon)) {
            return { lat, lon };
        }
    }

    return null;
}
