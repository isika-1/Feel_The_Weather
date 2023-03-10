function doDate()
{
    var date = new Date();
    var day = date.toString().substring(0,3);
    var d = (date.getDate() < 10) ? ("0"+date.getDate()) : date.getDate();
    var m = (date.getMonth()+1 < 10) ? ("0"+(date.getMonth()+1)) : (date.getMonth()+1);
    var hr = (date.getHours() < 10) ? ("0"+date.getHours()) : date.getHours();
    var mn = (date.getMinutes() < 10) ? ("0"+date.getMinutes()) : date.getMinutes();
    var datetime = d + "-" + m  + "-" + date.getFullYear() + ", " + hr + ":" + mn;
    document.getElementsByClassName("day")[0].innerText = day + ", " + datetime + " hrs IST";
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
    var date = new Date(UNIX_timestamp * 1000);
    var hr = (date.getHours() < 10) ? ("0"+date.getHours()) : date.getHours();
    var mn = (date.getMinutes() < 10) ? ("0"+date.getMinutes()) : date.getMinutes();
    var time = hr + ':' + mn + ' hrs' ;
    return time;
}

var wthr_icon = new Array('<i class="fa-solid fa-cloud-bolt"></i>', '<i class="fa-solid fa-cloud-drizzle"></i>', '', '<i class="fa-solid fa-cloud-sun-rain"></i>', '<i class="fa-solid fa-snowflake"></i>', '<i class="fa-solid fa-bars-staggered"></i>', '<i class="fa-solid fa-cloud"></i>');
var bg_img = new Array('./thunderstorm.jpg', './rainy.jpg', '', './rainy.jpg', './snowy.jpg', './haze.jpg', './cloudy.jpg');

function myalert(x)
{
    const alert = document.getElementById('alert');
    alert.innerHTML = x + '<button type="button" class="alert-btn-close" onclick="close_alert()"></button>';
    console.log(alert);
    document.getElementById("l-space").value = "";   
}

function close_alert()
{
    alert.innerHTML = "";
}

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

            document.getElementById("wind_dir").childNodes[3].childNodes[1].innerHTML = 'wind speed: ' + Math.round(result.wind.speed) + ' m/s';
            document.getElementById("wind_dir").childNodes[3].childNodes[3].innerHTML = 'direction: ' + Math.round(result.wind.deg) + ' deg';
            console.log(document.getElementById("wind_dir").childNodes[3].childNodes);

            var ss = document.getElementById("sunrise-sunset").childNodes[3].childNodes;
            ss[1].innerHTML = 'sunrise:&nbsp;'+ timeConverter(result.sys.sunrise) + ' IST';
            ss[3].innerHTML = 'sunset:&nbsp;'+ timeConverter(result.sys.sunset) + ' IST';
            
            var hl = document.getElementById("high-low-temp").childNodes[3].childNodes;
            hl[1].innerHTML = 'high:&nbsp;'+ result.main.temp_max +' &#176;C';
            hl[3].innerHTML = 'low:&nbsp;&nbsp;'+ result.main.temp_min +' &#176;C';
        })
        .catch((err) => { console.log(err + "data may not be available for the latitude/longitude"); });  

        const currdayprediction = "https://api.openweathermap.org/data/2.5/forecast?lat=" + loclat + "&lon=" + loclong + "&appid=1fab13d4279e8c4c4d96c5bd185098fa&units=metric";
        fetch(currdayprediction)
        .then((response) => { return response.json(); })
        .then((result) => 
        { 
            console.log(result);
            for(var i=1; i<=8; i++)
            {
                var weatherid = result.list[i].weather[0].id; var weathericon = '';
                if(weatherid == 800) 
                    weathericon = '<i class="fa-solid fa-sun"></i>';
                else 
                    weathericon = wthr_icon[Math.floor(weatherid/100) - 2];
                document.getElementsByClassName("prediction_date")[i-1].innerHTML = result.list[i].dt_txt.toString().substring(0, 10);
                document.getElementsByClassName("prediction_time")[i-1].innerHTML = result.list[i].dt_txt.toString().substring(11, 16) + " hrs IST";
                document.getElementsByClassName("prediction_weather_sign")[i-1].innerHTML = weathericon;
                document.getElementsByClassName("prediction_temp")[i-1].innerHTML = Math.round(result.list[i].main.temp) + ' &#176;C';
            }
            document.getElementById("l-space").value = "";   
        })
        .catch((err) => { myalert("Oops! Data not available for the particular location"); }); 
    })
    .catch((err) => { myalert("Oops! We cannot recognise this particular location. Please enter the name of the location correctly."); }); 
}


function get_location()
{
    var location = document.getElementById("l-space").value;
    operation(location); 
}
