$( document ).ready(function() {
  handler = Gmaps.build('Google');
  handler.buildMap({ provider: {}, internal: {id: 'map-canvas'}}, function(){
    markers = handler.addMarkers([
      {
        "lat": 53.184660,
        "lng": 44.972893,
        "picture": {
          "url": "https://addons.cdn.mozilla.net/img/uploads/addon_icons/13/13028-64.png",
          "width":  36,
          "height": 36
        },
        "infowindow": "hello!"
      }
    ]);
    handler.bounds.extendWith(markers);
    handler.fitMapToBounds();
  });

  var mapOptions = {
    center: new google.maps.LatLng(53.184660, 44.972893),
    zoom: 19}

  google.maps.event.addListener(handler.getMap(), 'click', function(event) {
      console.log(event.latLng);
  });

  google.maps.event.addListener(handler.getMap(), 'dblclick', function(event) {

  var description = prompt('Description','Description here');

  if  (description) {
    var newPoint = {
      name: 'lel',
      description: description,
      latitude: event.latLng.d,
      longitude: event.latLng.e
    }
    console.log(newPoint);
    console.log(JSON.stringify(newPoint));
    $.ajax({
      type: 'post',
      url: '/points#create',
      data: {newPoint:newPoint},
      success: (console.log('success')),
      dataType: 'json'
    });

    description = '<div id="tag">' + description + '</div>';
    var infowindow = new google.maps.InfoWindow({
      content: description
    });
    var marker = new google.maps.Marker({
        position: event.latLng,
        map: handler.getMap(),
        title: 'Hello World!',
    });
  };
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(handler.getMap(),marker);
    });
  });
});
