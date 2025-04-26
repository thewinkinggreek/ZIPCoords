import haversine from "./haversine.js";
import rawData from "./data/data_flat.json" with { type: "json" };
const data = rawData;
export default function getZIP(lat, lon) {
    if (typeof lat !== "number" || typeof lon !== "number"
        ||
            !Number.isFinite(lat) || !Number.isFinite(lon)
        ||
            lat < -90 || lat > 90
        ||
            lon < -180 || lon > 180) {
        return null;
    }
    let closestZIP = null;
    let minDistance = Infinity;
    for (const [itemZIP, itemLat, itemLon] of data) {
        const distance = haversine(lat, lon, itemLat, itemLon);
        if (distance < minDistance) {
            minDistance = distance;
            closestZIP = itemZIP;
        }
    }
    return closestZIP;
}
