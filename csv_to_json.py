import csv, json


def main():
    data = []
    with open("data_osm.csv", "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            zip_code = row["zip"]
            lat = float(row["lat"])
            lon = float(row["lon"])
            data.append([zip_code, lat, lon])
    with open("data_osm.json", "w") as f:
        json.dump(data, f)


if __name__ == "__main__":
    main()
