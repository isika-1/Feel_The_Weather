function doDate()
{
    var date = new Date();
    var day = date.toString().substring(0,3);
    var datetime = date.getDate() + "-" + (date.getMonth()+1)  + "-" + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes();
    console.log(day + ", " + datetime);
    document.getElementsByClassName("day")[0].innerText = day + ", " + datetime + " hrs";
}

setInterval(doDate, 1000);

function search_appear(x)
{
    var x1 = document.getElementById("myName");
    var x2 = document.getElementById("l-button");
    var x3 = document.getElementById("l-space");
    
    x.style.height = "0px";
    x.style.width = "0px";
    x.childNodes[0].style.fontSize = "0px";
    x.style.visibility = "hidden";
    x.style.padding = "0px";
    x.style.border = "none";
    x.style.margin = "none";

    x1.style.fontSize = "0";
    x1.style.padding = "0";
    x1.style.visibility = "hidden";
    x1.style.border = "none";

    x2.style.visibility = "visible";
    x3.style.visibility = "visible";

    x2.style.height = "2rem";
    x2.style.width = "2rem";
    x2.style.borderRadius = "50%";
    x2.style.margin = "0.5rem";
    x2.style.padding = "0.1rem";
    x2.style.backgroundColor = "rgb(0, 0, 0, 0.5)";
    x2.style.border = "1px outset rgb(255, 255, 255, 0.5)";
    x2.childNodes[0].style.fontSize = "1rem";
    x2.childNodes[0].style.color = "white";

    x3.style.backgroundColor = "rgba(255, 255, 255, 0.2)";    
    x3.style.margin = "0.5rem";
    x3.style.width = "10.5rem";
    x3.style.height = "2rem";
    x3.style.borderRadius = "1rem";
    x3.style.outline = "none";
    x3.style.border = "none";
    x3.style.paddingLeft = "1rem";
    x3.style.color = "rgba(255, 255, 255, 0.8)";
    x3.style.fontSize = "0.8rem";
    x3.style.fontWeight = "300";
}

function timeConverter(UNIX_timestamp)
{
    var a = new Date(UNIX_timestamp * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = hour + ':' + min + ' hrs' ;
    return time;
}

var wthr_icon = new Array('<i class="fa-solid fa-cloud-bolt"></i>', '<i class="fa-solid fa-cloud-drizzle"></i>', '', '<i class="fa-solid fa-cloud-sun-rain"></i>', '<i class="fa-solid fa-snowflake"></i>', '<i class="fa-solid fa-bars-staggered"></i>', '<i class="fa-solid fa-cloud"></i>');
var bg_img = new Array('./thunderstorm.jpg', './rainy.jpg', '', './rainy.jpg', './snowy.jpg', './haze.jpg', './cloudy.jpg');

function operation(location)
{
    doDate();
    var loclat = 0; var loclong = 0;
    const loc_url = "https://api.openweathermap.org/geo/1.0/direct?q=" + location + "&limit=1&appid=1fab13d4279e8c4c4d96c5bd185098fa";
    console.log(location);
    fetch(loc_url)
    .then((response) => { return response.json(); })
    .then((result) => 
    { 
        console.log(result[0]);
        loclat = result[0].lat;
        loclong = result[0].lon;
        console.log(loclat + ", " + loclong);

        const weather_url = "https://api.openweathermap.org/data/2.5/weather?lat=" + loclat + "&lon=" + loclong + "&appid=1fab13d4279e8c4c4d96c5bd185098fa&units=metric";
        console.log(location);
        fetch(weather_url)
        .then((response) => { return response.json(); })
        .then((result) => 
        { 
            document.getElementsByClassName("location-name")[0].innerHTML = '<i class="fas fa-solid fa-map-pin"></i></i>&nbsp;' + location;
            var weatherid = result.weather[0].id;
            var weathericon = ''; var weatherbg = '';
            if(weatherid == 800)
            {
                weathericon = '<i class="fa-solid fa-sun"></i>';
                weatherbg = './sunny.jpg';
            }
            else
            {
                weathericon = wthr_icon[Math.floor(weatherid/100) - 2];
                weatherbg = bg_img[Math.floor(weatherid/100) - 2];
            }
            document.getElementsByTagName("body")[0].style.backgroundImage = 'url(' + weatherbg + ')';
            document.getElementById("temperature").innerHTML = weathericon + Math.round(result.main.temp) + '&#176;C';
            
            const str = result.weather[0].description;
            const arr = str.split(" ");
            for (var i = 0; i < arr.length; i++) 
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            const str2 = arr.join(" ");
            document.getElementById("characteristics").innerHTML = str2 + ' (feels like ' + Math.round(result.main.feels_like) + '&#176;C)';

            document.getElementById("wind_dir").childNodes[3].childNodes[1].innerHTML = 'Wind speed ' + Math.round(result.wind.speed) + ' m/s';
            document.getElementById("wind_dir").childNodes[3].childNodes[3].innerHTML = 'Direction ' + Math.round(result.wind.deg) + ' deg';
            console.log(document.getElementById("wind_dir").childNodes[3].childNodes);
            var ss = document.getElementById("sunrise-sunset").childNodes[3].childNodes;
            ss[1].innerHTML = 'sunrise&nbsp;'+ timeConverter(result.sys.sunrise);
            ss[3].innerHTML = 'sunset&nbsp;'+ timeConverter(result.sys.sunset);
            
            var hl = document.getElementById("high-low-temp").childNodes[3].childNodes;
            hl[1].innerHTML = 'high&nbsp;'+ result.main.temp_max +' &#176;C';
            hl[3].innerHTML = 'low&nbsp;&nbsp;'+ result.main.temp_min +' &#176;C';
        })
        .catch((err) => { console.log(err + "data may not be available for the latitude/longitude"); });  
    })
    .catch((err) => { console.log(err + "something went wrong or data may not be available for the city name"); }); 
}


function get_location()
{
    var location = document.getElementById("l-space").value;
    operation(location);    
}
