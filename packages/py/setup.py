from setuptools import setup, find_packages


setup(
    name="zipcoords",
    version="1.0.1",
    description="Convert ZIP Codes to coordinates. Convert coordinates to ZIP Codes.",
    packages=find_packages(),
    include_package_data=True,
    package_data={ "zipcoords.data": ["*.json"] },
    python_requires=">=3.10",
)
