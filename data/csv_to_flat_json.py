import csv
import json


INPUT_FILE_NAME = "data.csv"
OUTPUT_FILE_NAME = "data_flat.json"


def csv_to_flat_json():
    data = []
    with open(INPUT_FILE_NAME, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            zip_code = row["zip"]
            lat = float(row["lat"])
            lon = float(row["lon"])
            data.append([zip_code, lat, lon])
    with open(OUTPUT_FILE_NAME, 'w') as f:
        json.dump(data, f)


if __name__ == "__main__":
    csv_to_flat_json()
