// selectively hide elements based on weather conditions
// display city name at top of screen
// prettify
// clean up code


var tempC = 0;
var tempF = 0;
var tempK = 0;
var lat = 0;
var long = 0;

$(document).ready(function(){
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude 
            long =  position.coords.longitude;
            lat = Math.round(lat);
            long = Math.round(long);
            console.log("lat: " + lat);
            console.log("long: " + long); 
            fetchJsonCurrent(lat, long);
        });
    }



    
    
    $("#convert").click(function(){
        var currScale = document.getElementById('scale').innerHTML;
        if(currScale === 'K'){
            document.getElementById("temp").innerHTML = tempC + " <a id = 'scale'>C</a>";
        } else if (currScale === 'C'){
            document.getElementById("temp").innerHTML = tempF + " <a id = 'scale'>F</a>";
        } else if (currScale === 'F'){
            document.getElementById("temp").innerHTML = tempK + " <a id = 'scale'>K</a>";
        } 
    });

    $("#update").click(function(){
        fetchJsonCurrent(lat, long, function() { 
            document.getElementById("temp").innerHTML = tempC + " <a id = 'scale'>C</a>";
        });
    })

});

function fetchJsonCurrent(lat, long){
	$.ajax({
    	url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&APPID=2df7b25629785dc7245a6b0d4d47320e', // The URL to the API. You can get this in the API page of the API you intend to consume
    	type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    	data: {}, // Additional parameters here
    	dataType: 'json',
    	success: function(data) { 
    		document.getElementById("weather").innerHTML = data['weather'][0]['main'] + ": " + data['weather'][0]['description'];            
            document.getElementById("temp").innerHTML = "<a id = 'scale'></a>";
            convertTemp(data['main']['temp']);
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            var date = new Date(data['dt']*1000);
    		document.getElementById('date').innerHTML = '~ ' + convertTime(date);
            document.getElementById("temp").innerHTML = tempC + " <a id = 'scale'>C</a>";
    	},
    	error: function(err) { 
            alert(err); 
            console.log(typeof err);
            checkObj(err);
        },
    	beforeSend: function(xhr) {
    	   xhr.setRequestHeader("2df7b25629785dc7245a6b0d4d47320e"); // Enter here your Mashape key
        }
    });
}

function convertTime(date){
    
    // Hours part from the timestamp
    var hours = date.getHours();
    if(hours > 12){
        hours -= 12;
    }
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saterday'];
    var day = days[date.getDay()];
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = day + ", " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}

function convertTemp(curr){
    tempC = curr - 273.15;
    tempC = Math.round(tempC * 10) / 10;
    tempF = curr * (9/5) - 459.67;
    tempF = Math.round(tempF * 10) / 10;
    tempK = Math.round(curr *10) / 10;

  
}

  /*
    var currScale = document.getElementById('scale').innerHTML;
    if(currScale === '' || currScale === 'K'){
        var tempC = curr - 273.15;
        tempC = Math.round(tempC * 10) / 10;
        document.getElementById("temp").innerHTML = tempC + " <a id = 'scale'>C</a>";
    } else if (currScale === 'C'){
        var 
        document.getElementById("temp").innerHTML = tempF + " <a id = 'scale'>F</a>";
    } else if (currScale === 'F'){
        var tempK = (curr + 459.67) * (5/9);
        document.getElementById("temp").innerHTML = tempK + " <a id = 'scale'>K</a>";
    }
    */

/*
function fetchJsonForecast(){
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/forecast?id=6174041&APPID=2df7b25629785dc7245a6b0d4d47320e', // The URL to the API. You can get this in the API page of the API you intend to consume
        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
        data: {}, // Additional parameters here
        dataType: 'json',
        success: function(data) { 
            console.log(getForecast(data));
            document.getElementById('weather').innerHTML = '+ ' + getForecast(data);
            checkObj(data);
            //document.getElementById("forecast").innerHTML = data['weather'][0]['main'];
        },
        error: function(err) { 
            alert(err); 
            console.log(typeof err);
            checkObj(err);
        },
        beforeSend: function(xhr) {
           xhr.setRequestHeader("2df7b25629785dc7245a6b0d4d47320e"); // Enter here your Mashape key
        }
    });
}

function checkObj(obj){
    //console.log(obj['weather'][0]['main']);
    //console.log(obj['dt']);
    //convertTime(obj);
    for (var key in obj) {
        
        if (obj.hasOwnProperty(key)) {
                
            var val = obj[key];
            var first = "key: " + key + " type of: " + typeof key;
            var second = "val: " + val + " type of: " + typeof val;
            console.log(first);
            console.log(second);
        }
    }
}
*/


/*
function getForecast(obj){
    //loop to get all 5 days, put into proper format, apply to page
    var fiveDay = "Five day forecast: ";
    for (val in obj['list']){
        fiveDay += obj['list'][val]['dt_txt'] + '<br>';
    }
    return fiveDay;
   
}

*/
//$('#twitter').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + data['quote'] + '" ~ ' + data['author']));