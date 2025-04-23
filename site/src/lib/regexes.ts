const ZIP_CODE = /^\d{5}$/;
const DD_COORDS = /^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/;
const DMS_COORDS = /^(\d{1,3})°(\d{1,2})'(\d{1,2}(\.\d+)?)\"([NS])\s+(\d{1,3})°(\d{1,2})'(\d{1,2}(\.\d+)?)\"([EW])$/;
const DDM_COORDS = /^(\d{1,3})°(\d{1,2}(?:\.\d+)?)'([NS])\s+(\d{1,3})°(\d{1,2}(?:\.\d+)?)'([EW])$/;
const PREFIXED_COORDS = /^([NS]\d+(?:\.\d+)?)\s+([EW]\d+(?:\.\d+)?)/i;


export function isZIPCode(input: string): boolean
{
    return ZIP_CODE.test(input.trim());
}


export function matchDDCoords(input: string): RegExpMatchArray | null
{
    return input.trim().match(DD_COORDS);
}


export function matchDMSCoords(input: string): RegExpMatchArray | null
{
    return input.trim().match(DMS_COORDS);
}


export function matchDDMCoords(input: string): RegExpMatchArray | null
{
    return input.trim().match(DDM_COORDS);
}


export function matchPrefixedCoords(input: string): RegExpMatchArray | null
{
    return input.trim().match(PREFIXED_COORDS);
}


export function isCoords(input: string): boolean
{
    return Boolean(matchDDCoords(input))
        || Boolean(matchDMSCoords(input))
        || Boolean(matchDDMCoords(input))
        || Boolean(matchPrefixedCoords(input));
}


export function isZIPCodeOrCoords(input: string): boolean
{
    return isZIPCode(input) || isCoords(input);
}
