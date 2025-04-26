import json
from importlib.resources import files


def get_coords(zip: str | int) -> tuple[float, float]:
    if isinstance(zip, int):
        zip = f"{zip:05d}"
    if (
        not isinstance(zip, str)
        or not zip.isdigit()
        or len(zip) != 5
    ):
        return None, None
    path = files("zipcoords.data").joinpath("data_dict.json")
    with open(path, 'r') as f:
        data: dict[str, list[float, float]] = json.load(f)
    coords = data.get(zip)
    if not coords:
        return None, None
    return coords[0], coords[1]
