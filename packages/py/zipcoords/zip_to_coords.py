import json
from importlib.resources import files


def zip_to_coords(zip: str) -> dict[str, float | None]:
    if (
        not isinstance(zip, str)
        or not zip.isdigit()
        or len(zip) != 5
    ):
        return { "lat": None, "lon": None }

    path = files("zipcoords").joinpath("data_dict.json")
    with open(path, 'r') as f:
        data: dict[str, list[float, float]] = json.load(f)

    coords = data.get(zip)
    if not coords:
        return { "lat": None, "lon": None }

    return { "lat": coords[0], "lon": coords[1] }
