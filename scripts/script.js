$(document).ready(function(){
    console.log("echo1");
    fetchJson();
    console.log("echo4");
});




function fetchJson(){
	$.ajax({
    	url: 'http://api.openweathermap.org/data/2.5/weather?id=6174041&APPID=2df7b25629785dc7245a6b0d4d47320e', // The URL to the API. You can get this in the API page of the API you intend to consume
    	type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    	data: {}, // Additional parameters here
    	dataType: 'json',
    	success: function(data) { 
            console.log("echo2");
    		//document.getElementById("quote").innerHTML = '"' + data['quote'] + '"';
    		//document.getElementById('author').innerHTML = '~ ' + data['author'];
    		checkObj(data);
    		console.log("echo3")
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
    console.log(obj['weather'][0]['main']);
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

//$('#twitter').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + data['quote'] + '" ~ ' + data['author']));