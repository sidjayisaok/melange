// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
//don't use es6 or it'll break the code

//variables used
var map;
var infowindow;
//start map protocol
function initMap() {
  var searchResults = {lat: 40.7128, lng: -74.0059};
  map = new google.maps.Map(document.getElementById('map'), {
    center: searchResults,
    zoom: 13
  });
  //sets up info window
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: searchResults,
    radius: 1000,
    // change the types using https://developers.google.com/places/supported_types as a reference
    type: ['restaurant']
  }, callback);
}
//pulls up markers
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      //rating api here
      console.log(results[i].rating);
    }
  }
}
//creates markers
function createMarker(place) {
  var marker;
  //don't change this url or so help me God..."https://i.imgur.com/beAXMxQ.png" ourIcon only supports urls
  var ourIcon = new google.maps.MarkerImage("https://i.imgur.com/beAXMxQ.png");

  if(marker != undefined && marker != ''){
    marker.setMap(null);
    marker ='';
  }
  //markers working via this script
  var placeLoc = place.geometry.location;
  marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    animation: google.maps.Animation.DROP,
    icon: ourIcon
  });
  
  //listener event can be rewritten but leave it as is for now
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
  }

  // trying to implement search, this is pulling up the latitude and longitude
  //figure out how to change the latitude and longitude into search factors
  function searchFunc(){
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById('address-input').value;
    var longitude;
    var latitude;
    geocoder.geocode({ 'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      latitude = results[0].geometry.location.lat();
      longitude = results[0].geometry.location.lng();
      //attempting search fix
      var searchResults = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
      map = new google.maps.Map(document.getElementById('map'), {
        center: searchResults,
        zoom: 15
      });
      //sets up info window
      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: searchResults,
        radius: 1000,
        // change the types using https://developers.google.com/places/supported_types as a reference
        type: ['restaurant']
      }, callback);
      }
    });
  }
//attempting to add d3 markers
function addD3markers(markers){
  var overlay = new google.maps.OverlayView();

        // Add the container when the overlay is added to the map.
        overlay.onAdd = function() {
            var layer = d3.select(this.getPanes().overlayLayer).append("div")
                .attr("class", "stations");

            overlay.draw = function() {
                var projection = this.getProjection(),
                    padding = 20;

                var marker = layer.selectAll("svg")
                    .data(d3.entries(markers))
                    .each(transform) // update existing markers
                    .enter()
                    .append("svg:svg")
                    .each(transform)
                    .attr("class", "marker");

                // Add a circle.
                marker.append("svg:circle")
                    .attr("r", 11)
                    .attr("cx", padding)
                    .attr("cy", padding);

                // Add a label.
                marker.append("svg:text")
                    .attr("x", padding)
                    .attr("y", padding)
                    .attr("dy", ".31em")
                    //Center label in the circle.
                    .attr("text-anchor", "middle")
                    .text(function(d) {
                        return d.key;
                    });

                function transform(d) {
                    d = new google.maps.LatLng(d.value[1], d.value[0]);
                    d = projection.fromLatLngToDivPixel(d);
                    return d3.select(this)
                        .style("left", (d.x - padding) + "px")
                        .style("top", (d.y - padding) + "px");
                }
            };
        };
        // Bind our overlay to the map…
        overlay.setMap(map);
}

console.log(addD3markers(callback()));

  
