import argparse
import json
import os
import requests


CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
GOOGLE_OUTPUT_CSV_PATH = os.path.join(CURRENT_DIR, "data_google.csv")
GOOGLE_OUTPUT_JSON_PATH = os.path.join(CURRENT_DIR, "data_google.json")
OSM_OUTPUT_CSV_PATH = os.path.join(CURRENT_DIR, "data_osm.csv")
OSM_OUTPUT_JSON_PATH = os.path.join(CURRENT_DIR, "data_osm.json")


def fetch_coords_from_google(
    zip_code: str, session: requests.Session
) -> tuple[float | None, float | None]:
    api_key = os.environ.get("GOOGLE_MAPS_API_KEY")
    if not api_key:
        raise ValueError("Missing Google Maps API key")
    url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": zip_code,
        "components": "country:US",
        "key": api_key
    }
    try:
        response = session.get(url, params=params, timeout=60)
        response.raise_for_status()
        data = response.json()
        if data.get("results"):
            location = data["results"][0]["geometry"]["location"]
            print(f"{zip_code} ✅")
            return location["lat"], location["lng"]
    except Exception as e:
        print(f"Error fetching coordinates from Google Maps for {zip_code}:\n", e)
    print(f"{zip_code} ❌")
    return None, None
            

def fetch_coords_from_osm(
    zip_code: str, session: requests.Session
) -> tuple[float | None, float | None]:
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "postalcode": zip_code,
        "countrycodes": "us",
        "format": "json",
        "limit": 1
    }
    try:
        response = session.get(url, params=params, timeout=60)
        response.raise_for_status()
        data = response.json()
        if data:
            print(f"{zip_code} ✅")
            return float(data[0]["lat"]), float(data[0]["lon"])
    except Exception as e:
        print(f"Error fetching coordinates from OSM for {zip_code}:\n", e)
    print(f"{zip_code} ❌")
    return None, None


def write_to_csv(zip_code: str, lat: float, lon: float) -> None:
    if os.stat(GOOGLE_OUTPUT_CSV_PATH).st_size == 0:
        header = "zip,lat,lon\n" 
    else:
        header = ""
    with open(GOOGLE_OUTPUT_CSV_PATH, 'a') as f:
        row = f"{zip_code},{lat},{lon}"
        f.write(header + row)


def write_to_json(zip_code: str, lat: float, lon: float) -> None:
    data = []
    if os.path.exists(GOOGLE_OUTPUT_JSON_PATH):
        with open(GOOGLE_OUTPUT_JSON_PATH, "r") as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                data = {}
    data.append({ "zip": zip_code, "lat": lat, "lon": lon })
    with open(GOOGLE_OUTPUT_JSON_PATH, "w") as f:
        json.dump(data, f, indent=2)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--source",
        choices=["google", "osm"],
        default="osm",
        help="Data source for coordinates"
    )
    args = parser.parse_args()
    if args.source == "google":
        print("Fetching coordinates from Google Maps")
        fetch = fetch_coords_from_google
    else:
        print("Fetching coordinates from Open Street Map")
        fetch = fetch_coords_from_osm
    zip_codes = [f"{i:05d}" for i in range (500, 100000)]
    session = requests.session()
    for zip_code in zip_codes:
        lat, lon = fetch(zip_code, session)
        if lat is not None and lon is not None:
            write_to_csv(zip_code, lat, lon)
            write_to_json(zip_code, lat, lon)
    

if __name__ == "__main__":
    main()
