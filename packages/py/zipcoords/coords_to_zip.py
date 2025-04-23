import json
from importlib.resources import files
from zipcoords.haversine import haversine


def coords_to_zip(lat: float, lon: float) -> str | None:
    if (
        not isinstance(lat, (int, float)) or not isinstance(lon, (int, float))
        or not -90 <= lat <= 90
        or not -180 <= lon <= 180
    ):
        return None

    path = files("zipcoords.data").joinpath("data_flat.json")
    with open(path, 'r') as f:
        data: list[list[str, float, float]] = json.load(f)

    closest_zip = None
    min_distance = float("inf")

    for item_zip, item_lat, item_lon in data:
        dist = haversine(lat, lon, item_lat, item_lon)
        if dist < min_distance:
            min_distance = dist
            closest_zip = item_zip

    return closest_zip
