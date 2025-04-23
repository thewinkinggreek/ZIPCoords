import argparse
import os
import requests
from dotenv import load_dotenv


CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
GOOGLE_OUTPUT_PATH = os.path.join(CURRENT_DIR, "data.csv")
OSM_OUTPUT_PATH = os.path.join(CURRENT_DIR, "data_osm.csv")


def generate_zip_codes() -> list[str]:
    return [f"{i:05d}" for i in range (500, 100000)]


def fetch_coords_from_google(
    zip_code: str, session: requests.Session
) -> tuple[float | None, float | None]:
    load_dotenv(os.path.join(CURRENT_DIR, ".env.local"))
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
        results = data.get("results", [])
        if not results:
            print(f"{zip_code} ❌ No results")
            return None, None
        result = results[0]
        if not result:
            print(f"{zip_code} ❌ No result")
            return None, None
        if result.get("partial_match") \
            or "postal_code" not in result.get("types", []):
            print(f"{zip_code} ❌ Bad match")
            return None, None
        location = result["geometry"]["location"]
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


def write_to_csv(path: str, zip_code: str, lat: float, lon: float) -> None:
    if not path.endswith(".csv"):
        exit(1)
    if not os.path.exists(path) or os.stat(path).st_size == 0:
        header = "zip,lat,lon\n" 
    else:
        header = ""
    with open(path, 'a') as f:
        row = f"{zip_code},{lat},{lon}\n"
        f.write(header + row)


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
        path = GOOGLE_OUTPUT_PATH
    else:
        print("Fetching coordinates from Open Street Map")
        fetch = fetch_coords_from_osm
        path = OSM_OUTPUT_PATH
    zip_codes = generate_zip_codes()
    session = requests.session()
    for zip_code in zip_codes:
        lat, lon = fetch(zip_code, session)
        if lat is not None and lon is not None:
            write_to_csv(path, zip_code, lat, lon)
    

if __name__ == "__main__":
    main()
