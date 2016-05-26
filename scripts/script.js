$(document).ready(function(){
    console.log("echo1");
    fetchJsonCurrent();
    console.log("echo4");
    fetchJsonForecast();
});




function fetchJsonCurrent(){
	$.ajax({
    	url: 'http://api.openweathermap.org/data/2.5/weather?id=6174041&APPID=2df7b25629785dc7245a6b0d4d47320e', // The URL to the API. You can get this in the API page of the API you intend to consume
    	type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    	data: {}, // Additional parameters here
    	dataType: 'json',
    	success: function(data) { 
    		document.getElementById("weather").innerHTML = data['weather'][0]['main'];
            document.getElementById("description").innerHTML = data['weather'][0]['description'];
            var date = new Date(data['dt']*1000);
    		document.getElementById('date').innerHTML = '~ ' + convertTime(date);
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

function fetchJsonForecast(){
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/forecast?id=6174041&APPID=2df7b25629785dc7245a6b0d4d47320e', // The URL to the API. You can get this in the API page of the API you intend to consume
        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
        data: {}, // Additional parameters here
        dataType: 'json',
        success: function(data) { 
            console.log(getForecast(data));
            document.getElementById('forecast').innerHTML = '+ ' + getForecast(data);
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

function convertTime(date){
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    //var date = new Date(obj['dt']*1000);
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

function getForecast(obj){
    //loop to get all 5 days, put into proper format, apply to page
    var fiveDay = "Five day forecast: ";
    for (val in obj['list']){
        fiveDay += obj['list'][val]['dt_txt'] + '<br>';
    }
    return fiveDay;
   
}
//$('#twitter').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + data['quote'] + '" ~ ' + data['author']));