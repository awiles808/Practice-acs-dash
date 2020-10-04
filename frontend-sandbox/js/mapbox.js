
mapboxgl.accessToken = 'pk.eyJ1IjoidnVscGVzMzciLCJhIjoiY2ptcDMwYXRhMHRzYTNrbHVscjE5Y3QwbSJ9.5DWPIW1ECOxfixUZ5JVylg';

// mapbox dictionary
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/vulpes37/ckeeylqg10cox19rykiptnnjc', // style URL
center: [-119.572, 37.388], // starting position [lng, lat]
zoom: 5.64 // starting zoom
});


map.on('load', function() {


    map.addSource("county", {
      "type": "geojson",
      "data": gShape
    });


    // map.addLayer({
    //   "id": "outline",
    //   "type": "line",
    //   "source": "county",
    //   "paint": {
    //     "line-color": '#a6cfeb',
    //     "line-width": 2
    //   }
    // });

    map.addLayer({
        "id": "outline",
        "type": "line",
        "source": "county",
        "paint": {
          "line-color": '#003366',
          "line-width": 3,
          "line-opacity": ["case",["boolean", ["feature-state", "outline"], false],1, 0]
        }
      });
})  


// zoom based on fipscode
function selectCountyMap(fips){
    var bbox = [gBox[fips]["box"][0], gBox[fips]["box"][1]];
    map.fitBounds(bbox, {
         padding: {
             top: 50,
             bottom: 50,
             left: 50,
             right: 50
         },
         linear: true
     });
    
     

 
     if(selectedCounty){
       map.setFeatureState({source: 'county', id: selectedCounty}, { outline: false});
     }

     for (let i = 0; i < gShape.features.length; i++) {
        if(gShape.features[i].properties.fips == fips){
            selectedCounty = gShape.features[i].id
        };
     }

     map.setFeatureState({source: 'county', id:selectedCounty }, { outline: true});
}