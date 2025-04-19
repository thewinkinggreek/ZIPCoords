import os
import requests


CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_FILE_PATH = os.path.join(CURRENT_DIR, "data.csv")


def fetch_coords(
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
            return float(data[0]["lat"]), float(data[0]["lon"])
    except Exception as e:
        print(f"Error fetching coordinates for {zip_code}:\n", e)
    return None, None


def write_to_file(zip_code: str, lat: float, lon: float) -> None:
    if os.stat(OUTPUT_FILE_PATH).st_size == 0:
        header = "zip,lat,lon\n" 
    else:
        header = ""
    with open(OUTPUT_FILE_PATH, 'a') as f:
        row = f"{zip_code},{lat},{lon}"
        f.write(header + row)


def main():
    zip_codes = [f"{i:05d}" for i in range (500, 100000)]
    session = requests.session()
    for zip_code in zip_codes:
        lat, lon = fetch_coords(zip_code, session)
        if lat is not None and lon is not None:
            write_to_file(zip_code, lat, lon)
    

if __name__ == "__main__":
    main()
