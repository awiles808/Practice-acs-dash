import pandas as pd
import os
import json

cwd = os.path.abspath(os.path.dirname(__file__))
dat = pd.read_csv("population.csv")

dat["fips"] = dat["fips"].astype("str")
dat["fips"] = dat["fips"].str.zfill(5)
dat["state_fips"] = dat["fips"].str.slice(start=0, stop=2)
dat = dat[ dat["state_fips"] == "06" ]

dropdown = {}
for i in range(0, len(dat)):
for x in pd.unique(dat["fips"]).tolist():
    temp = dat[dat["fips"] == x].copy()
    dropdown[i] = {
        "fips": temp["fips"].values[0],
        "name": temp["name"].values[0],
    }


with open(os.path.join(cwd, "dropdown.js"), 'w') as outfile:
    outfile.write("var gDropdown = JSON.parse('{}')".format(str(json.dumps(dropdown))))