const EARTH_RADIUS = 6371e3;


function convertDegreesToRadians(degrees: number): number
{
    return degrees * Math.PI / 180;
}


export default function haversine(
    lat1: number, lon1: number, lat2: number, lon2:number
): number
{
    const deltaLat = convertDegreesToRadians(lat2 - lat1);
    const deltaLon = convertDegreesToRadians(lon2 - lon1);
    const a = 
        Math.sin(deltaLat / 2) ** 2 +
        Math.cos(convertDegreesToRadians(lat1)) *
        Math.cos(convertDegreesToRadians(lat2)) *
        Math.sin(deltaLon / 2) ** 2;
    const c = 2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
    );
    return EARTH_RADIUS * c;
}
