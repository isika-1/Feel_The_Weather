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
    alert.style.visibility = "visible";
    alert.innerHTML = '<p id="alert-msg">' + x + '</p><p id="alert-btn"><button type="button" class="alert-btn-close" onclick="close_alert()"><i class="fa-solid fa-xmark"></i></button></p>';
    console.log(alert);
    document.getElementById("l-space").value = "";   
}

function close_alert()
{
    const alert = document.getElementById('alert');
    alert.innerHTML = "";
    alert.style.visibility = "hidden";
}

function operation(location)
{
    doDate();
    var loclat = 0; var loclong = 0;
    const loc_url = "https://api.openweathermap.org/geo/1.0/direct?q=" + location + "&limit=1&appid=1fab13d4279e8c4c4d96c5bd185098fa";
    
    fetch(loc_url)
    .then((response) => { return response.json(); })
    .then((result) => 
    { 
        loclat = result[0].lat;
        loclong = result[0].lon;

        const weather_url = "https://api.openweathermap.org/data/2.5/weather?lat=" + loclat + "&lon=" + loclong + "&appid=1fab13d4279e8c4c4d96c5bd185098fa&units=metric";

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
            
            var ss = document.getElementById("sunrise-sunset").childNodes[3].childNodes;
            ss[1].innerHTML = 'sunrise:&nbsp;'+ timeConverter(result.sys.sunrise) + ' IST';
            ss[3].innerHTML = 'sunset:&nbsp;'+ timeConverter(result.sys.sunset) + ' IST';
            
            var hl = document.getElementById("high-low-temp").childNodes[3].childNodes;
            hl[1].innerHTML = 'high:&nbsp;'+ result.main.temp_max +' &#176;C';
            hl[3].innerHTML = 'low:&nbsp;&nbsp;'+ result.main.temp_min +' &#176;C';
        })
        .catch((err) => { console.log(err + "Current data not be available for the location"); });  

        const currdayprediction = "https://api.openweathermap.org/data/2.5/forecast?lat=" + loclat + "&lon=" + loclong + "&appid=1fab13d4279e8c4c4d96c5bd185098fa&units=metric";
        fetch(currdayprediction)
        .then((response) => { return response.json(); })
        .then((result) => 
        { 
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
            var i = 0, fl = 0, count = 0;
            while(i<40)
            {
                var dt = result.list[i].dt_txt.toString().substring(11);
                if(dt == "09:00:00")
                {
                    fl = 1;
                    var weatherid = result.list[i].weather[0].id; var weathericon = '';
                    if(weatherid == 800) 
                        weathericon = '<i class="fa-solid fa-sun"></i>';
                    else 
                        weathericon = wthr_icon[Math.floor(weatherid/100) - 2];
                    document.getElementsByClassName("weekly_prediction_time")[count].innerHTML = dt.substring(0, 5) + " hrs IST";
                    document.getElementsByClassName("weekly_prediction_weather_sign")[count].innerHTML = weathericon;
                    document.getElementsByClassName("weekly_prediction_temp")[count].innerHTML = Math.round(result.list[i].main.temp) + ' &#176;C';
                    document.getElementsByClassName("weekly_prediction_date")[count/2].innerHTML = result.list[i].dt_txt.toString().substring(0, 10);
                    count++;
                }
                else if(dt == "21:00:00" && fl == 1)
                {
                    fl = 0;
                    var weatherid = result.list[i].weather[0].id; var weathericon = '';
                    if(weatherid == 800) 
                        weathericon = '<i class="fa-solid fa-sun"></i>';
                    else 
                        weathericon = wthr_icon[Math.floor(weatherid/100) - 2];
                    document.getElementsByClassName("weekly_prediction_time")[count].innerHTML = dt.substring(0, 5) + " hrs IST";
                    document.getElementsByClassName("weekly_prediction_weather_sign")[count].innerHTML = weathericon;
                    document.getElementsByClassName("weekly_prediction_temp")[count++].innerHTML = Math.round(result.list[i].main.temp) + ' &#176;C';
                }
                i++;
            }
        })
        .catch((err) => { console.log(err + "Oops! Future data not available for the particular location"); }); 

        const oiprediction = "https://api.openweathermap.org/data/2.5/air_pollution?lat=" + loclat + "&lon=" + loclong + "&appid=1fab13d4279e8c4c4d96c5bd185098fa";
        fetch(oiprediction)
        .then((response) => { return response.json(); })
        .then((result) => 
        { 
            console.log(result);
            var aqi = new Array('', 'Good', 'Fair', 'Moderate', 'Poor', 'Very Poor');
            document.getElementsByClassName("air_quality_index_value")[0].innerHTML = aqi[result.list[0].main.aqi];
            
            var acc_co = new Array(0, 4400, 9400, 12400, 15400);
            document.getElementsByClassName("value")[0].innerHTML = result.list[0].components.co + " &micro;g/m<sup>3</sup>";
            document.getElementsByClassName("rating")[0].innerHTML = "Very Poor";
            for(var i=0; i<acc_co.length; i++)
            {
                if(parseInt(result.list[0].components.co) < parseInt(acc_co[i]))
                {
                    document.getElementsByClassName("rating")[0].innerHTML = aqi[i];
                    break;
                }
            }

            var acc_no2 = new Array(0, 40, 70, 150, 200);
            document.getElementsByClassName("value")[1].innerHTML = result.list[0].components.no2 + " &micro;g/m<sup>3</sup>";
            document.getElementsByClassName("rating")[1].innerHTML = "Very Poor";
            for(var i=0; i<acc_no2.length; i++)
            {
                if(parseInt(result.list[0].components.no2) < parseInt(acc_no2[i]))
                {
                    document.getElementsByClassName("rating")[1].innerHTML = aqi[i];
                    break;
                }
            }

            var acc_o3 = new Array(0, 60, 100, 140, 180);
            document.getElementsByClassName("value")[2].innerHTML = result.list[0].components.o3 + " &micro;g/m<sup>3</sup>";
            document.getElementsByClassName("rating")[2].innerHTML = "Very Poor";
            for(var i=0; i<acc_o3.length; i++)
            {
                if(parseInt(result.list[0].components.o3) < parseInt(acc_o3[i]))
                {
                    document.getElementsByClassName("rating")[2].innerHTML = aqi[i];
                    break;
                }
            }
            
            var acc_so2 = new Array(0, 20, 80, 250, 350);
            document.getElementsByClassName("value")[3].innerHTML = result.list[0].components.so2 + " &micro;g/m<sup>3</sup>";
            document.getElementsByClassName("rating")[3].innerHTML = "Very Poor";
            for(var i=0; i<acc_so2.length; i++)
            {
                if(parseInt(result.list[0].components.so2) < parseInt(acc_so2[i]))
                {
                    document.getElementsByClassName("rating")[3].innerHTML = aqi[i];
                    break;
                }
            }

            var acc_pm2_5 = new Array(0, 10, 25, 50, 75);
            document.getElementsByClassName("value")[4].innerHTML = result.list[0].components.pm2_5 + " &micro;g/m<sup>3</sup>";
            document.getElementsByClassName("rating")[4].innerHTML = "Very Poor";
            for(var i=0; i<acc_pm2_5.length; i++)
            {
                if(parseInt(result.list[0].components.pm2_5) < parseInt(acc_pm2_5[i]))
                {
                    document.getElementsByClassName("rating")[4].innerHTML = aqi[i];
                    break;
                }
            }

            var acc_pm10 = new Array(0, 20, 50, 100, 200);
            document.getElementsByClassName("value")[5].innerHTML = result.list[0].components.pm10 + " &micro;g/m<sup>3</sup>";
            document.getElementsByClassName("rating")[5].innerHTML = "Very Poor";
            for(var i=0; i<acc_pm10.length; i++)
            {
                if(parseInt(result.list[0].components.pm10) < parseInt(acc_pm10[i]))
                {
                    document.getElementsByClassName("rating")[5].innerHTML = aqi[i];
                    break;
                }
            }
            
        })
        .catch((err) => { console.log(err + "Oops! Other information not available for this particular location"); });
    })
    .catch((err) => { myalert("Oops! We cannot recognise this particular location. Please enter the name of the location correctly."); }); 
}


function get_location()
{
    var location = document.getElementById("l-space").value;
    operation(location); 
}
