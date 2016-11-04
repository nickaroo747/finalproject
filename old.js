var geocoder;
var map;
var testAddr = '600 block of Whisenant Street, Shelby, North Carolina'

var getLatLong = function(address) {
    console.log('this is called')
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        console.log('results',results)
        console.log('status',status)
        if (status == 'OK') {
            return results[0].geometry.location
            var coords = getLatLong(testAddr); //links to the data by specific line
            console.log('coords',coords)
            var latLng = new google.maps.LatLng(coords[1], coords[0]);
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: image
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status)
        }
    })
}

function initMap() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: new google.maps.LatLng(39.0997, -99.5786),
        mapTypeId: 'terrain'
    });

    // Create a <script> tag and set the USGS URL as the source.
    var script = document.createElement('script');
    // This example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    // script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
    //This is the document with my data, not sure how exactly to hook this up, haven't found much on google and it also has locations as city/state and I need to figure out how to change them to lat long
    script.src = ('./gunviolence.js');
    document.getElementsByTagName('head')[0].appendChild(script);

    // getLatLong(testAddr)
}

// Loop through the results array and place a marker for each
// set of coordinates.
var image = ("icon.png");
window.eqfeed_callback = function(results) {
    for (var i = 0; i < results.features.length; i++) {

    }
}
