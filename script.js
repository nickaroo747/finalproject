//here I'm establishing my variables/ setting them to 0
var geocoder
var map
var image = 'icon.png'
var gunData
var gunDataIteration = 0
var gunDataLength = 0

var getLatLong = function(address) {
    if (gunDataIteration < gunDataLength) {
        geocoder.geocode({
            'address': address
        }, function(results, status) {
            console.log('status', status)

// IF the status is okay, this is where google maps API populates the map with the marker's traits
            if (status == 'OK') {
                var coords = results[0].geometry.location
                // console.log('coords', coords)
                var latLng = new google.maps.LatLng(coords.lat(), coords.lng())
                // console.log('latLng', latLng)
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: image,
                    title: address,
                    animation: google.maps.Animation.DROP
                })

                gunDataIteration++

// There's something relating to the browser having to iterate threw the data and timing out and a status code but wasn't exactly sure about this
                iterate()
            } else if (status == 'OVER_QUERY_LIMIT') {
                setTimeout(function() {
                    iterate()
                }, 500)
            } else {
                alert('Geocode failed because of this status code: ' + status)
            }

        })
    }
}

var iterate = function() {
    var address = gunData[gunDataIteration]['Address'] + ', ' + gunData[gunDataIteration]['City Or County'] + ', ' + gunData[gunDataIteration]['State']
    // console.log('address', address)
    // console.log('gunDataIteration',gunDataIteration)
    getLatLong(address)
}

// This is where I pull in my dataset, Hooray!
var fetchData = function() {
    fetch('gunviolence.json')
        .then(function(response) {
            if (response.status !== 200) {
                console.log('Status Code: ' + response.status)
                return
            }
            response.json().then(function(data) {
                // console.log(data)
                gunData = data
                gunDataLength = data.length
                // console.log('gunDataLength', gunDataLength)

                iterate()
            })
        })
        .catch(function(err) {
            console.log('Fetch Error', err)
        })
}
// With Google Maps API this is where you establish your map, and how to center it.
var initMap = function() {
    geocoder = new google.maps.Geocoder()
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: new google.maps.LatLng(39.0997, -99.5786),
        mapTypeId: 'terrain'
    })

    fetchData()
}
