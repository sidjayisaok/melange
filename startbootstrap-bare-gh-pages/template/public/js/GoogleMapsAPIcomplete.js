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
    radius: 2500,
    // change the types using https://developers.google.com/places/supported_types as a reference
    type: ['restaurant']
  }, callback);
}
//pulls up markers
function callback(results, status) {
  //array to log ratings API
  let thisArray = [];
  let thatArray = [];
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      //rating api here
      thisArray.push(results[i].rating);
      thatArray.push(results[i].name);
    }
  }
  //render bar chart results
   myBarChart(thisArray, thatArray);
}
//creates markers
function createMarker(place) {
  var marker;
  // ourIcon only supports urls
  var ourIcon = new google.maps.MarkerImage("https://i.imgur.com/ibZvcOY.png");

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
        radius: 2500,
        // change the types using https://developers.google.com/places/supported_types as a reference
        type: ['restaurant']
      }, callback);
      }
    });
  }
//d3 graph render
const myBarChart = (thisArray, thatArray)=>{
//delete duplicates
for (let i = 0; i < thisArray.length; i++){
   d3.select(".myChart").remove();
}
  //works with chart below
  let x = d3.scale.linear()
          .domain([0, d3.max(thisArray)])
          .range([0, 300]);

  let barChart =  d3.select(".chart")
                    .selectAll(".chart")
                    .data(thisArray)
                    .enter()
                    .append("div")
                    .style("width", (d)=>{
                      return x(d) + "px";
                    })
                    .style("background-color", (d)=>{
                      if (d < 1) {
                        return "red";
                      }
                      else if (d >= 1 && d < 2){
                        return "orange";
                      }
                      else if(d >= 2 && d < 3){
                        return "yellow";
                      }
                      else if(d >= 3 && d < 4){
                        return "teal";
                      }
                      else if(isNaN(d)){
                        return "black";
                      }
                      else{
                        return "green";
                      }
                    })
                    .style("color", "white")
                    .attr("class", "myChart")
                    .text((d, i)=>{
                        return thatArray[i] + " : " + d;      
                });
}


  
