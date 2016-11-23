$(document).ready(function() {
    document.getElementById("addmarker").addEventListener("click", addMarker, false);

    map = new GMaps({
        div: '#mapa',
        zoom: 12,
        lat: 41.390205,
        lng: 2.154007
    });

    GMaps.geolocate({
      success: function(position) {
        map.setCenter(position.coords.latitude, position.coords.longitude);
      },
      error: function(error) {
        alert('Geolocation failed: '+error.message);
      },
      not_supported: function() {
        alert("Your browser does not support geolocation");
      },
      always: function() {
        alert("Done!");
      }
    });
});

function addMarker() {
    GMaps.geocode({
        address: $('#dir').val(),
        callback: function(results, status) {
            if (status == 'OK') {
                var latlng = results[0].geometry.location;
                map.setCenter(latlng.lat(), latlng.lng());
                map.addMarker({
                    lat: latlng.lat(),
                    lng: latlng.lng(),
                    infoWindow: {
                        content: $('#prod').val()
                    }
                });
            }
        }
    });
}
