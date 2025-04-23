import math

def haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371e3
    to_rad = math.radians

    φ1 = to_rad(lat1)
    φ2 = to_rad(lat2)
    Δφ = to_rad(lat2 - lat1)
    Δλ = to_rad(lon2 - lon1)

    a = \
        math.sin(Δφ / 2) ** 2 + \
        math.cos(φ1) * \
        math.cos(φ2) * \
        math.sin(Δλ / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c
