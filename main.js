// var Moment = require("moment");
var momenttz = require("moment-timezone");
var zipcode_to_timezone = require( 'zipcode-to-timezone' );
var promise = new Promise(function (resolve, reject) {
  $(".go").click(function () {
    var zip = $("input").val();
    var realZip = parseInt(zip);
    console.log(zip.length);
    console.log(realZip);

    if (zip.length == 5 && typeof realZip === "number") {
      var weather =
        "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?zip=" +
        realZip +
        "&appid=" +
        "1b34651191e7ebe878e7edd84d4cf7aa";
      console.log(weather);
      $.get(weather, function (data) {
        console.log(data);
        console.log(data.coord.lon);

        var lat = data.coord.lat;
        var long = data.coord.lon;

        console.log(lat + " " + long);
        var zone = zipcode_to_timezone.lookup(realZip);
        var time = momenttz().tz(zone).format("h:mm:ss a");
        console.log(time);
        
          var finalstring =
          "the time is " + time +" and the weather is " + data.weather[0].main;
          resolve(finalstring);

        // });
      });
    } else {
      window.alert("thats not a zipcode bro");
      $("input").val("");
      reject("err");
    }

    console.log(zip);
  });
});
promise.then(
  function (successMessage) {
    //success handler function is invoked
    $(".output").append(successMessage);
    console.log(successMessage);
  },
  function (errorMessage) {
    console.log(errorMessage);
  }
);
