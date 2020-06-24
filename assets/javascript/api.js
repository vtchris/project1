var arrRestaurantsWithDistances = [];

function getDurationTime(array, homeGeo) {

  event.preventDefault()

  for (var i = 0; i < array.length; i++) {

    let restaurantlat = array[i].lattitude
    let restaurantlong = array[i].longitude
    let restaurantGeo = restaurantlat + ',' + restaurantlong
    //console.log(restaurantGeo)

    callGoogleApi(array[i], homeGeo, restaurantGeo, array.length)
    
  }
}
function callGoogleApi(restaurant, homeGeo, restaurantGeo, arrLength) {

 

  var queryURL2 = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=|' + homeGeo +
    '&destinations=' + restaurantGeo + '&key=AIzaSyADwNwcNLZ6amD4aqCS28itjv_hPYf-4Vg'
    //AIzaSyAwprJVRaKbbUc19bvkqHN_8ICjtUSVAJg -- original
    //AIzaSyADwNwcNLZ6amD4aqCS28itjv_hPYf-4Vg -- 6/20/2020

  $.ajax({
    url: queryURL2,
    dataType: 'json',
    method: 'GET'
  }).then(function (response) {

    console.log('Here comes the response')
    console.log(response)
        
    restaurant.address_google = response.destination_addresses[0];
    restaurant.kilometers = response.rows[0].elements[0].distance.text;
    restaurant.durationTime = response.rows[0].elements[0].duration.text;
    arrRestaurantsWithDistances.push(restaurant);

   //When array is complete, send to next function
    if(arrRestaurantsWithDistances.length >= arrLength){
      // console.log("HERE COMES THE FINAL ARRAY")
      // console.log(arrRestaurantsWithDistances)

     
      display_restaurants(arrRestaurantsWithDistances)

     
    }

   
  })
}



