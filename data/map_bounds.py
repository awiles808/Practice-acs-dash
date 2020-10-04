# packages
import geopandas as gpd
import os
import json

def convert_json(df):
    df = df.to_json()
    df = json.loads(df)
    return df


cwd = os.path.abspath(os.path.dirname(__file__))

url = 'https://www2.census.gov/geo/tiger/TIGER2019/COUNTY/tl_2019_us_county.zip'
county_shape = gpd.read_file(url, compression='gzip', header=0, sep=',', quotechar='"', error_bad_lines=False)

county_shape["fips"] = county_shape["STATEFP"] + county_shape["COUNTYFP"]
county_shape = county_shape[ county_shape["STATEFP"] == "06" ]
county_shape = county_shape[['fips', 'geometry']]
county_shape['geometry'] = county_shape['geometry'].simplify(0.00005, preserve_topology=False)
with open(os.path.join(cwd, "ca-geom.js"), 'w') as outfile:
    outfile.write("var gShape = JSON.parse('{}')".format(str(json.dumps(convert_json(county_shape)))))

county_shape = pd.concat([county_shape, county_shape['geometry'].bounds], axis=1)
countyBounds = {}
for x in pd.unique(county_shape["fips"]).tolist():
    temp = county_shape[county_shape["fips"] == x].copy()
    countyBounds[x] = {
        'fips': temp["fips"].values[0],
        'box': [[temp["maxx"].values[0], temp["maxy"].values[0]],
                [temp["minx"].values[0], temp["miny"].values[0]]]
    }
with open(os.path.join(cwd, "ca-bounds.js"), 'w') as outfile:
    outfile.write("var gBox = JSON.parse('{}')".format(str(json.dumps(countyBounds))))



