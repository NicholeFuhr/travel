var sentPoint;
$( document ).ready(function() {

var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
var mapOptions = {
  center: new google.maps.LatLng(53.184562, 44.973993),
  zoom: 18,
  mapTypeId: google.maps.MapTypeId.HYBRID
};


function calcRoute() {

  var request = {
      origin: [ orgn ],
      destination: [ dest ],
      waypoints: [ gmap_points ],
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      }
  });
}

calcRoute()


var handler = Gmaps.build('Google');
handler.buildMap({provider: mapOptions,  internal: {id: 'map-canvas'}}, function(){

var markers = handler.addMarkers(gmap_points, {draggable: true})
handler.bounds.extendWith(markers);
handler.fitMapToBounds();

});


if (1== true)
  {
    google.maps.event.addListener(handler.getMap(), 'click', function(event) {
        console.log(event.latLng);
    });

    google.maps.event.addListener(handler.getMap(), 'dblclick', function(event) {

    var description = prompt('Description','Description here');

    if  (description) {
      sentPoint = {
        name: name,
        description: description,
        latitude: event.latLng.d,
        longitude: event.latLng.e
      }

      $.ajax({
        type: 'post',
        url: window.location+'/points#new',
        data: {point: sentPoint},
        dataType: 'script',
        success: (function(){

          }),
      });

      description = '<div id="tag">' + description + '</div>';
      var infowindow = new google.maps.InfoWindow({
      content: description
      });
      var marker = new google.maps.Marker({
          position: event.latLng,
          map: handler.getMap(),
          title: name,
      });
    };
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(handler.getMap(),marker);
      });
    });
  }

function calcRoute() {
  var origin      = orgn;
  var destination = dest;
  var request = {
      origin:      origin,
      destination: destination,
      travelMode:  google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

$('.points-list li').on('mouseenter', function() {
  $(this).find('.options').show
});
});
